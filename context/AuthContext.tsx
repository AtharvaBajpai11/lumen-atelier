'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Profile } from '@/types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, pass: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<boolean>;
  setDemoRole: (role: 'admin' | 'customer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  // Initialize demo default user if Supabase is not configured
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (isSupabaseConfigured()) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && mounted) {
            setUser(session.user);
            const { data: prof } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            if (prof && mounted) setProfile(prof);
          }

          supabase.auth.onAuthStateChange(async (_event, newSession) => {
            if (!mounted) return;
            setUser(newSession?.user || null);
            if (newSession?.user) {
              const { data: prof } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', newSession.user.id)
                .single();
              if (prof && mounted) setProfile(prof);
            } else {
              setProfile(null);
            }
          });
        } catch (e) {
          console.warn('Supabase auth initialization error', e);
        }
      } else {
        // Mock demo account
        const demoStored = typeof window !== 'undefined' ? localStorage.getItem('lumen_demo_profile') : null;
        if (demoStored) {
          const parsed = JSON.parse(demoStored);
          setProfile(parsed);
          setUser({ id: parsed.id, email: parsed.email });
        } else {
          const defaultAdmin: Profile = {
            id: 'admin_demo_01',
            email: 'curator@lumenatelier.com',
            full_name: 'Arthur Pendelton',
            phone: '+1 (212) 555-0199',
            role: 'admin',
            avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setProfile(defaultAdmin);
          setUser({ id: defaultAdmin.id, email: defaultAdmin.email });
        }
      }
      setIsLoading(false);
    }

    initAuth();
    return () => {
      mounted = false;
    };
  }, []);

  const signIn = async (email: string, pass: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      setIsLoading(false);
      if (error) {
        addToast(error.message, 'error');
        return { success: false, error: error.message };
      }
      addToast('Welcome back to Lumen Atelier', 'success');
      return { success: true };
    }

    // Local demo sign in
    const role: 'admin' | 'customer' = email.includes('admin') ? 'admin' : 'customer';
    const demoProf: Profile = {
      id: `usr_${Date.now()}`,
      email,
      full_name: email.split('@')[0],
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProfile(demoProf);
    setUser({ id: demoProf.id, email });
    if (typeof window !== 'undefined') {
      localStorage.setItem('lumen_demo_profile', JSON.stringify(demoProf));
    }
    setIsLoading(false);
    addToast('Signed in successfully', 'success');
    return { success: true };
  };

  const signUp = async (email: string, pass: string, fullName: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: { data: { full_name: fullName } },
      });
      setIsLoading(false);
      if (error) {
        addToast(error.message, 'error');
        return { success: false, error: error.message };
      }
      addToast('Account created. Welcome to the collector circle.', 'success');
      return { success: true };
    }

    // Demo sign up
    const demoProf: Profile = {
      id: `usr_${Date.now()}`,
      email,
      full_name: fullName,
      role: 'customer',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProfile(demoProf);
    setUser({ id: demoProf.id, email });
    if (typeof window !== 'undefined') {
      localStorage.setItem('lumen_demo_profile', JSON.stringify(demoProf));
    }
    setIsLoading(false);
    addToast('Account created successfully', 'success');
    return { success: true };
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lumen_demo_profile');
    }
    addToast('Signed out successfully', 'info');
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return false;
    const updated = { ...profile, ...updates, updated_at: new Date().toISOString() };
    setProfile(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lumen_demo_profile', JSON.stringify(updated));
    }
    if (isSupabaseConfigured() && user) {
      await supabase.from('profiles').update(updates).eq('id', user.id);
    }
    addToast('Profile updated', 'success');
    return true;
  };

  const setDemoRole = (role: 'admin' | 'customer') => {
    if (profile) {
      const updated = { ...profile, role };
      setProfile(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lumen_demo_profile', JSON.stringify(updated));
      }
      addToast(`Switched active role to ${role.toUpperCase()}`, 'info');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin: profile?.role === 'admin',
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        setDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
