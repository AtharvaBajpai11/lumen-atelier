'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MapPin, Plus, Trash2, ArrowLeft, Check } from 'lucide-react';

interface SavedAddress {
  id: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export default function AccountAddressesPage() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: 'addr_1',
      fullName: 'Arthur Pendelton',
      line1: '104 Greene Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10012',
      country: 'US',
      isDefault: true,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newLine1, setNewLine1] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newLine1 || !newCity || !newZip) {
      addToast('Please complete address fields', 'error');
      return;
    }
    const created: SavedAddress = {
      id: `addr_${Date.now()}`,
      fullName: newFullName,
      line1: newLine1,
      city: newCity,
      state: newState,
      zip: newZip,
      country: 'US',
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, created]);
    setIsAdding(false);
    setNewFullName('');
    setNewLine1('');
    setNewCity('');
    setNewState('');
    setNewZip('');
    addToast('Address added to your address book', 'success');
  };

  const setDefault = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    addToast('Default address updated', 'info');
  };

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    addToast('Address removed', 'info');
  };

  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-12 lg:py-20">
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-black/10">
        <div>
          <Link
            href="/account"
            className="text-xs uppercase tracking-widest text-secondary-text hover:text-black flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
            Saved Address Book
          </h1>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          <span>{isAdding ? 'Cancel' : 'Add New Address'}</span>
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white border border-black/10 p-6 sm:p-8 shadow-subtle mb-10 space-y-4 max-w-2xl">
          <h3 className="font-serif text-xl font-normal text-primary-text pb-2 border-b border-black/5">
            Add New Destination Address
          </h3>
          <Input label="Recipient Full Name" value={newFullName} onChange={(e) => setNewFullName(e.target.value)} required />
          <Input label="Street Address Line 1" value={newLine1} onChange={(e) => setNewLine1(e.target.value)} required />
          <div className="grid grid-cols-3 gap-4">
            <Input label="City" value={newCity} onChange={(e) => setNewCity(e.target.value)} required />
            <Input label="State" value={newState} onChange={(e) => setNewState(e.target.value)} required />
            <Input label="Zip Code" value={newZip} onChange={(e) => setNewZip(e.target.value)} required />
          </div>
          <Button type="submit" size="md">Save Address</Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((a) => (
          <div
            key={a.id}
            className={`p-6 border bg-white shadow-subtle flex flex-col justify-between ${
              a.isDefault ? 'border-black ring-1 ring-black' : 'border-black/10'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-sm text-primary-text">{a.fullName}</span>
                {a.isDefault && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-black text-white">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs text-secondary-text leading-relaxed">
                {a.line1}<br />
                {a.city}, {a.state} {a.zip}<br />
                {a.country}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-black/5 flex justify-between items-center text-xs">
              {!a.isDefault ? (
                <button
                  onClick={() => setDefault(a.id)}
                  className="underline text-secondary-text hover:text-black font-semibold"
                >
                  Set as default
                </button>
              ) : (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Selected default
                </span>
              )}
              <button
                onClick={() => removeAddress(a.id)}
                className="text-neutral-400 hover:text-sale p-1"
                aria-label="Delete address"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
