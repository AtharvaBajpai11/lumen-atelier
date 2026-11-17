'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Check, ArrowRight, Package, Calendar, ShieldCheck } from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-10024';

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 lg:py-24 text-center">
      {/* Animated Checkmark SVG Path Draw */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
      >
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>

      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-700 block mb-2">
        Payment & Consignment Authorized
      </span>
      <h1 className="font-serif text-3xl sm:text-5xl font-normal text-primary-text mb-3">
        Thank You for Your Order
      </h1>
      <p className="text-sm text-secondary-text max-w-md mx-auto leading-relaxed mb-8">
        Your order confirmation and archival consignment manifest have been dispatched to your email address.
      </p>

      {/* Order Info Card */}
      <div className="bg-white border border-black/10 shadow-subtle p-6 sm:p-8 text-left space-y-4 mb-8">
        <div className="flex justify-between items-center pb-4 border-b border-black/10">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-secondary-text font-bold block">
              Consignment Reference
            </span>
            <span className="font-mono text-base font-bold text-primary-text">{orderId}</span>
          </div>
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            Confirmed & In Preparation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-primary-text mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-primary-text uppercase tracking-wider">Estimated Delivery</p>
              <p className="text-secondary-text">{formattedDelivery}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Package className="w-4 h-4 text-primary-text mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-primary-text uppercase tracking-wider">Courier Method</p>
              <p className="text-secondary-text">Standard Archival Air Express (Signature Required)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href={`/account/orders?id=${orderId}`} className="w-full sm:w-auto">
          <Button variant="secondary" size="md" className="w-full">
            <span>Track Consignment</span>
          </Button>
        </Link>
        <Link href="/products" className="w-full sm:w-auto">
          <Button size="md" className="w-full">
            <span>Continue Exploring Atelier</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Finalizing confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
