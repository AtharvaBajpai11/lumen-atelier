'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { Product } from '@/types';
import { getProducts } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lumen_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const res = await getProducts({ searchQuery: query.trim() });
      setResults(res.slice(0, 6));
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const saveRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem('lumen_recent_searches', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      saveRecentSearch(query);
      window.location.href = `/products/${results[selectedIndex].slug}`;
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-4xl mx-auto pt-16 px-6 sm:px-8 z-10"
          >
            <div className="bg-white shadow-2xl border border-black/10 overflow-hidden">
              {/* Search Bar Input */}
              <div className="flex items-center px-6 py-5 border-b border-black/10 gap-4">
                <Search className="w-6 h-6 text-neutral-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search living objects, linen overshirt, candle scents..."
                  className="w-full text-lg sm:text-xl font-light text-primary-text placeholder-neutral-400 focus:outline-none bg-transparent"
                />
                <button
                  onClick={onClose}
                  className="p-1 text-secondary-text hover:text-primary-text transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {query.trim() === '' ? (
                  <div>
                    {recentSearches.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xs uppercase tracking-widest text-secondary-text font-semibold mb-3 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Recent Inquiries</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => setQuery(term)}
                              className="px-3 py-1.5 bg-[#F5F5F0] hover:bg-neutral-200 text-xs text-primary-text tracking-wide transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-secondary-text font-semibold mb-3">
                        Suggested Curations
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Living Objects', 'Raw Linen', 'Botanical Scent', 'Tuscan Leather'].map(
                          (cat) => (
                            <button
                              key={cat}
                              onClick={() => setQuery(cat)}
                              className="p-3 bg-[#FAFAFA] border border-black/5 hover:border-black/20 text-left transition-colors"
                            >
                              <span className="text-xs font-medium text-primary-text">{cat}</span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : isLoading ? (
                  <div className="py-12 text-center text-xs uppercase tracking-widest text-secondary-text">
                    Searching atelier archives...
                  </div>
                ) : results.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="font-serif text-lg text-primary-text mb-1">
                      No curated items found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-xs text-secondary-text">
                      Try searching by material (travertine, linen, bronze, wool) or category.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs uppercase tracking-widest text-secondary-text font-medium">
                        Found {results.length} results
                      </span>
                      <Link
                        href={`/products?q=${encodeURIComponent(query)}`}
                        onClick={() => {
                          saveRecentSearch(query);
                          onClose();
                        }}
                        className="text-xs uppercase tracking-widest text-accent hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>View all results</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {results.map((product, idx) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={() => {
                            saveRecentSearch(query);
                            onClose();
                          }}
                          className={`flex items-center gap-3 p-3 border transition-colors ${
                            selectedIndex === idx
                              ? 'bg-neutral-50 border-black'
                              : 'bg-white border-black/5 hover:border-black/20'
                          }`}
                        >
                          <div className="relative w-14 h-16 shrink-0 bg-[#F5F5F0]">
                            <Image
                              src={
                                product.images?.[0]?.image_url ||
                                'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=400&q=80'
                              }
                              alt={product.title}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-serif text-sm text-primary-text truncate">
                              {product.title}
                            </h5>
                            <p className="text-xs text-secondary-text mt-0.5">
                              {formatCurrency(product.sale_price || product.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
