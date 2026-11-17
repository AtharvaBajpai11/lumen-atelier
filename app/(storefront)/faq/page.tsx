'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What distinguishes Lumen Atelier stoneware and objects?',
      a: 'Each piece is individually sculpted from solid Tuscan travertine, Normandy linen, or unlacquered sand-cast bronze. We do not use faux composite resins or mass molding. Small natural cavity fissures and mineral veining are retained intentionally to highlight organic authenticity.',
    },
    {
      q: 'How does archival worldwide consignment shipping work?',
      a: 'We offer complimentary insured air shipping on orders exceeding $150. Heavyweight stones and lighting are packed in shock-absorbing foam crates specifically designed for fragile fine art transport. A signature is required upon delivery.',
    },
    {
      q: 'Can I request bespoke or trade dimensions for interior projects?',
      a: 'Yes. Our studio frequently collaborates with residential architects and interior design practices. Contact our concierge with project blueprints and required quantities for private quoting.',
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'Unused objects in their original archival containers and authentication packaging may be returned within 30 days of arrival. Return transit is organized through our prepaid portal.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text block mb-2">
          Knowledge Base
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-primary-text mb-4">
          Frequently Inquired Matters
        </h1>
      </div>

      <div className="divide-y divide-black/10 border-y border-black/10">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-5">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left cursor-pointer"
              >
                <h3 className="font-serif text-lg sm:text-xl text-primary-text font-normal pr-4">
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-secondary-text transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pt-3 text-xs sm:text-sm text-secondary-text leading-relaxed"
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
