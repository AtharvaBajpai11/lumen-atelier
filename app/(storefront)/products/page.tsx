'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/storefront/ProductCard';
import { QuickViewModal } from '@/components/storefront/QuickViewModal';
import { getProducts, getCategories, getBrands, getSubcategories } from '@/lib/store';
import { Product, Category } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { SlidersHorizontal, X, ChevronDown, Check, Loader2, Tag } from 'lucide-react';

function PLPContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // URL Params State
  const categoryParam = searchParams.get('category') || '';
  const subcategoryParam = searchParams.get('subcategory') || '';
  const brandParam = searchParams.get('brand') || '';
  const sortParam = (searchParams.get('sort') || 'newest') as any;
  const searchParam = searchParams.get('q') || '';
  const minPriceParam = Number(searchParams.get('minPrice')) || 0;
  const maxPriceParam = Number(searchParams.get('maxPrice')) || 0;
  const inStockOnly = searchParams.get('inStock') === 'true';

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const [allCats, allProds, brands, subs] = await Promise.all([
        getCategories(),
        getProducts({
          categorySlug: categoryParam || undefined,
          subcategorySlug: subcategoryParam || undefined,
          brand: brandParam || undefined,
          sortBy: sortParam,
          searchQuery: searchParam || undefined,
          minPrice: minPriceParam > 0 ? minPriceParam : undefined,
          maxPrice: maxPriceParam > 0 ? maxPriceParam : undefined,
          inStockOnly,
        }),
        getBrands(categoryParam || undefined),
        getSubcategories(categoryParam || undefined),
      ]);
      setCategories(allCats);
      setProducts(allProds);
      setAvailableBrands(brands);
      setAvailableSubcategories(subs);
      setIsLoading(false);
    }
    init();
  }, [categoryParam, subcategoryParam, brandParam, sortParam, searchParam, minPriceParam, maxPriceParam, inStockOnly]);

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '' || value === '0') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    // If category changes, remove subcategory and brand filters
    if (key === 'category') {
      params.delete('subcategory');
      params.delete('brand');
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/products');
  };

  const activeFilterChips = useMemo(() => {
    const chips: { label: string; key: string }[] = [];
    if (categoryParam) {
      const cat = categories.find((c) => c.slug === categoryParam);
      chips.push({ label: `Category: ${cat?.name || categoryParam}`, key: 'category' });
    }
    if (subcategoryParam) {
      chips.push({ label: `Subcategory: ${subcategoryParam}`, key: 'subcategory' });
    }
    if (brandParam) {
      chips.push({ label: `Brand: ${brandParam}`, key: 'brand' });
    }
    if (searchParam) {
      chips.push({ label: `Search: "${searchParam}"`, key: 'q' });
    }
    if (minPriceParam > 0 || maxPriceParam > 0) {
      chips.push({
        label: `Price: ${minPriceParam > 0 ? formatCurrency(minPriceParam) : '₹0'} – ${maxPriceParam > 0 ? formatCurrency(maxPriceParam) : 'Any'}`,
        key: 'price',
      });
    }
    if (inStockOnly) {
      chips.push({ label: 'In Stock Only', key: 'inStock' });
    }
    return chips;
  }, [categoryParam, subcategoryParam, brandParam, searchParam, minPriceParam, maxPriceParam, inStockOnly, categories]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 300);
  };

  const activeCategoryObj = categories.find((c) => c.slug === categoryParam);

  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-12 lg:py-20">
      {/* Page Title & Breadcrumbs */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text mb-2">
          {activeCategoryObj ? `Atelier Catalog / ${activeCategoryObj.name}` : 'Atelier Complete Catalog'}
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-primary-text mb-3">
          {activeCategoryObj ? activeCategoryObj.name : 'All Curated Objects'}
        </h1>
        <p className="text-sm text-secondary-text max-w-2xl leading-relaxed">
          {activeCategoryObj?.description ||
            'Explore over 300 precision-crafted electronic systems, tailored fashion, luxury automobiles, architectural furnishings, and lifestyle essentials.'}
        </p>
      </div>

      {/* Subcategory Pill Bar (When category has subcategories or subcategories available) */}
      {availableSubcategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => updateFilters('subcategory', null)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors rounded-none border ${
              !subcategoryParam
                ? 'bg-black text-white border-black'
                : 'bg-white text-secondary-text border-black/10 hover:border-black hover:text-black'
            }`}
          >
            All Subcategories
          </button>
          {availableSubcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => updateFilters('subcategory', subcategoryParam === sub ? null : sub)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors rounded-none border ${
                subcategoryParam === sub
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-secondary-text border-black/10 hover:border-black hover:text-black'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Control Bar: Filter Toggle (mobile), Count, Sort Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-black/10 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary-text bg-white border border-black/15 px-4 py-2.5 shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters ({products.length})</span>
          </button>
          <span className="text-xs uppercase tracking-widest text-secondary-text font-medium">
            Showing {Math.min(visibleCount, products.length)} of {products.length} Products
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-secondary-text font-semibold hidden sm:inline">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortParam}
              onChange={(e) => updateFilters('sort', e.target.value)}
              className="appearance-none bg-white border border-black/15 text-xs uppercase tracking-wider text-primary-text font-medium px-4 py-2.5 pr-8 focus:outline-none focus:border-black cursor-pointer shadow-sm rounded-none"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="bestseller">Best Selling</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      <AnimatePresence>
        {activeFilterChips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            <span className="text-xs uppercase tracking-widest text-secondary-text font-semibold mr-1">
              Active Filters:
            </span>
            {activeFilterChips.map((chip) => (
              <motion.button
                key={chip.key}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => {
                  if (chip.key === 'price') {
                    updateFilters('minPrice', null);
                    updateFilters('maxPrice', null);
                  } else {
                    updateFilters(chip.key, null);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-black/15 text-xs text-primary-text uppercase tracking-wider shadow-sm hover:border-black transition-colors cursor-pointer"
              >
                <span>{chip.label}</span>
                <X className="w-3 h-3 text-secondary-text hover:text-sale" />
              </motion.button>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs underline uppercase tracking-wider text-secondary-text hover:text-black ml-2"
            >
              Reset All
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 sticky top-28 bg-[#FAFAFA] p-6 border border-black/[0.06] max-h-[85vh] overflow-y-auto">
          {/* Categories Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] font-bold text-primary-text mb-4 pb-2 border-b border-black/10">
              Department
            </h3>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider">
              <li>
                <button
                  onClick={() => updateFilters('category', null)}
                  className={`w-full text-left transition-colors flex items-center justify-between ${
                    !categoryParam ? 'font-bold text-primary-text' : 'text-secondary-text hover:text-primary-text'
                  }`}
                >
                  <span>All Curations</span>
                  {!categoryParam && <Check className="w-3.5 h-3.5 text-accent" />}
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => updateFilters('category', cat.slug)}
                    className={`w-full text-left transition-colors flex items-center justify-between ${
                      categoryParam === cat.slug
                        ? 'font-bold text-primary-text'
                        : 'text-secondary-text hover:text-primary-text'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {categoryParam === cat.slug && <Check className="w-3.5 h-3.5 text-accent" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Subcategory Filter (if category selected) */}
          {availableSubcategories.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] font-bold text-primary-text mb-3 pb-2 border-b border-black/10">
                Subcategory
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {availableSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => updateFilters('subcategory', subcategoryParam === sub ? null : sub)}
                    className={`w-full text-left text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                      subcategoryParam === sub ? 'font-bold text-primary-text' : 'text-secondary-text hover:text-primary-text'
                    }`}
                  >
                    <span className="truncate">{sub}</span>
                    {subcategoryParam === sub && <Check className="w-3 h-3 text-accent" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brands Filter */}
          {availableBrands.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] font-bold text-primary-text mb-3 pb-2 border-b border-black/10">
                Brands & Ateliers
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {availableBrands.slice(0, 15).map((brand) => (
                  <button
                    key={brand}
                    onClick={() => updateFilters('brand', brandParam === brand ? null : brand)}
                    className={`w-full text-left text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                      brandParam === brand ? 'font-bold text-primary-text' : 'text-secondary-text hover:text-primary-text'
                    }`}
                  >
                    <span className="truncate">{brand}</span>
                    {brandParam === brand && <Check className="w-3 h-3 text-accent" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] font-bold text-primary-text mb-3 pb-2 border-b border-black/10">
              Price Range
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => {
                  updateFilters('minPrice', null);
                  updateFilters('maxPrice', null);
                }}
                className={`w-full text-left py-1 ${!minPriceParam && !maxPriceParam ? 'font-bold text-black' : 'text-secondary-text hover:text-black'}`}
              >
                All Prices
              </button>
              <button
                onClick={() => {
                  updateFilters('minPrice', null);
                  updateFilters('maxPrice', '5000');
                }}
                className={`w-full text-left py-1 ${maxPriceParam === 5000 ? 'font-bold text-black' : 'text-secondary-text hover:text-black'}`}
              >
                Under ₹5,000
              </button>
              <button
                onClick={() => {
                  updateFilters('minPrice', '5000');
                  updateFilters('maxPrice', '25000');
                }}
                className={`w-full text-left py-1 ${minPriceParam === 5000 && maxPriceParam === 25000 ? 'font-bold text-black' : 'text-secondary-text hover:text-black'}`}
              >
                ₹5,000 – ₹25,000
              </button>
              <button
                onClick={() => {
                  updateFilters('minPrice', '25000');
                  updateFilters('maxPrice', '100000');
                }}
                className={`w-full text-left py-1 ${minPriceParam === 25000 && maxPriceParam === 100000 ? 'font-bold text-black' : 'text-secondary-text hover:text-black'}`}
              >
                ₹25,000 – ₹1,00,000
              </button>
              <button
                onClick={() => {
                  updateFilters('minPrice', '100000');
                  updateFilters('maxPrice', null);
                }}
                className={`w-full text-left py-1 ${minPriceParam === 100000 ? 'font-bold text-black' : 'text-secondary-text hover:text-black'}`}
              >
                ₹1,00,000 & Above
              </button>
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] font-bold text-primary-text mb-4 pb-2 border-b border-black/10">
              Availability
            </h3>
            <label className="flex items-center gap-2.5 text-xs uppercase tracking-wider text-primary-text cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => updateFilters('inStock', e.target.checked ? 'true' : null)}
                className="accent-black w-4 h-4 rounded-none cursor-pointer"
              />
              <span>In-Stock Objects Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area (spans 3 columns on desktop) */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-neutral-200/60 animate-pulse border border-black/5" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center bg-white border border-black/5 p-12">
              <h3 className="font-serif text-2xl text-primary-text mb-2">No items match your curation</h3>
              <p className="text-sm text-secondary-text max-w-sm mx-auto mb-6">
                Adjust your active filters or clear search to discover our complete catalog of {categories.length} departments.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, visibleCount).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < products.length && (
                <div className="mt-14 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="px-8 py-3.5 bg-white border border-black text-primary-text hover:bg-black hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoadingMore && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Load More Objects ({products.length - visibleCount} remaining)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Bottom Sheet Filters */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 bg-white max-h-[85vh] flex flex-col rounded-t-2xl shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
                <span className="font-serif text-xl font-normal">Filter Curations</span>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-secondary-text" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-widest font-bold mb-3">Department</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateFilters('category', null)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider border ${
                      !categoryParam ? 'bg-black text-white border-black' : 'bg-white text-black border-black/15'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => updateFilters('category', c.slug)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider border ${
                        categoryParam === c.slug ? 'bg-black text-white border-black' : 'bg-white text-black border-black/15'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              {availableSubcategories.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-widest font-bold mb-3">Subcategory</h4>
                  <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
                    {availableSubcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => updateFilters('subcategory', subcategoryParam === sub ? null : sub)}
                        className={`px-3 py-1 text-xs uppercase tracking-wider border ${
                          subcategoryParam === sub ? 'bg-black text-white border-black' : 'bg-white text-black border-black/15'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands */}
              {availableBrands.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-widest font-bold mb-3">Brands</h4>
                  <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
                    {availableBrands.slice(0, 15).map((brand) => (
                      <button
                        key={brand}
                        onClick={() => updateFilters('brand', brandParam === brand ? null : brand)}
                        className={`px-3 py-1 text-xs uppercase tracking-wider border ${
                          brandParam === brand ? 'bg-black text-white border-black' : 'bg-white text-black border-black/15'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold mt-auto"
              >
                Apply Filters ({products.length} Items)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs uppercase tracking-widest">Loading Catalog...</div>}>
      <PLPContent />
    </Suspense>
  );
}
