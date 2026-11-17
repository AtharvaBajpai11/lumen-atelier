'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getOrders } from '@/lib/store';
import { Order } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Package, MapPin, Heart, ShieldCheck, LogOut, User, CheckCircle2 } from 'lucide-react';

export default function AccountDashboardPage() {
  const router = useRouter();
  const { user, profile, signOut, isAdmin, setDemoRole, updateProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');

  useEffect(() => {
    if (!user) {
      router.push('/account/login');
      return;
    }
    async function loadUserOrders() {
      const all = await getOrders();
      setOrders(all);
    }
    loadUserOrders();
  }, [user, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ full_name: fullName, phone });
  };

  if (!user) return null;

  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-12 lg:py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-black/10 gap-4 mb-10">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text block mb-1">
            Collector Sanctuary
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
            Welcome, {profile?.full_name || user.email}
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Role: <span className="font-bold uppercase text-primary-text">{profile?.role || 'customer'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick role toggle for preview testing */}
          <button
            onClick={() => setDemoRole(isAdmin ? 'customer' : 'admin')}
            className="text-xs uppercase tracking-wider font-semibold border border-black/20 px-3 py-2 bg-white hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Switch Role to {isAdmin ? 'Customer' : 'Admin'}
          </button>

          {isAdmin && (
            <Link href="/admin">
              <Button size="sm" className="bg-accent hover:bg-accent-hover text-white border-transparent">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                <span>Admin Panel</span>
              </Button>
            </Link>
          )}

          <button
            onClick={() => {
              signOut();
              router.push('/');
            }}
            className="text-xs uppercase tracking-wider font-semibold text-secondary-text hover:text-sale flex items-center gap-1.5 p-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-2 bg-white border border-black/[0.06] p-4 shadow-subtle">
          <Link
            href="/account"
            className="flex items-center gap-3 px-4 py-3 bg-neutral-100 text-primary-text font-semibold text-xs uppercase tracking-wider border-l-2 border-black"
          >
            <User className="w-4 h-4" />
            <span>Profile Settings</span>
          </Link>
          <Link
            href="/account/orders"
            className="flex items-center justify-between px-4 py-3 text-secondary-text hover:text-primary-text hover:bg-neutral-50 transition-colors text-xs uppercase tracking-wider"
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Consignment History</span>
            </div>
            <span className="text-[11px] font-bold bg-neutral-200 px-2 py-0.5 rounded-full">
              {orders.length}
            </span>
          </Link>
          <Link
            href="/account/addresses"
            className="flex items-center gap-3 px-4 py-3 text-secondary-text hover:text-primary-text hover:bg-neutral-50 transition-colors text-xs uppercase tracking-wider"
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </Link>
          <Link
            href="/account/wishlist"
            className="flex items-center gap-3 px-4 py-3 text-secondary-text hover:text-primary-text hover:bg-neutral-50 transition-colors text-xs uppercase tracking-wider"
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist Sanctuary</span>
          </Link>
        </aside>

        {/* Content Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Profile Form */}
          <div className="bg-white border border-black/[0.06] p-6 sm:p-8 shadow-subtle space-y-6">
            <h2 className="font-serif text-2xl text-primary-text pb-4 border-b border-black/10">
              Personal Information
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input
                label="Contact Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                label="Email Address"
                value={profile?.email || user.email}
                disabled
              />

              <div className="pt-2">
                <Button type="submit" size="md">
                  <span>Save Profile Updates</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white border border-black/[0.06] p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-black/10">
              <h2 className="font-serif text-2xl text-primary-text">
                Recent Consignments
              </h2>
              <Link
                href="/account/orders"
                className="text-xs uppercase tracking-widest font-semibold text-accent hover:underline"
              >
                View All
              </Link>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-secondary-text py-4">No recent consignments on record.</p>
            ) : (
              <div className="divide-y divide-black/5">
                {orders.slice(0, 3).map((o) => (
                  <div key={o.id} className="py-4 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-mono font-bold text-primary-text">{o.order_number}</p>
                      <p className="text-secondary-text">{formatDate(o.created_at)}</p>
                    </div>
                    <div>
                      <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold uppercase tracking-wider text-[10px]">
                        {o.fulfillment_status}
                      </span>
                    </div>
                    <span className="font-semibold text-primary-text">
                      {formatCurrency(o.total)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
