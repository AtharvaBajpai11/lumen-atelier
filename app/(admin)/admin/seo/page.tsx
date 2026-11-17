'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { Save, Search, Check } from 'lucide-react';

export default function AdminSEOPage() {
  const { addToast } = useToast();

  const [metaTitleTemplate, setMetaTitleTemplate] = useState('{Page Title} | LUMEN ATELIER');
  const [defaultDescription, setDefaultDescription] = useState(
    'Discover architectural home essentials, handcrafted apparel, and sensory design objects designed for refined modern living.'
  );
  const [ogImageUrl, setOgImageUrl] = useState(
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
  );
  const [gaId, setGaId] = useState('G-LUMEN8899');
  const [fbPixelId, setFbPixelId] = useState('');
  const [robotsTxt, setRobotsTxt] = useState(
    'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /checkout\nDisallow: /account\nSitemap: https://lumenatelier.com/sitemap.xml'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Global SEO parameters and sitemap definitions saved', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-black/10">
        <h1 className="font-serif text-3xl font-normal text-primary-text">
          Search Engine Optimization & Indexing
        </h1>
        <p className="text-xs text-secondary-text mt-1">
          Configure structured data templates, social graph sharing images, and analytics tags.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary-text pb-2 border-b border-black/10">
            Global Metadata Templates
          </h2>
          <Input
            label="Meta Title Template"
            value={metaTitleTemplate}
            onChange={(e) => setMetaTitleTemplate(e.target.value)}
            required
          />
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-secondary-text mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={defaultDescription}
              onChange={(e) => setDefaultDescription(e.target.value)}
              className="w-full p-3 bg-white border border-black/15 text-xs text-primary-text focus:outline-none focus:border-black rounded-none"
            />
          </div>
          <Input
            label="Default Open Graph (OG) Social Image"
            value={ogImageUrl}
            onChange={(e) => setOgImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="bg-white border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary-text pb-2 border-b border-black/10">
            Analytics & Conversion Pixels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Google Analytics 4 Measurement ID"
              value={gaId}
              onChange={(e) => setGaId(e.target.value)}
              placeholder="G-XXXXXXXXXX"
            />
            <Input
              label="Meta / Facebook Pixel ID"
              value={fbPixelId}
              onChange={(e) => setFbPixelId(e.target.value)}
              placeholder="e.g. 1234567890"
            />
          </div>
        </div>

        <div className="bg-white border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary-text pb-2 border-b border-black/10">
            Robots.txt Directive
          </h2>
          <textarea
            rows={5}
            value={robotsTxt}
            onChange={(e) => setRobotsTxt(e.target.value)}
            className="w-full p-3 font-mono text-xs bg-white border border-black/15 text-primary-text focus:outline-none focus:border-black rounded-none"
          />
        </div>

        <Button type="submit" size="lg">
          <Save className="w-4 h-4 mr-1" />
          <span>Save SEO Protocols</span>
        </Button>
      </form>
    </div>
  );
}
