'use client';

import React, { useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Search, Eye, Mail, Phone, Calendar } from 'lucide-react';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinDate: string;
  status: 'active' | 'vip' | 'inactive';
}

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  const [customers] = useState<CustomerRecord[]>([
    {
      id: 'c1',
      name: 'Elena Vance',
      email: 'elena@archstudio.com',
      phone: '+1 (415) 555-0182',
      ordersCount: 4,
      totalSpent: 1420,
      joinDate: '2024-03-12',
      status: 'vip',
    },
    {
      id: 'c2',
      name: 'Julian Thorne',
      email: 'julian.k@outlook.com',
      phone: '+1 (212) 555-0144',
      ordersCount: 2,
      totalSpent: 425,
      joinDate: '2024-06-18',
      status: 'active',
    },
    {
      id: 'c3',
      name: 'Marcus Bell',
      email: 'mbell@designtrust.org',
      phone: '+1 (312) 555-0199',
      ordersCount: 1,
      totalSpent: 280,
      joinDate: '2024-09-02',
      status: 'active',
    },
    {
      id: 'c4',
      name: 'Soren Lindqvist',
      email: 'soren@nordicspace.dk',
      phone: '+45 32 55 01 22',
      ordersCount: 6,
      totalSpent: 2840,
      joinDate: '2023-11-20',
      status: 'vip',
    },
  ]);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h1 className="font-serif text-3xl font-normal text-primary-text">
            Collector Register & Clients
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Review patron acquisition histories, lifetime values, and VIP status tiers.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-white border border-black/[0.08] shadow-subtle">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patron by name or email..."
            className="w-full h-10 pl-9 pr-4 bg-transparent border border-black/10 text-xs focus:outline-none focus:border-black"
          />
        </div>
        <span className="text-xs text-secondary-text">{filtered.length} Patrons</span>
      </div>

      <div className="bg-white border border-black/[0.08] shadow-subtle overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/10 text-secondary-text uppercase tracking-wider font-semibold bg-[#FAFAFA]">
              <th className="py-3 px-4">Collector Name</th>
              <th className="py-3 px-4">Contact Email</th>
              <th className="py-3 px-4">Consignments</th>
              <th className="py-3 px-4">Lifetime Value</th>
              <th className="py-3 px-4">Enrolled Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3 px-4 font-serif text-sm font-normal text-primary-text">
                  {c.name}
                </td>
                <td className="py-3 px-4 text-secondary-text">{c.email}</td>
                <td className="py-3 px-4 font-bold text-primary-text">{c.ordersCount}</td>
                <td className="py-3 px-4 font-semibold text-primary-text">
                  {formatCurrency(c.totalSpent)}
                </td>
                <td className="py-3 px-4 text-secondary-text">{formatDate(c.joinDate)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                      c.status === 'vip'
                        ? 'bg-purple-50 text-purple-800 border border-purple-200'
                        : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSelectedCustomer(c)}
                    className="p-1 text-secondary-text hover:text-black cursor-pointer"
                    title="View patron dossier"
                  >
                    <Eye className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Detail Dossier Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={`Patron Dossier: ${selectedCustomer.name}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#F5F5F0] border border-black/10 space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary-text">Patron ID:</span>
                <span className="font-mono font-bold">{selectedCustomer.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Email Address:</span>
                <span className="font-semibold text-primary-text">{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Telephone:</span>
                <span className="text-primary-text">{selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Total Consignments:</span>
                <span className="font-bold text-primary-text">{selectedCustomer.ordersCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Lifetime Consignment Value:</span>
                <span className="font-serif text-base font-bold text-primary-text">
                  {formatCurrency(selectedCustomer.totalSpent)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-secondary-text text-[11px] leading-relaxed">
                VIP patrons receive priority invitation to limited quarry releases and private exhibition private previews.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
