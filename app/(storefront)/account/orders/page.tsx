'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getOrders } from '@/lib/store';
import { Order } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Package, ArrowLeft, Clock, CheckCircle2, Truck } from 'lucide-react';

export default function AccountOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      const all = await getOrders();
      setOrders(all);
      if (all.length > 0) setSelectedOrder(all[0]);
    }
    fetchOrders();
  }, []);

  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-12 lg:py-20">
      <div className="mb-8">
        <Link
          href="/account"
          className="text-xs uppercase tracking-widest text-secondary-text hover:text-black flex items-center gap-1.5 mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collector Dashboard</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
          Consignment Manifest & History
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-black/10 p-12 text-center max-w-md mx-auto shadow-subtle">
          <Package className="w-10 h-10 text-neutral-400 mx-auto mb-4 stroke-1" />
          <h2 className="font-serif text-2xl text-primary-text mb-2">No past consignments</h2>
          <p className="text-xs text-secondary-text mb-6">
            When you complete an acquisition from our catalog, track progress and documents here.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold inline-block"
          >
            Explore Objects
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Orders List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {orders.map((o) => {
              const isSelected = selectedOrder?.id === o.id;
              return (
                <div
                  key={o.id}
                  onClick={() => setSelectedOrder(o)}
                  className={`p-5 border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-black bg-white shadow-card'
                      : 'border-black/10 bg-white/60 hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm font-bold text-primary-text">
                      {o.order_number}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800">
                      {o.fulfillment_status}
                    </span>
                  </div>
                  <div className="flex justify-between items-end text-xs text-secondary-text">
                    <span>{formatDate(o.created_at)}</span>
                    <span className="font-bold text-primary-text text-sm">
                      {formatCurrency(o.total)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Details & Timeline View (7 Cols) */}
          {selectedOrder && (
            <div className="lg:col-span-7 bg-white border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-black/10">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-secondary-text">
                    Consignment File
                  </span>
                  <h2 className="font-mono text-xl font-bold text-primary-text">
                    {selectedOrder.order_number}
                  </h2>
                  <p className="text-xs text-secondary-text">
                    Placed on {formatDate(selectedOrder.created_at)} • Payment via Razorpay ({selectedOrder.payment_status.toUpperCase()})
                  </p>
                </div>
                <span className="text-sm font-serif font-bold text-primary-text">
                  Total: {formatCurrency(selectedOrder.total)}
                </span>
              </div>

              {/* Status Timeline */}
              <div className="pt-2">
                <h3 className="text-xs uppercase tracking-wider font-bold text-primary-text mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Consignment Status Milestones</span>
                </h3>

                <div className="space-y-4 pl-3 border-l-2 border-black/10 ml-2">
                  <div className="relative pl-4">
                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                    <p className="text-xs font-bold text-primary-text uppercase tracking-wider">
                      Payment Captured & Order Confirmed
                    </p>
                    <p className="text-[11px] text-secondary-text">
                      Transaction verified via 256-bit encrypted gateway.
                    </p>
                  </div>

                  <div className="relative pl-4">
                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                    <p className="text-xs font-bold text-primary-text uppercase tracking-wider">
                      Archival Crate & Inspection
                    </p>
                    <p className="text-[11px] text-secondary-text">
                      Object undergoing material inspection and museum wrapping.
                    </p>
                  </div>

                  <div className="relative pl-4 opacity-50">
                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-neutral-300" />
                    <p className="text-xs font-bold text-primary-text uppercase tracking-wider">
                      Air Courier Dispatch
                    </p>
                    <p className="text-[11px] text-secondary-text">
                      Tracking code will activate once cargo manifest clears tarmac.
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Manifest */}
              <div className="pt-4 border-t border-black/10">
                <h3 className="text-xs uppercase tracking-wider font-bold text-primary-text mb-3">
                  Items Manifest
                </h3>
                <div className="divide-y divide-black/5">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-serif text-sm text-primary-text font-normal">{item.title}</p>
                        <p className="text-secondary-text">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-primary-text">
                        {formatCurrency(item.unit_price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="pt-4 border-t border-black/10 text-xs text-secondary-text space-y-1">
                <p className="font-bold uppercase tracking-wider text-primary-text">
                  Delivery Destination
                </p>
                <p className="text-primary-text font-medium">{selectedOrder.shipping_address?.full_name}</p>
                <p>
                  {selectedOrder.shipping_address?.address_line1} {selectedOrder.shipping_address?.address_line2}
                </p>
                <p>
                  {selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state}{' '}
                  {selectedOrder.shipping_address?.zip}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
