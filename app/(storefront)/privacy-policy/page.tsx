import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 lg:py-24 space-y-8 text-sm text-secondary-text leading-relaxed">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text block mb-2">
          Data Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
          Privacy Policy
        </h1>
      </div>

      <div className="space-y-4 pt-4 border-t border-black/10">
        <h2 className="font-serif text-xl text-primary-text font-normal">Discretion & Security</h2>
        <p>
          At Lumen Atelier, discretion is paramount. We gather only the minimal information strictly required to coordinate white-glove transport, process payments securely, and deliver dispatch notices.
        </p>
        <p>
          We will never monetize, lease, or distribute collector data to third-party advertising exchanges. All payment details are processed through encrypted, PCI-DSS compliant infrastructure.
        </p>
      </div>
    </div>
  );
}
