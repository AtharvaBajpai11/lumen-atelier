'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Ticket,
  Sliders,
  Search,
  Image as ImageIcon,
  BarChart3,
  ExternalLink,
  LogOut,
  ShieldAlert,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Layers },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
    { name: 'Brand & Settings', href: '/admin/settings', icon: Sliders },
    { name: 'SEO Management', href: '/admin/seo', icon: Search },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-black/10 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto z-30">
      <div>
        {/* Brand / Title */}
        <div className="p-6 border-b border-black/10 flex items-center justify-between">
          <div>
            <span className="font-serif text-lg font-bold tracking-wider text-primary-text block">
              LUMEN ATELIER
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                  isActive
                    ? 'bg-black text-white font-semibold'
                    : 'text-secondary-text hover:text-primary-text hover:bg-neutral-100'
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-black/10 space-y-2 bg-[#FAFAFA]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider text-secondary-text hover:text-black hover:bg-white transition-colors border border-black/5"
        >
          <span>View Live Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="px-3 py-2 flex items-center justify-between text-xs">
          <div className="min-w-0">
            <p className="font-semibold text-primary-text truncate text-[11px]">
              {profile?.full_name || 'Admin Curator'}
            </p>
            <p className="text-[10px] text-secondary-text truncate">{profile?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="text-neutral-400 hover:text-sale p-1"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
