import { supabase, isSupabaseConfigured } from './supabase';
import { initialProducts, initialCategories, initialHeroSlides, initialSiteSettings, initialSEOSettings } from './initialData';
import { expandedProducts, expandedCategories } from './expandedProducts';
import { Product, Category, HeroSlide, SiteSettings, SEOSettings, Order, Review, Coupon } from '@/types';

// Merge initial products with the expanded 300+ product catalog
const allInitialProducts: Product[] = [...expandedProducts];
// Add any initialProducts whose slugs don't already exist
initialProducts.forEach(p => {
  if (!allInitialProducts.some(ep => ep.slug === p.slug || ep.id === p.id)) {
    allInitialProducts.push(p);
  }
});

const allCategories: Category[] = [...expandedCategories];
initialCategories.forEach(c => {
  if (!allCategories.some(ec => ec.slug === c.slug || ec.id === c.id)) {
    allCategories.push(c);
  }
});

// Client-side cache / local state store
let memoryProducts: Product[] = allInitialProducts;
let memoryCategories: Category[] = allCategories;
let memoryOrders: Order[] = [];
let memoryCoupons: Coupon[] = [
  {
    id: 'coup1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    min_order_amount: 50,
    usage_limit: 500,
    per_customer_limit: 1,
    times_used: 14,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'coup2',
    code: 'ARCHIVE50',
    type: 'fixed',
    value: 50,
    min_order_amount: 200,
    usage_limit: 50,
    per_customer_limit: 1,
    times_used: 8,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export async function getProducts(options?: {
  categorySlug?: string;
  subcategorySlug?: string;
  brand?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller';
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}): Promise<Product[]> {
  try {
    if (isSupabaseConfigured()) {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*),
          options:product_options(*, values:product_option_values(*)),
          variants:product_variants(*)
        `)
        .eq('status', 'active');

      if (options?.categorySlug) {
        const { data: cat } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', options.categorySlug)
          .single();
        if (cat) {
          query = query.eq('category_id', cat.id);
        }
      }

      if (options?.brand) {
        query = query.ilike('brand', options.brand);
      }

      if (options?.subcategorySlug) {
        query = query.ilike('subcategory', options.subcategorySlug.replace(/-/g, ' '));
      }

      if (options?.searchQuery) {
        query = query.ilike('title', `%${options.searchQuery}%`);
      }

      if (options?.minPrice !== undefined) {
        query = query.gte('price', options.minPrice);
      }
      if (options?.maxPrice !== undefined) {
        query = query.lte('price', options.maxPrice);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    }
  } catch (err) {
    console.warn('Fallback to local store data:', err);
  }

  // Fallback to local memory products
  let filtered = [...memoryProducts];

  if (options?.categorySlug) {
    filtered = filtered.filter((p) => p.category?.slug === options.categorySlug);
  }

  if (options?.subcategorySlug) {
    const subClean = options.subcategorySlug.toLowerCase().replace(/-/g, ' ');
    filtered = filtered.filter(
      (p) => p.subcategory && p.subcategory.toLowerCase().replace(/-/g, ' ') === subClean
    );
  }

  if (options?.brand) {
    const bClean = options.brand.toLowerCase();
    filtered = filtered.filter((p) => p.brand && p.brand.toLowerCase() === bClean);
  }

  if (options?.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (options?.minPrice !== undefined) {
    filtered = filtered.filter((p) => (p.sale_price || p.price) >= options.minPrice!);
  }

  if (options?.maxPrice !== undefined) {
    filtered = filtered.filter((p) => (p.sale_price || p.price) <= options.maxPrice!);
  }

  if (options?.inStockOnly) {
    filtered = filtered.filter((p) => p.stock_quantity > 0);
  }

  // Sorting
  if (options?.sortBy === 'price-asc') {
    filtered.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
  } else if (options?.sortBy === 'price-desc') {
    filtered.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
  } else if (options?.sortBy === 'rating') {
    filtered.sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0));
  } else if (options?.sortBy === 'bestseller') {
    filtered.sort((a, b) => (b.total_reviews || 0) - (a.total_reviews || 0));
  } else {
    // Newest default
    filtered.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  return filtered;
}

export async function getBrands(categorySlug?: string): Promise<string[]> {
  let products = memoryProducts;
  if (categorySlug) {
    products = products.filter((p) => p.category?.slug === categorySlug);
  }
  const set = new Set<string>();
  products.forEach((p) => {
    if (p.brand) set.add(p.brand);
  });
  return Array.from(set).sort();
}

export async function getSubcategories(categorySlug?: string): Promise<string[]> {
  let products = memoryProducts;
  if (categorySlug) {
    products = products.filter((p) => p.category?.slug === categorySlug);
  }
  const set = new Set<string>();
  products.forEach((p) => {
    if (p.subcategory) set.add(p.subcategory);
  });
  return Array.from(set).sort();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*),
          options:product_options(*, values:product_option_values(*)),
          variants:product_variants(*)
        `)
        .eq('slug', slug)
        .single();

      if (!error && data) return data as Product;
    }
  } catch (err) {
    console.warn('Fallback to local product lookup:', err);
  }

  const found = memoryProducts.find((p) => p.slug === slug);
  return found || null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Category[];
    }
  } catch (err) {
    console.warn('Fallback to local categories:', err);
  }
  return memoryCategories;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as HeroSlide[];
    }
  } catch (err) {
    console.warn('Fallback to local hero slides:', err);
  }
  return initialHeroSlides;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();
      if (!error && data) return data as SiteSettings;
    }
  } catch (err) {
    console.warn('Fallback to local site settings:', err);
  }
  return initialSiteSettings;
}

export async function getSEOSettings(): Promise<SEOSettings> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .limit(1)
        .single();
      if (!error && data) return data as SEOSettings;
    }
  } catch (err) {
    console.warn('Fallback to local seo settings:', err);
  }
  return initialSEOSettings;
}

export async function validateCoupon(code: string, currentSubtotal: number): Promise<{
  valid: boolean;
  coupon?: Coupon;
  message?: string;
}> {
  const normalized = code.trim().toUpperCase();
  const c = memoryCoupons.find((x) => x.code === normalized && x.is_active);

  if (!c) {
    return { valid: false, message: 'Invalid or expired promotional code' };
  }
  if (currentSubtotal < c.min_order_amount) {
    return {
      valid: false,
      message: `Minimum order amount of $${c.min_order_amount} required for this code`,
    };
  }
  return { valid: true, coupon: c };
}

// Memory order creation and retrieval
export async function createOrderRecord(orderData: Partial<Order>): Promise<Order> {
  const newOrder: Order = {
    id: `ord_${Date.now()}`,
    order_number: `ORD-${10000 + memoryOrders.length + 1}`,
    email: orderData.email || 'customer@example.com',
    shipping_address: orderData.shipping_address!,
    billing_address: orderData.billing_address || orderData.shipping_address,
    shipping_method: orderData.shipping_method || 'Standard Express',
    shipping_cost: orderData.shipping_cost || 0,
    subtotal: orderData.subtotal || 0,
    discount_amount: orderData.discount_amount || 0,
    tax_amount: orderData.tax_amount || 0,
    total: orderData.total || 0,
    coupon_code: orderData.coupon_code || null,
    payment_status: orderData.payment_status || 'paid',
    fulfillment_status: 'processing',
    razorpay_payment_id: orderData.razorpay_payment_id || `pay_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: orderData.items || [],
    timeline: [
      {
        id: `tl_${Date.now()}`,
        order_id: `ord_${Date.now()}`,
        status: 'placed',
        note: 'Order payment confirmed successfully via Razorpay checkout',
        created_at: new Date().toISOString(),
      },
    ],
  };

  memoryOrders.unshift(newOrder);

  // If in browser, store in localStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = JSON.parse(localStorage.getItem('lumen_orders') || '[]');
      stored.unshift(newOrder);
      localStorage.setItem('lumen_orders', JSON.stringify(stored));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  return newOrder;
}

export async function getOrders(): Promise<Order[]> {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('lumen_orders');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
  }
  return memoryOrders;
}

export async function createProductRecord(productData: Partial<Product>): Promise<Product> {
  const newProduct: Product = {
    id: productData.id || `prod_${Date.now()}`,
    title: productData.title || 'Untitled Product',
    slug: productData.slug || `product-${Date.now()}`,
    description: productData.description || '',
    category_id: productData.category_id || null,
    category: memoryCategories.find((c) => c.id === productData.category_id) || null,
    brand: productData.brand || 'Lumen Atelier',
    subcategory: productData.subcategory || 'General',
    price: productData.price || 0,
    sale_price: productData.sale_price || null,
    sku: productData.sku || `SKU-${Date.now().toString().slice(-4)}`,
    stock_quantity: productData.stock_quantity ?? 10,
    track_inventory: true,
    allow_backorders: false,
    status: productData.status || 'active',
    tags: productData.tags || [],
    images: productData.images || [],
    specifications: productData.specifications || {},
    is_vehicle: productData.is_vehicle || false,
    vehicle_specs: productData.vehicle_specs,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    avg_rating: 4.8,
    total_reviews: 1,
  };

  memoryProducts.unshift(newProduct);

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('products').insert([
        {
          id: newProduct.id,
          title: newProduct.title,
          slug: newProduct.slug,
          description: newProduct.description,
          category_id: newProduct.category_id,
          price: newProduct.price,
          sale_price: newProduct.sale_price,
          sku: newProduct.sku,
          stock_quantity: newProduct.stock_quantity,
          status: newProduct.status,
          tags: newProduct.tags,
        },
      ]);
    } catch (err) {
      console.warn('Supabase product insert warning:', err);
    }
  }

  return newProduct;
}

export async function updateProductRecord(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const idx = memoryProducts.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const current = memoryProducts[idx];
  const updated: Product = {
    ...current,
    ...updates,
    category: updates.category_id
      ? memoryCategories.find((c) => c.id === updates.category_id) || current.category
      : current.category,
    updated_at: new Date().toISOString(),
  };

  memoryProducts[idx] = updated;

  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from('products')
        .update({
          title: updated.title,
          slug: updated.slug,
          description: updated.description,
          category_id: updated.category_id,
          price: updated.price,
          sale_price: updated.sale_price,
          sku: updated.sku,
          stock_quantity: updated.stock_quantity,
          status: updated.status,
        })
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase product update warning:', err);
    }
  }

  return updated;
}

export async function deleteProductRecord(id: string): Promise<boolean> {
  const initialLen = memoryProducts.length;
  memoryProducts = memoryProducts.filter((p) => p.id !== id);

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase product delete warning:', err);
    }
  }

  return memoryProducts.length < initialLen;
}
