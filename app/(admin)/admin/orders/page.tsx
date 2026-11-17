'use client';

import React, { useState, useEffect } from 'react';
import { getOrders } from '@/lib/store';
import { Order, FulfillmentStatus } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import {
  Search,
  Download,
  Printer,
  Truck,
  Clock,
  Eye,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingCarrier, setTrackingCarrier] = useState('FedEx Air Cargo');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    async function load() {
      const all = await getOrders();
      setOrders(all);
    }
    load();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: FulfillmentStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, fulfillment_status: newStatus } : o));
    setOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, fulfillment_status: newStatus });
    }
    addToast(`Order fulfillment status updated to ${newStatus.toUpperCase()}`, 'success');
  };

  const handleSaveTracking = () => {
    if (!selectedOrder) return;
    const updated = orders.map((o) =>
      o.id === selectedOrder.id
        ? { ...o, tracking_number: trackingNumber, tracking_carrier: trackingCarrier }
        : o
    );
    setOrders(updated);
    setSelectedOrder({ ...selectedOrder, tracking_number: trackingNumber, tracking_carrier: trackingCarrier });
    addToast('Tracking number and carrier archived', 'success');
  };

  const exportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer Email', 'Items', 'Total', 'Payment Status', 'Fulfillment'];
    const rows = orders.map((o) => [
      o.order_number,
      o.created_at,
      o.email,
      o.items?.length || 1,
      o.total,
      o.payment_status,
      o.fulfillment_status,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lumen_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Exported orders CSV file', 'info');
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? o.fulfillment_status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h1 className="font-serif text-3xl font-normal text-primary-text">
            Consignment Logistics & Orders
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Track fulfillment states, assign air freight tracking, and print museum packing slips.
          </p>
        </div>
        <Button onClick={exportCSV} variant="secondary" size="md">
          <Download className="w-4 h-4 mr-1.5" />
          <span>Export Orders CSV</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-black/[0.08] shadow-subtle">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order number (e.g. ORD-10001) or collector email..."
            className="w-full h-10 pl-9 pr-4 bg-transparent border border-black/10 text-xs focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 bg-white border border-black/10 text-xs uppercase tracking-wider text-primary-text focus:outline-none focus:border-black"
          >
            <option value="">All Fulfillment States</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <span className="text-xs text-secondary-text">{filtered.length} Manifests</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-black/[0.08] shadow-subtle overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/10 text-secondary-text uppercase tracking-wider font-semibold bg-[#FAFAFA]">
              <th className="py-3 px-4">Order #</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Customer Email</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Fulfillment</th>
              <th className="py-3 px-4 text-right">Total</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-primary-text">{o.order_number}</td>
                <td className="py-3 px-4 text-secondary-text">{formatDate(o.created_at)}</td>
                <td className="py-3 px-4 text-primary-text">{o.email}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {o.payment_status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                    {o.fulfillment_status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-semibold text-primary-text">
                  {formatCurrency(o.total)}
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(o);
                      setTrackingNumber(o.tracking_number || '');
                      setTrackingCarrier(o.tracking_carrier || 'FedEx Air Cargo');
                      setIsDetailOpen(true);
                    }}
                    className="p-1 text-secondary-text hover:text-black"
                    title="View details & update tracking"
                  >
                    <Eye className="w-4 h-4 inline" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrder(o);
                      setIsInvoiceOpen(true);
                    }}
                    className="p-1 text-secondary-text hover:text-black"
                    title="Print packing slip"
                  >
                    <Printer className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Manifest: ${selectedOrder.order_number}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 text-xs">
            {/* Status Change Dropdown */}
            <div className="flex items-center justify-between p-4 bg-[#F5F5F0] border border-black/10">
              <span className="uppercase font-bold tracking-wider text-primary-text">
                Fulfillment State
              </span>
              <select
                value={selectedOrder.fulfillment_status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as any)}
                className="h-9 px-3 bg-white border border-black/20 text-xs font-semibold focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Tracking number update */}
            <div className="space-y-3 p-4 border border-black/10 bg-white">
              <h4 className="font-bold uppercase tracking-wider text-primary-text flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>Air Freight Tracking Details</span>
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Carrier (e.g. DHL Express / FedEx)"
                  value={trackingCarrier}
                  onChange={(e) => setTrackingCarrier(e.target.value)}
                  className="h-10 px-3 bg-white border border-black/15 text-xs"
                />
                <input
                  type="text"
                  placeholder="Tracking Number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-10 px-3 bg-white border border-black/15 text-xs font-mono"
                />
              </div>
              <Button onClick={handleSaveTracking} size="sm">
                Save Tracking Code
              </Button>
            </div>

            {/* Items */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-primary-text mb-2">
                Objects Manifest
              </h4>
              <div className="divide-y divide-black/5 border border-black/10">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-serif text-sm font-normal text-primary-text">{item.title}</p>
                      <p className="text-secondary-text">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-primary-text">
                      {formatCurrency(item.unit_price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="p-4 bg-white border border-black/10 space-y-1">
              <span className="font-bold uppercase tracking-wider text-secondary-text block mb-1">
                Consignee Shipping Address
              </span>
              <p className="font-semibold text-primary-text">{selectedOrder.shipping_address?.full_name}</p>
              <p className="text-secondary-text">
                {selectedOrder.shipping_address?.address_line1} {selectedOrder.shipping_address?.address_line2}
              </p>
              <p className="text-secondary-text">
                {selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state}{' '}
                {selectedOrder.shipping_address?.zip}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Printable Invoice Modal */}
      {selectedOrder && (
        <Modal
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          title="Consignment Packing Slip & Invoice"
          maxWidth="2xl"
        >
          <div className="p-6 bg-white space-y-6 text-xs text-primary-text border border-black/10 print:border-none">
            <div className="flex justify-between items-start pb-4 border-b border-black">
              <div>
                <h2 className="font-serif text-2xl font-normal">LUMEN ATELIER</h2>
                <p className="text-[10px] text-secondary-text tracking-widest uppercase">
                  104 Greene Street, SoHo, NY 10012
                </p>
              </div>
              <div className="text-right font-mono">
                <p className="font-bold text-base">{selectedOrder.order_number}</p>
                <p className="text-secondary-text">{formatDate(selectedOrder.created_at)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold uppercase text-[10px] text-secondary-text">Consignee</p>
                <p className="font-semibold">{selectedOrder.shipping_address?.full_name}</p>
                <p className="text-secondary-text">{selectedOrder.shipping_address?.address_line1}</p>
                <p className="text-secondary-text">
                  {selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state}{' '}
                  {selectedOrder.shipping_address?.zip}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold uppercase text-[10px] text-secondary-text">Payment Gateway</p>
                <p>Razorpay Direct Verified</p>
                <p className="font-mono text-secondary-text">{selectedOrder.razorpay_payment_id || 'Captured'}</p>
              </div>
            </div>

            <div className="border border-black">
              <table className="w-full text-left">
                <thead className="bg-[#F5F5F0] border-b border-black text-[10px] uppercase font-bold">
                  <tr>
                    <th className="p-2">Object</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Unit Price</th>
                    <th className="p-2 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {selectedOrder.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2 text-center">{item.quantity}</td>
                      <td className="p-2 text-right">{formatCurrency(item.unit_price)}</td>
                      <td className="p-2 text-right font-semibold">
                        {formatCurrency(item.unit_price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2 text-sm">
              <div className="w-48 space-y-1">
                <div className="flex justify-between font-bold text-base border-t border-black pt-2">
                  <span>Total Amount:</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-black/10">
              <Button onClick={() => window.print()} size="sm">
                <Printer className="w-3.5 h-3.5 mr-1" />
                <span>Print Official Slip</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
