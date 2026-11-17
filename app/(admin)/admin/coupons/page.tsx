'use client';

import React, { useState } from 'react';
import { Coupon } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { Plus, Edit, Trash2, Tag, Check, X } from 'lucide-react';

export default function AdminCouponsPage() {
  const { addToast } = useToast();

  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 'c1',
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      min_order_amount: 50,
      usage_limit: 500,
      per_customer_limit: 1,
      times_used: 14,
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'c2',
      code: 'ARCHIVE50',
      type: 'fixed',
      value: 50,
      min_order_amount: 200,
      usage_limit: 50,
      per_customer_limit: 1,
      times_used: 8,
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'c3',
      code: 'STUDIOVIP',
      type: 'percentage',
      value: 20,
      min_order_amount: 300,
      usage_limit: 25,
      per_customer_limit: 1,
      times_used: 12,
      is_active: true,
      created_at: new Date().toISOString(),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState('');
  const [minOrder, setMinOrder] = useState('0');
  const [usageLimit, setUsageLimit] = useState('100');
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingCoupon(null);
    setCode('');
    setType('percentage');
    setValue('15');
    setMinOrder('100');
    setUsageLimit('100');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (c: Coupon) => {
    setEditingCoupon(c);
    setCode(c.code);
    setType(c.type);
    setValue(c.value.toString());
    setMinOrder(c.min_order_amount.toString());
    setUsageLimit(c.usage_limit.toString());
    setIsActive(c.is_active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !value) return;

    if (editingCoupon) {
      setCoupons(
        coupons.map((c) =>
          c.id === editingCoupon.id
            ? {
                ...c,
                code: code.toUpperCase().trim(),
                type,
                value: Number(value),
                min_order_amount: Number(minOrder),
                usage_limit: Number(usageLimit),
                is_active: isActive,
              }
            : c
        )
      );
      addToast(`Updated promotional code "${code.toUpperCase()}"`, 'success');
    } else {
      const newCoupon: Coupon = {
        id: `coup_${Date.now()}`,
        code: code.toUpperCase().trim(),
        type,
        value: Number(value),
        min_order_amount: Number(minOrder),
        usage_limit: Number(usageLimit),
        per_customer_limit: 1,
        times_used: 0,
        is_active: isActive,
        created_at: new Date().toISOString(),
      };
      setCoupons([...coupons, newCoupon]);
      addToast(`Created promotional code "${code.toUpperCase()}"`, 'success');
    }
    setIsModalOpen(false);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    addToast('Coupon removed from system', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h1 className="font-serif text-3xl font-normal text-primary-text">
            Promotional Coupons & Privileges
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Generate archival percentage discounts or fixed order deductions.
          </p>
        </div>
        <Button onClick={openCreateModal} size="md">
          <Plus className="w-4 h-4 mr-1" />
          <span>New Promo Code</span>
        </Button>
      </div>

      <div className="bg-white border border-black/[0.08] shadow-subtle overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/10 text-secondary-text uppercase tracking-wider font-semibold bg-[#FAFAFA]">
              <th className="py-3 px-4">Promo Code</th>
              <th className="py-3 px-4">Discount Type</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Min Spend</th>
              <th className="py-3 px-4">Redemptions</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-sm text-primary-text flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-accent" />
                  <span>{c.code}</span>
                </td>
                <td className="py-3 px-4 uppercase text-secondary-text">{c.type}</td>
                <td className="py-3 px-4 font-semibold text-primary-text">
                  {c.type === 'percentage' ? `${c.value}% OFF` : formatCurrency(c.value) + ' OFF'}
                </td>
                <td className="py-3 px-4 text-secondary-text">{formatCurrency(c.min_order_amount)}</td>
                <td className="py-3 px-4">
                  <span className="font-medium text-primary-text">
                    {c.times_used} / {c.usage_limit}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                      c.is_active
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                    }`}
                  >
                    {c.is_active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button onClick={() => openEditModal(c)} className="p-1 text-secondary-text hover:text-black">
                    <Edit className="w-4 h-4 inline" />
                  </button>
                  <button onClick={() => deleteCoupon(c.id)} className="p-1 text-neutral-400 hover:text-sale">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCoupon ? 'Edit Promotional Code' : 'Create Promotional Code'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Promo Code (e.g. SOLSTICE15)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-secondary-text mb-1">
                Discount Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full h-14 px-3 bg-white border border-black/15 text-xs uppercase"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Currency ($)</option>
              </select>
            </div>

            <Input
              label={type === 'percentage' ? 'Percentage (e.g. 15)' : 'Amount ($ e.g. 50)'}
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Minimum Spend ($)"
              type="number"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
            />
            <Input
              label="Usage Cap Limit"
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
            />
          </div>

          <label className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold pt-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="accent-black w-4 h-4"
            />
            <span>Active for Public Checkout</span>
          </label>

          <div className="pt-4 flex justify-end gap-3 border-t border-black/10">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Promo Code</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
