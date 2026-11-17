'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { ArrowRight, Instagram, Twitter, Facebook, Youtube, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      addToast('Thank you for joining our private archival dispatch.', 'success');
    }, 400);
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-12 border-t border-black">
      <div className="max-w-site mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand & Newsletter Column (spans 2 on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <span className="font-serif text-3xl tracking-[0.1em] text-white block">
              LUMEN ATELIER
            </span>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Objects for deliberate living. Designed in Copenhagen and handcrafted by master artisans across Tuscany, Kyoto, and Normandy.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-[0.15em] font-semibold text-neutral-300 mb-2">
                Join the Archival Dispatch
              </span>
              <p className="text-xs text-neutral-500 mb-3">
                Receive private access to limited studio runs, monographs, and sensory notes.
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 h-12 px-4 bg-white/5 border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-5 bg-white text-black hover:bg-neutral-200 transition-colors uppercase text-xs tracking-widest font-semibold flex items-center justify-center cursor-pointer disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Collection Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-white mb-4">
              Collection
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Objects
                </Link>
              </li>
              <li>
                <Link href="/products?category=living" className="hover:text-white transition-colors">
                  Living & Vessels
                </Link>
              </li>
              <li>
                <Link href="/products?category=fragrance" className="hover:text-white transition-colors">
                  Sensory & Scent
                </Link>
              </li>
              <li>
                <Link href="/products?category=apparel" className="hover:text-white transition-colors">
                  Linen & Knitwear
                </Link>
              </li>
              <li>
                <Link href="/products?category=leather" className="hover:text-white transition-colors">
                  Tuscan Leather
                </Link>
              </li>
            </ul>
          </div>

          {/* Maison & Atelier Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-white mb-4">
              Atelier
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Concierge & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Archival Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns-policy" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Legal Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-white mb-4">
              Client Sanctuary
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Collector Dashboard
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-neutral-500 hover:text-white transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} LUMEN ATELIER. Handcrafted for timeless modern spaces. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
