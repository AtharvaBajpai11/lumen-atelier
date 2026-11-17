import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 lg:py-24 space-y-8 text-sm text-secondary-text leading-relaxed">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text block mb-2">
          Consignment Protocol
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
          Archival Shipping Policy
        </h1>
      </div>

      <div className="space-y-4 pt-4 border-t border-black/10">
        <h2 className="font-serif text-xl text-primary-text font-normal">1. Complimentary Archival Transport</h2>
        <p>
          All domestic and international orders exceeding $150 qualify for complimentary, fully insured air consignment. Orders below this threshold incur a flat $15 delivery fee.
        </p>

        <h2 className="font-serif text-xl text-primary-text font-normal pt-4">2. Packaging Standards</h2>
        <p>
          Fragile stoneware, lighting, and glass objects are secured within impact-dampening foam cushions engineered specifically for fine art transport. All consignments are sealed with tamper-evident archival tape and require a physical recipient signature upon delivery.
        </p>

        <h2 className="font-serif text-xl text-primary-text font-normal pt-4">3. Estimated Timelines</h2>
        <p>
          Orders placed Monday through Friday before 2:00 PM EST are crated within 24 to 48 hours. Standard air delivery transit spans 3 to 5 business days globally.
        </p>
      </div>
    </div>
  );
}
