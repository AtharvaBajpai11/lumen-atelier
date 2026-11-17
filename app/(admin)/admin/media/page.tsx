'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Upload, Copy, Trash2, Check, Image as ImageIcon } from 'lucide-react';

interface MediaAsset {
  id: string;
  url: string;
  filename: string;
  size: string;
}

export default function AdminMediaPage() {
  const { addToast } = useToast();

  const [assets, setAssets] = useState<MediaAsset[]>([
    {
      id: 'm1',
      url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
      filename: 'brutalist-travertine-vessel.jpg',
      size: '1.4 MB',
    },
    {
      id: 'm2',
      url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      filename: 'bronze-incense-cradle.jpg',
      size: '890 KB',
    },
    {
      id: 'm3',
      url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      filename: 'normandy-linen-overshirt.jpg',
      size: '2.1 MB',
    },
    {
      id: 'm4',
      url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      filename: 'tuscan-leather-folio.jpg',
      size: '1.8 MB',
    },
    {
      id: 'm5',
      url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      filename: 'hinoki-amber-candle.jpg',
      size: '1.1 MB',
    },
    {
      id: 'm6',
      url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
      filename: 'merino-wool-beanie.jpg',
      size: '950 KB',
    },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    addToast('Public CDN URL copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteAsset = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id));
    addToast('Media asset removed from Supabase storage bucket', 'info');
  };

  const handleSimulateUpload = () => {
    const newAsset: MediaAsset = {
      id: `m_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      filename: `archival-study-${Date.now().toString().slice(-4)}.jpg`,
      size: '1.2 MB',
    };
    setAssets([newAsset, ...assets]);
    addToast('Asset uploaded to "media-library" storage bucket', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h1 className="font-serif text-3xl font-normal text-primary-text">
            Supabase Storage & Media Library
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Global repository for product photography, editorial assets, and lookbooks.
          </p>
        </div>

        <Button onClick={handleSimulateUpload} size="md">
          <Upload className="w-4 h-4 mr-1.5" />
          <span>Upload Asset</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="group relative bg-white border border-black/[0.08] shadow-subtle overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full bg-[#F5F5F0]">
              <Image
                src={asset.url}
                alt={asset.filename}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            <div className="p-3 bg-white border-t border-black/5 flex justify-between items-center text-xs">
              <div className="min-w-0 pr-2">
                <p className="font-mono text-[11px] text-primary-text truncate">{asset.filename}</p>
                <p className="text-[10px] text-secondary-text">{asset.size}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => copyUrl(asset.url, asset.id)}
                  className="p-1.5 text-secondary-text hover:text-black transition-colors"
                  title="Copy public URL"
                >
                  {copiedId === asset.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => deleteAsset(asset.id)}
                  className="p-1.5 text-neutral-400 hover:text-sale transition-colors"
                  title="Delete asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
