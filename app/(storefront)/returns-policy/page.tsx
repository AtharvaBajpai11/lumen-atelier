import React from 'react';

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 lg:py-24 space-y-8 text-sm text-secondary-text leading-relaxed">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text block mb-2">
          Client Guarantee
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
          Returns & Exchange Policy
        </h1>
      </div>

      <div className="space-y-4 pt-4 border-t border-black/10">
        <h2 className="font-serif text-xl text-primary-text font-normal">30-Day Solitary Return Window</h2>
        <p>
          We provide 30 calendar days from the date of consignment delivery to evaluate your acquisitions in your living space. If a piece does not resonate in scale, weight, or light harmony, initiate a return via our concierge portal.
        </p>
        <p>
          Returned objects must be unmarred and repacked in their original custom-molded protective foam. Refunds are issued to the original method of payment within 3 business days of receipt at our studio.
        </p>
      </div>
    </div>
  );
}
