'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, CartContextType, FlyingImageParams } from '@/types';
import { validateCoupon } from '@/lib/store';
import { useToast } from './ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

const CartContext = createContext<
  (CartContextType & {
    cartBounceKey: number;
    flyingGhost: FlyingImageParams | null;
  }) | undefined
>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartBounceKey, setCartBounceKey] = useState(0);
  const [flyingGhost, setFlyingGhost] = useState<FlyingImageParams | null>(null);

  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
  } | null>(null);

  const { addToast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lumen_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem('lumen_coupon');
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('lumen_cart', JSON.stringify(items));
    } catch (e) {}
  }, [items, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem('lumen_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('lumen_coupon');
      }
    } catch (e) {}
  }, [appliedCoupon, isLoaded]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  // Free shipping over $150
  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Number((taxableAmount * 0.0825).toFixed(2));
  const total = Number((taxableAmount + shippingCost + taxAmount).toFixed(2));

  const addItem = useCallback(
    (item: Omit<CartItem, 'id'>, event?: React.MouseEvent) => {
      // Trigger ghost flying image animation if click coordinates exist
      if (event && typeof window !== 'undefined') {
        const startX = event.clientX;
        const startY = event.clientY;
        setFlyingGhost({
          src: item.image,
          startX,
          startY,
        });

        setTimeout(() => {
          setFlyingGhost(null);
          // Trigger header cart spring bounce when ghost hits header
          setCartBounceKey((prev) => prev + 1);
        }, 650);
      } else {
        setCartBounceKey((prev) => prev + 1);
      }

      setItems((prev) => {
        const id = `${item.productId}-${item.variantId || 'default'}`;
        const existing = prev.find((i) => i.id === id);

        if (existing) {
          const newQty = Math.min(existing.quantity + item.quantity, item.maxStock || 99);
          return prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i));
        }

        return [...prev, { ...item, id }];
      });

      addToast(`Added "${item.title}" to your cart`, 'success');
    },
    [addToast]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, quantity: Math.min(quantity, i.maxStock || 99) } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = async (code: string) => {
    const res = await validateCoupon(code, subtotal);
    if (res.valid && res.coupon) {
      setAppliedCoupon({
        code: res.coupon.code,
        type: res.coupon.type,
        value: res.coupon.value,
      });
      addToast(`Promotional code "${res.coupon.code}" applied`, 'success');
      return { success: true, message: 'Coupon applied successfully' };
    }
    addToast(res.message || 'Invalid coupon code', 'error');
    return { success: false, message: res.message || 'Invalid coupon' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon code removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingCost,
        taxAmount,
        total,
        cartBounceKey,
        flyingGhost,
      }}
    >
      {children}

      {/* Ghost flying image add-to-cart bezier arc animation */}
      <AnimatePresence>
        {flyingGhost && (
          <motion.div
            initial={{
              position: 'fixed',
              left: flyingGhost.startX - 32,
              top: flyingGhost.startY - 32,
              width: 64,
              height: 64,
              opacity: 1,
              scale: 1,
              rotate: 0,
              zIndex: 9999,
              pointerEvents: 'none',
            }}
            animate={{
              left: typeof window !== 'undefined' ? window.innerWidth - 80 : 1000,
              top: 28,
              width: 24,
              height: 24,
              opacity: [1, 0.9, 0],
              scale: [1, 0.6, 0.2],
              rotate: 15,
            }}
            transition={{
              duration: 0.65,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="rounded-full shadow-2xl overflow-hidden border-2 border-white bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flyingGhost.src}
              alt="Added product"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
