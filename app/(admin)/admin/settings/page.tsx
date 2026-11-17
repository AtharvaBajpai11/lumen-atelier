'use client';

import React, { useState, useEffect } from 'react';
import { getSiteSettings, getHeroSlides } from '@/lib/store';
import { SiteSettings, HeroSlide } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { Sliders, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminSettingsPage() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [slides, setSlides] = useState<HeroSlide[]>([]);

  // Settings form state
  const [siteName, setSiteName] = useState('LUMEN ATELIER');
  const [tagline, setTagline] = useState('Curated Minimalist Living & Objects');
  const [contactEmail, setContactEmail] = useState('concierge@lumenatelier.com');
  const [contactPhone, setContactPhone] = useState('+1 (800) 234-5678');
  const [businessAddress, setBusinessAddress] = useState('104 Greene Street, SoHo, New York, NY 10012');
  const [announcementActive, setAnnouncementActive] = useState(true);
  const [announcementText, setAnnouncementText] = useState('COMPLIMENTARY ARCHIVAL WORLDWIDE DELIVERY ON ORDERS OVER $150');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [taxRate, setTaxRate] = useState('8.25');

  useEffect(() => {
    async function load() {
      const [s, h] = await Promise.all([getSiteSettings(), getHeroSlides()]);
      setSettings(s);
      setSlides(h);
      if (s) {
        setSiteName(s.site_name);
        setTagline(s.tagline);
        setContactEmail(s.contact_email);
        setContactPhone(s.contact_phone);
        setBusinessAddress(s.business_address);
        setAnnouncementActive(s.announcement_bar_active);
        setAnnouncementText(s.announcement_bar_text);
        setCurrencySymbol(s.currency_symbol);
        setTaxRate(s.tax_rate.toString());
      }
    }
    load();
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Atelier brand settings preserved successfully', 'success');
  };

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: `h_${Date.now()}`,
      image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=85',
      heading: 'SCULPTURAL PURITY IN TUSCAN STONE',
      subheading: 'Chiseled monoliths bringing grounded presence to contemporary studies.',
      cta_text: 'Explore Works',
      cta_link: '/products',
      sort_order: slides.length + 1,
      is_active: true,
    };
    setSlides([...slides, newSlide]);
    addToast('Added hero slide to carousel', 'success');
  };

  const removeSlide = (id: string) => {
    setSlides(slides.filter((s) => s.id !== id));
    addToast('Removed hero slide', 'info');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-black/10">
        <h1 className="font-serif text-3xl font-normal text-primary-text">
          Brand Identity & Storefront Control
        </h1>
        <p className="text-xs text-secondary-text mt-1">
          Customize typography headers, contact coordinates, taxes, and hero slide banners.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* Brand & Identity */}
        <div className="bg-white border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary-text pb-2 border-b border-black/10">
            Brand Identification
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} required />
            <Input label="Tagline / Subtext" value={tagline} onChange={(e) => setTagline(e.target.value)} required />
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="bg-white border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary-text pb-2 border-b border-black/10">
            Header Announcement Strip
          </h2>
          <label className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={announcementActive}
              onChange={(e) => setAnnouncementActive(e.target.checked)}
              className="accent-black w-4 h-4"
            />
            <span>Broadcast Announcement Strip Active</span>
          </label>
          <Input
            label="Announcement Text"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
          />
        </div>

        {/* Contact Coordinates */}
        <div className="bg-white border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary-text pb-2 border-b border-black/10">
            Concierge & Studio Coordinates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Concierge Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
            <Input label="Concierge Telephone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />
          </div>
          <Input label="Physical Studio Address" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} required />
        </div>

        {/* Financials & Tax */}
        <div className="bg-white border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-4">
          <h2 className="font-serif text-xl font-normal text-primary-text pb-2 border-b border-black/10">
            Currency & Tax Parameters
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Currency Symbol" value={currencySymbol} onChange={(e) => setCurrencySymbol(e.target.value)} required />
            <Input label="Default Tax Rate (%)" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} required />
          </div>
        </div>

        <Button type="submit" size="lg">
          <Save className="w-4 h-4 mr-1" />
          <span>Save Global Atelier Settings</span>
        </Button>
      </form>

      {/* Hero Slides Management */}
      <div className="bg-white border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-black/10">
          <div>
            <h2 className="font-serif text-xl font-normal text-primary-text">
              Homepage Hero Slides Carousel
            </h2>
            <p className="text-xs text-secondary-text">Configure editorial carousel slides</p>
          </div>
          <Button onClick={addSlide} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            <span>Add Slide</span>
          </Button>
        </div>

        <div className="space-y-4">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="p-4 border border-black/10 bg-[#FAFAFA] flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-28 h-20 bg-neutral-200 shrink-0 border border-black/5 overflow-hidden">
                <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-base text-primary-text font-normal truncate">
                  {slide.heading}
                </h4>
                <p className="text-xs text-secondary-text line-clamp-1">{slide.subheading}</p>
                <p className="text-[11px] font-mono text-neutral-400 mt-1">CTA: {slide.cta_text} → {slide.cta_link}</p>
              </div>
              <button
                onClick={() => removeSlide(slide.id)}
                className="text-neutral-400 hover:text-sale p-2"
                title="Remove slide"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
