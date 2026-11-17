'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { SearchModal } from './SearchModal';

interface HeaderProps {
  siteName?: string;
  announcementText?: string;
  announcementActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  siteName = 'LUMEN ATELIER',
  announcementText = 'COMPLIMENTARY CONCIERGE DELIVERY & COMPREHENSIVE WARRANTY ON ALL ORDERS',
  announcementActive = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const { itemCount, openDrawer, cartBounceKey } = useCart();
  const { user, isAdmin } = useAuth();

  const cartControls = useAnimation();
  const badgeControls = useAnimation();

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger bounce animation when cartBounceKey changes
  useEffect(() => {
    if (cartBounceKey > 0) {
      cartControls.start({
        scale: [1, 1.35, 0.95, 1],
        transition: { type: 'spring', stiffness: 400, damping: 15 },
      });
      badgeControls.start({
        scale: [1, 1.4, 1],
        transition: { duration: 0.25 },
      });
    }
  }, [cartBounceKey, cartControls, badgeControls]);

  const navLinks = [
    { name: 'All Atelier', href: '/products' },
    { name: 'Electronics', href: '/products?category=electronics' },
    { name: 'Fashion', href: '/products?category=fashion' },
    { name: 'Automotive', href: '/products?category=automotive' },
    { name: 'Home', href: '/products?category=home-kitchen' },
  ];

  const moreCategories = [
    { name: 'Beauty & Personal Care', href: '/products?category=beauty-personal-care', desc: 'Luxury skincare, haircare, and fragrances' },
    { name: 'Sports & Fitness', href: '/products?category=sports-outdoor', desc: 'Cardio machinery, weights, and athletic apparel' },
    { name: 'Books & Stationery', href: '/products?category=books-stationery', desc: 'Rare monographs, fountain pens, and notebooks' },
    { name: 'Toys & Gaming', href: '/products?category=toys-games', desc: 'Consoles, precision drones, and classic sets' },
    { name: 'Gourmet & Essentials', href: '/products?category=grocery-essentials', desc: 'Artisanal olive oils, coffee, and preserves' },
    { name: 'Travel & Luggage', href: '/products?category=travel-accessories', desc: 'Aluminum carry-ons, backpacks, and dopp kits' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      {announcementActive && (
        <div className="bg-[#1A1A1A] text-white text-[11px] font-medium tracking-[0.15em] uppercase text-center py-2 px-4 transition-colors">
          <span>{announcementText}</span>
        </div>
      )}

      {/* Main Sticky Header (80px -> 60px) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'h-[60px] bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm'
            : 'h-[80px] bg-[#FAFAFA] border-b border-black/[0.04]'
        }`}
      >
        <div className="max-w-site mx-auto h-full px-6 lg:px-12 flex items-center justify-between gap-6">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-4 lg:gap-0">
            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 text-primary-text hover:text-black transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-primary-text hover:text-black transition-colors cursor-pointer"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo */}
            <Link href="/" className="inline-block group shrink-0">
              <span className="font-serif text-2xl lg:text-3xl font-normal tracking-[0.08em] text-primary-text group-hover:opacity-80 transition-opacity">
                {siteName}
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.12em] font-medium text-secondary-text hover:text-primary-text transition-colors relative py-1 group shrink-0"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}

            {/* More Categories Dropdown */}
            <div
              className="relative py-1 shrink-0"
              onMouseEnter={() => setIsMoreMenuOpen(true)}
              onMouseLeave={() => setIsMoreMenuOpen(false)}
            >
              <button
                className="text-xs uppercase tracking-[0.12em] font-medium text-secondary-text hover:text-primary-text transition-colors flex items-center gap-1 cursor-pointer"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMoreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-4 w-72 bg-white border border-black/10 shadow-xl py-3 px-2 z-50 rounded-sm"
                  >
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-secondary-text px-3 py-1 mb-1 border-b border-black/5">
                      All Curated Departments
                    </div>
                    {moreCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setIsMoreMenuOpen(false)}
                        className="block px-3 py-2 text-xs text-primary-text hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="font-medium group-hover:text-accent transition-colors">
                          {cat.name}
                        </div>
                        <div className="text-[10px] text-secondary-text line-clamp-1 mt-0.5">
                          {cat.desc}
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 xl:gap-5 shrink-0">
            {/* Desktop Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs uppercase tracking-widest text-secondary-text hover:text-primary-text transition-colors cursor-pointer p-1.5"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-primary-text" />
              <span className="hidden xl:inline text-[11px]">Search</span>
            </button>

            {/* Admin Badge shortcut if Admin */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-semibold text-accent hover:text-accent-hover bg-blue-50 border border-blue-200 px-2.5 py-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}

            {/* Account Icon */}
            <Link
              href={user ? '/account' : '/account/login'}
              className="p-1.5 text-primary-text hover:text-black transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Icon with Spring Bounce */}
            <button
              onClick={openDrawer}
              className="p-1.5 text-primary-text hover:text-black transition-colors relative cursor-pointer"
              aria-label={`Cart with ${itemCount} items`}
            >
              <motion.div animate={cartControls}>
                <ShoppingBag className="w-5 h-5" />
              </motion.div>

              {itemCount > 0 && (
                <motion.span
                  animate={badgeControls}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Full-Screen Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FAFAFA] flex flex-col justify-between px-8 py-8 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-black/10">
              <span className="font-serif text-2xl tracking-wider text-primary-text">
                {siteName}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-primary-text hover:text-black cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Staggered Nav Links */}
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                },
              }}
              className="my-auto py-6 space-y-4 max-h-[70vh] overflow-y-auto pr-2"
            >
              <div className="text-[10px] uppercase tracking-widest text-secondary-text font-bold mb-2">Main Departments</div>
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-2xl text-primary-text hover:text-accent transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-secondary-text" />
                  </Link>
                </motion.div>
              ))}

              <div className="text-[10px] uppercase tracking-widest text-secondary-text font-bold pt-4 pb-1 border-t border-black/5">Additional Collections</div>
              <div className="grid grid-cols-1 gap-2.5">
                {moreCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-secondary-text hover:text-primary-text flex items-center justify-between py-1"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-secondary-text/60" />
                  </Link>
                ))}
              </div>

              {isAdmin && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-xl text-accent flex items-center justify-between pt-4 border-t border-black/5"
                  >
                    <span>Admin Control Center</span>
                    <ShieldCheck className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </motion.nav>

            {/* Bottom Links */}
            <div className="pt-6 border-t border-black/10 flex justify-between items-center text-xs uppercase tracking-widest text-secondary-text">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary-text"
              >
                Account / Sign In
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary-text"
              >
                Concierge
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
