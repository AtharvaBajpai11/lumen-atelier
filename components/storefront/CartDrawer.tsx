'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingCost,
    taxAmount,
    total,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    await applyCoupon(couponCode.trim());
    setIsApplyingCoupon(false);
    setCouponCode('');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-drawer flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary-text" />
                  <h2 className="font-serif text-xl font-normal text-primary-text">
                    Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={closeDrawer}
                  aria-label="Close cart"
                  className="p-1.5 text-secondary-text hover:text-primary-text transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping progress bar */}
              <div className="px-6 py-3 bg-[#F5F5F0] border-b border-black/5">
                {subtotal >= 150 ? (
                  <p className="text-xs font-medium text-emerald-700 tracking-wide">
                    ✓ You have unlocked complimentary archival shipping!
                  </p>
                ) : (
                  <div>
                    <p className="text-xs text-secondary-text tracking-wide mb-1.5">
                      Add <span className="font-semibold text-primary-text">{formatCurrency(150 - subtotal)}</span> more for complimentary shipping
                    </p>
                    <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotal / 150) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[#F5F5F0] flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-neutral-400 stroke-1" />
                    </div>
                    <h3 className="font-serif text-2xl text-primary-text mb-2">Your cart is empty</h3>
                    <p className="text-sm text-secondary-text max-w-xs mb-8">
                      Discover our curated series of architectural living objects, linen, and pure scents.
                    </p>
                    <Button onClick={closeDrawer} size="md">
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.05 },
                      },
                    }}
                    className="divide-y divide-black/5"
                  >
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, x: 50 }}
                          transition={{ duration: 0.25 }}
                          className="py-4 flex gap-4"
                        >
                          {/* Image */}
                          <div className="relative w-20 h-24 shrink-0 bg-[#F5F5F0] overflow-hidden border border-black/5">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="80px"
                              className="object-cover object-center"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-serif text-base text-primary-text line-clamp-1">
                                  {item.title}
                                </h4>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-neutral-400 hover:text-sale transition-colors p-1"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {item.variantInfo && (
                                <p className="text-xs text-secondary-text mt-0.5">
                                  {Object.entries(item.variantInfo)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(' / ')}
                                </p>
                              )}

                              <div className="text-xs font-semibold text-primary-text mt-1">
                                {formatCurrency(item.price)}
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="inline-flex items-center border border-black/15 bg-white">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 flex items-center justify-center text-primary-text hover:bg-black/5 cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-xs font-medium text-primary-text">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center text-primary-text hover:bg-black/5 cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-xs font-semibold text-primary-text">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Drawer Footer & Checkout CTAs */}
              {items.length > 0 && (
                <div className="border-t border-black/10 px-6 py-5 bg-[#FAFAFA]">
                  {/* Promo code input */}
                  <div className="mb-4">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-semibold uppercase tracking-wider">
                            {appliedCoupon.code}
                          </span>
                          <span>(-{appliedCoupon.type === 'percentage' ? `${appliedCoupon.value}%` : formatCurrency(appliedCoupon.value)})</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-xs underline text-emerald-700 hover:text-emerald-900"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="PROMO CODE (e.g. WELCOME10)"
                          className="flex-1 h-10 px-3 bg-white border border-black/15 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
                        />
                        <button
                          type="submit"
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          className="h-10 px-4 bg-black text-white text-xs uppercase font-medium hover:bg-neutral-800 transition-colors disabled:opacity-40"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-secondary-text mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-primary-text font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sale font-medium">
                        <span>Discount</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="text-primary-text font-medium">
                        {shippingCost === 0 ? 'Complimentary' : formatCurrency(shippingCost)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax (8.25%)</span>
                      <span className="text-primary-text font-medium">{formatCurrency(taxAmount)}</span>
                    </div>
                    <div className="flex justify-between text-base text-primary-text font-serif font-bold pt-2 border-t border-black/10">
                      <span>Estimated Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2">
                    <Link href="/checkout" onClick={closeDrawer} className="w-full block">
                      <Button size="lg" className="w-full flex items-center justify-center gap-2">
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link
                      href="/cart"
                      onClick={closeDrawer}
                      className="block text-center text-xs tracking-wider uppercase text-secondary-text hover:text-primary-text transition-colors py-1"
                    >
                      View Full Cart Details
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
