'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import { ProductCard } from '@/components/storefront/ProductCard';
import { QuickViewModal } from '@/components/storefront/QuickViewModal';
import { Button } from '@/components/ui/Button';
import { getProducts, getCategories, getHeroSlides } from '@/lib/store';
import { Product, Category, HeroSlide } from '@/types';
import { ArrowRight, Sparkles, Shield, RefreshCw, Truck, Clock } from 'lucide-react';

export default function HomePage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 48 });

  useEffect(() => {
    async function loadData() {
      const [s, c, pNew, pBest] = await Promise.all([
        getHeroSlides(),
        getCategories(),
        getProducts({ sortBy: 'newest' }),
        getProducts({ sortBy: 'bestseller' }),
      ]);
      setSlides(s);
      setCategories(c);
      setNewArrivals(pNew.slice(0, 4));
      setBestSellers(pBest.slice(0, 4));
    }
    loadData();

    // Countdown timer for promo banner
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#FAFAFA] overflow-hidden">
      {/* 1. Hero Carousel */}
      {slides.length > 0 && <HeroCarousel slides={slides} />}

      {/* 2. Featured Categories Section */}
      <section className="py-20 lg:py-28 max-w-site mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text mb-2">
              Curated Mediums
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
              Explore by Materiality
            </h2>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.15em] font-semibold text-primary-text hover:text-accent transition-colors flex items-center gap-1 group"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((cat, idx) => (
            <motion.div
              key={cat.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-[#F5F5F0] border border-black/5 shadow-subtle"
              >
                {cat.image_url && (
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-serif text-2xl font-normal mb-1">{cat.name}</h3>
                  <p className="text-xs text-neutral-300 font-light line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals Section (4-column grid) */}
      <section className="py-20 lg:py-28 bg-[#F5F5F0] border-y border-black/5">
        <div className="max-w-site mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Just Landed in the Atelier</span>
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/products?sort=newest"
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.15em] font-semibold text-primary-text hover:text-accent transition-colors flex items-center gap-1 group"
            >
              <span>Explore New Releases</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Promotional Banner with Live Countdown Timer */}
      <section className="py-20 bg-gradient-to-r from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] text-white">
        <div className="max-w-site mx-auto px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
              Archival Solstice Event
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
              Enjoy 10% Off Archival Collections
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Apply code <span className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 border border-white/20">WELCOME10</span> at checkout. Complimentary worldwide archival transport on orders above $150.
            </p>

            {/* Countdown Timer Display */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="bg-white/5 border border-white/15 px-4 py-3 min-w-[70px]">
                <span className="block font-mono text-2xl font-bold text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">Hours</span>
              </div>
              <span className="text-xl text-neutral-500 font-bold">:</span>
              <div className="bg-white/5 border border-white/15 px-4 py-3 min-w-[70px]">
                <span className="block font-mono text-2xl font-bold text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">Mins</span>
              </div>
              <span className="text-xl text-neutral-500 font-bold">:</span>
              <div className="bg-white/5 border border-white/15 px-4 py-3 min-w-[70px]">
                <span className="block font-mono text-2xl font-bold text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">Secs</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-black hover:bg-neutral-200">
                  Shop Curated Pieces
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="py-20 lg:py-28 max-w-site mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text mb-2">
              Permanent Signatures
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
              Collector Favorites
            </h2>
          </div>
          <Link
            href="/products?sort=bestseller"
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.15em] font-semibold text-primary-text hover:text-accent transition-colors flex items-center gap-1 group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <ProductCard product={product} onQuickView={setQuickViewProduct} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Infinite Horizontal Scroll Trust Badges */}
      <section className="py-12 bg-white border-y border-black/5 overflow-hidden">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {[
            { icon: Truck, title: 'Archival Global Shipping', sub: 'Complimentary over $150' },
            { icon: Shield, title: 'Authenticity Guarantee', sub: 'Individually serialized craft' },
            { icon: RefreshCw, title: '30-Day Solitary Returns', sub: 'Frictionless return portal' },
            { icon: Clock, title: 'Lifetime Structural Care', sub: 'Refurbishment services' },
            { icon: Truck, title: 'Archival Global Shipping', sub: 'Complimentary over $150' },
            { icon: Shield, title: 'Authenticity Guarantee', sub: 'Individually serialized craft' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <badge.icon className="w-5 h-5 text-neutral-800 stroke-[1.5]" />
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-primary-text">
                  {badge.title}
                </p>
                <p className="text-[11px] text-secondary-text">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Instagram / Editorial Visual Grid */}
      <section className="py-20 max-w-site mx-auto px-6 lg:px-16">
        <div className="text-center max-w-md mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text mb-2">
            @lumenatelier
          </p>
          <h2 className="font-serif text-3xl text-primary-text font-normal">
            Objects in Spatial Harmony
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
          ].map((url, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden bg-neutral-100 group border border-black/5"
            >
              <Image
                src={url}
                alt="Editorial vignette"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs uppercase tracking-widest font-medium border border-white/50 px-3 py-1.5 backdrop-blur-sm">
                  View Study
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
