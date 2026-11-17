'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const {
    items,
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
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplying(true);
    await applyCoupon(couponCode.trim());
    setIsApplying(false);
    setCouponCode('');
  };

  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-12 lg:py-20">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text mb-2">
          Your Curated Selection
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-primary-text">
          Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center bg-white border border-black/5 shadow-subtle p-8 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-[#F5F5F0] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-neutral-400 stroke-[1.2]" />
          </div>
          <h2 className="font-serif text-3xl text-primary-text mb-2">Your cart is empty</h2>
          <p className="text-sm text-secondary-text leading-relaxed mb-8">
            Explore our curated catalog of architectural stoneware, handcrafted linen, and botanical fragrances.
          </p>
          <Link href="/products">
            <Button size="lg">Explore Collection</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items Table (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-black/[0.06] shadow-subtle divide-y divide-black/5">
            <div className="hidden sm:grid grid-cols-12 px-6 py-4 text-xs uppercase tracking-widest text-secondary-text font-semibold border-b border-black/10 bg-[#FAFAFA]">
              <span className="col-span-6">Object</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, x: 40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 flex flex-col sm:grid sm:grid-cols-12 items-center gap-4"
                >
                  {/* Object Info */}
                  <div className="sm:col-span-6 flex gap-4 w-full">
                    <div className="relative w-20 h-24 shrink-0 bg-[#F5F5F0] border border-black/5 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-primary-text line-clamp-1">
                          {item.title}
                        </h3>
                        {item.variantInfo && (
                          <p className="text-xs text-secondary-text mt-0.5">
                            {Object.entries(item.variantInfo)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(' / ')}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-neutral-400 hover:text-sale inline-flex items-center gap-1 transition-colors w-fit pt-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="sm:col-span-2 text-center text-sm font-medium text-primary-text hidden sm:block">
                    {formatCurrency(item.price)}
                  </div>

                  {/* Quantity Controls */}
                  <div className="sm:col-span-2 flex justify-center w-full sm:w-auto">
                    <div className="inline-flex items-center border border-black/15 bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-primary-text hover:bg-black/5"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-primary-text hover:bg-black/5"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="sm:col-span-2 text-right text-sm font-semibold text-primary-text w-full sm:w-auto flex justify-between sm:justify-end">
                    <span className="sm:hidden text-xs text-secondary-text uppercase">Line Total:</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary Card (4 Cols) */}
          <div className="lg:col-span-4 bg-[#F5F5F0] border border-black/10 p-6 lg:p-8 space-y-6 sticky top-28">
            <h3 className="font-serif text-2xl font-normal text-primary-text pb-4 border-b border-black/10">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold uppercase tracking-wider">
                      {appliedCoupon.code}
                    </span>
                    <span>
                      (-{appliedCoupon.type === 'percentage' ? `${appliedCoupon.value}%` : formatCurrency(appliedCoupon.value)})
                    </span>
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
                    className="flex-1 h-11 px-3 bg-white border border-black/15 text-xs uppercase tracking-wider focus:outline-none focus:border-black"
                  />
                  <button
                    type="submit"
                    disabled={isApplying || !couponCode.trim()}
                    className="h-11 px-4 bg-black text-white text-xs uppercase font-medium hover:bg-neutral-800 transition-colors disabled:opacity-40"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-3 text-xs text-secondary-text pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-primary-text font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sale font-semibold">
                  <span>Archival Discount</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Archival Shipping</span>
                <span className="text-primary-text font-semibold">
                  {shippingCost === 0 ? 'Complimentary' : formatCurrency(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8.25%)</span>
                <span className="text-primary-text font-semibold">{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-lg text-primary-text font-serif font-bold pt-4 border-t border-black/10">
                <span>Total Amount</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button size="lg" className="w-full flex items-center justify-center gap-2">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-secondary-text">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Encrypted 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
