'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide } from '@/types';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[current] || slides[0];

  return (
    <section className="relative w-full h-[85vh] min-h-[580px] max-h-[900px] overflow-hidden bg-black">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id || current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={activeSlide.image_url}
            alt={activeSlide.heading}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.78]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />

      {/* Text Content */}
      <div className="relative z-10 max-w-site mx-auto h-full px-6 lg:px-16 flex flex-col justify-end pb-20 lg:pb-24">
        <div className="max-w-2xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`badge-${current}`}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block"
          >
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-200">
              Autumn / Winter Archival Series
            </span>
          </motion.div>

          {/* Animated Headline with Word-by-Word Stagger Reveal */}
          <motion.h1
            key={`heading-${current}`}
            className="font-serif text-4xl sm:text-5xl lg:text-7xl font-normal tracking-tight text-white mb-6 leading-[1.08]"
          >
            {activeSlide.heading.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {activeSlide.subheading && (
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-neutral-300 font-light mb-8 max-w-xl leading-relaxed"
            >
              {activeSlide.subheading}
            </motion.p>
          )}

          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <Link href={activeSlide.cta_link || '/products'}>
              <Button size="lg" className="bg-white text-black hover:bg-neutral-200 border-white">
                <span>{activeSlide.cta_text || 'Discover Collection'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Progress Bars & Carousel Indicators */}
      <div className="absolute bottom-6 right-6 lg:right-16 z-20 flex items-center gap-3">
        {slides.map((s, index) => (
          <button
            key={s.id || index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="relative h-1 w-12 bg-white/30 overflow-hidden cursor-pointer"
          >
            {current === index && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 6.5, ease: 'linear' }}
                className="absolute inset-0 bg-white"
              />
            )}
          </button>
        ))}

        <div className="flex gap-1 ml-3 text-white">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
