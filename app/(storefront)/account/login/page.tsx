'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, user } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to account dashboard
  if (user) {
    router.push('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'signin') {
      const res = await signIn(email, password);
      setIsLoading(false);
      if (res.success) router.push('/account');
    } else {
      const res = await signUp(email, password, fullName);
      setIsLoading(false);
      if (res.success) router.push('/account');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 lg:py-24">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text block mb-2">
          Lumen Atelier Sanctuary
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
          {mode === 'signin' ? 'Collector Sign In' : 'Join the Circle'}
        </h1>
      </div>

      <div className="bg-white border border-black/[0.08] shadow-subtle p-8">
        {/* Tab Switcher with animation */}
        <div className="flex border-b border-black/10 mb-8 relative">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 pb-3 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer ${
              mode === 'signin' ? 'text-primary-text' : 'text-secondary-text hover:text-black'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 pb-3 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer ${
              mode === 'signup' ? 'text-primary-text' : 'text-secondary-text hover:text-black'
            }`}
          >
            Create Account
          </button>

          {/* Sliding underline */}
          <motion.div
            layoutId="tabUnderline"
            className="absolute bottom-0 h-0.5 bg-black"
            style={{
              width: '50%',
              left: mode === 'signin' ? '0%' : '50%',
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button type="submit" size="lg" isLoading={isLoading} className="w-full">
              <span>{mode === 'signin' ? 'Sign In to Account' : 'Create Collector Profile'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-black/10 text-center space-y-3">
          <p className="text-xs text-secondary-text">
            Demo quick credentials: Use any valid email (e.g. <span className="font-mono text-black font-semibold">curator@lumenatelier.com</span> for admin, or any customer address).
          </p>
        </div>
      </div>
    </div>
  );
}
