'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/store';
import { Product } from '@/types';
import { ProductCard } from '@/components/storefront/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';

export default function AccountWishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchWishlist() {
      const all = await getProducts();
      // Show first 2 curated items for immediate wishlist demo
      setWishlistProducts(all.slice(0, 3));
    }
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-12 lg:py-20">
      <div className="mb-10 pb-6 border-b border-black/10">
        <Link
          href="/account"
          className="text-xs uppercase tracking-widest text-secondary-text hover:text-black flex items-center gap-1.5 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
          Wishlist Sanctuary ({wishlistProducts.length})
        </h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-black/10 p-10 max-w-md mx-auto">
          <Heart className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h2 className="font-serif text-2xl text-primary-text mb-2">No archived desires</h2>
          <p className="text-xs text-secondary-text mb-6">
            Click the heart icon on any design object across our catalog to preserve it here.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold inline-block"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
