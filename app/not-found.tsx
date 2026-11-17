import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary-text mb-3">
        Error 404 — Archival Object Not Found
      </span>
      <h1 className="font-serif text-4xl sm:text-6xl text-primary-text font-normal mb-4">
        Displaced Sanctuary
      </h1>
      <p className="text-sm text-secondary-text max-w-md leading-relaxed mb-8">
        The piece, category, or archival dossier you are seeking has been reclassified or does not exist in our catalog.
      </p>
      <Link href="/products">
        <Button size="lg">Explore Active Collection</Button>
      </Link>
    </div>
  );
}
