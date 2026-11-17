'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ShieldAlert, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, isAdmin, isLoading, setDemoRole } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <span className="text-xs uppercase tracking-widest text-secondary-text">
          Authenticating Atelier Permissions...
        </span>
      </div>
    );
  }

  // If user is not admin, provide clear message and immediate role switch for testing
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-black/10 shadow-lg p-8 text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-sale mx-auto" />
          <h2 className="font-serif text-2xl text-primary-text">Admin Access Required</h2>
          <p className="text-xs text-secondary-text leading-relaxed">
            Your current session role is &ldquo;{profile?.role || 'guest'}&rdquo;. Only authorized curators with the &ldquo;admin&rdquo; role may access this control center.
          </p>
          <div className="pt-2 space-y-2">
            <Button
              onClick={() => setDemoRole('admin')}
              size="md"
              className="w-full bg-accent hover:bg-accent-hover text-white border-transparent"
            >
              <span>Switch Active Session to Admin</span>
              <Check className="w-4 h-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => router.push('/')}
              className="w-full"
            >
              Return to Storefront
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8F9FA] text-[#1A1A1A]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
