import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 lg:py-24 space-y-8 text-sm text-secondary-text leading-relaxed">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text block mb-2">
          Legal Framework
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
          Terms of Service
        </h1>
      </div>

      <div className="space-y-4 pt-4 border-t border-black/10">
        <h2 className="font-serif text-xl text-primary-text font-normal">Authenticity & Intellectual Property</h2>
        <p>
          All designs, photography, text, and architectural concepts rendered on this platform are the exclusive intellectual property of Lumen Atelier. Reproduction or derivative manufacturing without express written authorization is prohibited.
        </p>

        <h2 className="font-serif text-xl text-primary-text font-normal pt-4">Artisanal Variations</h2>
        <p>
          Because our products are sculpted from genuine geologic stone, hand-blown glass, and natural vegetable-tanned leather, slight nuances in veining, porosity, and hue are the hallmarks of authentic craft and do not constitute manufacturing defects.
        </p>
      </div>
    </div>
  );
}
