'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addToast('Please complete all required inquiry fields', 'error');
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      addToast('Your inquiry has been relayed to our private concierge team.', 'success');
    }, 500);
  };

  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-16 lg:py-24">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text block mb-2">
          Concierge & Client Care
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-primary-text mb-4">
          Direct Dialogue with the Atelier
        </h1>
        <p className="text-sm text-secondary-text">
          For custom commissions, trade inquiries, or archival consignment advice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
        {/* Contact Info (4 Cols) */}
        <div className="lg:col-span-4 bg-[#F5F5F0] border border-black/10 p-8 space-y-6">
          <h3 className="font-serif text-xl font-normal text-primary-text pb-3 border-b border-black/10">
            Global Headquarters
          </h3>

          <div className="space-y-4 text-xs text-secondary-text">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary-text mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-primary-text uppercase tracking-wider">SoHo Studio</p>
                <p>104 Greene Street, New York, NY 10012</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-primary-text mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-primary-text uppercase tracking-wider">Email Concierge</p>
                <p>concierge@lumenatelier.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-primary-text mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-primary-text uppercase tracking-wider">Direct Line</p>
                <p>+1 (800) 234-5678</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-black/[0.08] p-8 shadow-subtle">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <Input label="Subject / Consignment Reference" value={subject} onChange={(e) => setSubject(e.target.value)} />

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-secondary-text mb-2">
                Inquiry Manifest
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share dimensions, material requests, or private consultation timing..."
                required
                className="w-full p-4 bg-white border border-black/15 text-xs text-primary-text focus:outline-none focus:border-black rounded-none"
              />
            </div>

            <Button type="submit" size="lg" isLoading={isSending} className="w-full sm:w-auto">
              <span>Transmit Message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
