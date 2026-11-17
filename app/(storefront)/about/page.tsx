import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text block mb-3">
          Our Architectural Ethos
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-primary-text font-normal leading-tight mb-6">
          Objects for Deliberate, Quiet Living
        </h1>
        <p className="text-base text-secondary-text leading-relaxed font-light">
          Founded in Copenhagen in 2021, Lumen Atelier began with a solitary realization: that the objects with which we furnish our private environments directly sculpt our interior peace.
        </p>
      </div>

      <div className="relative aspect-[16/9] w-full max-w-4xl mx-auto mb-20 overflow-hidden bg-neutral-100 border border-black/5">
        <Image
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1800&q=85"
          alt="Studio Workshop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-12 text-sm text-secondary-text leading-relaxed">
        <div>
          <h2 className="font-serif text-2xl text-primary-text font-normal mb-3">
            Honoring Provenance & Geological Time
          </h2>
          <p>
            We collaborate exclusively with heritage quarries and multigenerational weaving studios across Tuscany, Normandy, and Kyoto. We intentionally preserve the naturally weathered fissures, cavity openings, and raw mineral textures rather than polishing away the earth&apos;s history.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-primary-text font-normal mb-3">
            Slow Small-Batch Releases
          </h2>
          <p>
            Rather than producing disposable seasonal inventory, our studio operates in limited archival drops. Once a quarry block is carved or a vintage flax harvest is woven, that specific run is sealed and archived forever.
          </p>
        </div>
      </div>
    </div>
  );
}
