-- ====================================================================
-- SUPABASE COMPLETE E-COMMERCE DATABASE SCHEMA & SEED DATA
-- Production-ready migration script with RLS, triggers, and storage
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('draft', 'active');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE fulfillment_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE coupon_type AS ENUM ('percentage', 'fixed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABLES DEFINITION

-- 1. Profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'customer',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name TEXT DEFAULT 'LUMEN ATELIER',
    tagline TEXT DEFAULT 'Curated Minimalist Living & Objects',
    logo_url TEXT,
    logo_inverted_url TEXT,
    favicon_url TEXT,
    contact_email TEXT DEFAULT 'concierge@lumenatelier.com',
    contact_phone TEXT DEFAULT '+1 (800) 234-5678',
    business_address TEXT DEFAULT '104 Greene Street, SoHo, New York, NY 10012',
    currency_code TEXT DEFAULT 'USD',
    currency_symbol TEXT DEFAULT '$',
    tax_rate NUMERIC DEFAULT 8.25,
    tax_inclusive BOOLEAN DEFAULT false,
    announcement_bar_active BOOLEAN DEFAULT true,
    announcement_bar_text TEXT DEFAULT 'COMPLIMENTARY WORLDWIDE ARCHIVAL SHIPPING ON ORDERS OVER $150',
    announcement_bar_link TEXT DEFAULT '/products',
    announcement_bar_color TEXT DEFAULT '#1A1A1A',
    social_instagram TEXT DEFAULT 'https://instagram.com',
    social_facebook TEXT DEFAULT 'https://facebook.com',
    social_twitter TEXT DEFAULT 'https://twitter.com',
    social_tiktok TEXT DEFAULT 'https://tiktok.com',
    social_youtube TEXT DEFAULT 'https://youtube.com',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SEO Settings
CREATE TABLE IF NOT EXISTS seo_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meta_title_template TEXT DEFAULT '{Page Title} | LUMEN ATELIER',
    default_meta_description TEXT DEFAULT 'Discover architectural home essentials, handcrafted apparel, and sensory design objects designed for refined modern living.',
    og_default_image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    ga_tracking_id TEXT,
    fb_pixel_id TEXT,
    search_console_meta TEXT,
    robots_txt TEXT DEFAULT 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /checkout\nDisallow: /account\nSitemap: https://lumenatelier.com/sitemap.xml',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Page SEO
CREATE TABLE IF NOT EXISTS page_seo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_slug TEXT UNIQUE NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    og_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Categories
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Products
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    price NUMERIC(10, 2) NOT NULL,
    sale_price NUMERIC(10, 2),
    sale_start TIMESTAMPTZ,
    sale_end TIMESTAMPTZ,
    sku TEXT UNIQUE NOT NULL,
    stock_quantity INT DEFAULT 0,
    track_inventory BOOLEAN DEFAULT true,
    allow_backorders BOOLEAN DEFAULT false,
    status product_status DEFAULT 'active',
    meta_title TEXT,
    meta_description TEXT,
    og_image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Product Images
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    alt_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Product Options
CREATE TABLE IF NOT EXISTS product_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. "Size", "Color"
    sort_order INT DEFAULT 0
);

-- 9. Product Option Values
CREATE TABLE IF NOT EXISTS product_option_values (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    option_id UUID NOT NULL REFERENCES product_options(id) ON DELETE CASCADE,
    value TEXT NOT NULL, -- e.g. "XL", "Midnight Ash"
    sort_order INT DEFAULT 0
);

-- 10. Product Variants
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku TEXT NOT NULL,
    price NUMERIC(10, 2),
    stock_quantity INT DEFAULT 0,
    option_values JSONB DEFAULT '[]'::jsonb, -- e.g. [{"name":"Size","value":"M"},{"name":"Color","value":"Obsidian"}]
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Addresses
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'US',
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sequence for human-readable order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START WITH 10001;

-- 12. Orders
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL DEFAULT ('ORD-' || nextval('order_number_seq')),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    shipping_method TEXT DEFAULT 'Standard Express',
    shipping_cost NUMERIC(10, 2) DEFAULT 0,
    subtotal NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0,
    tax_amount NUMERIC(10, 2) DEFAULT 0,
    total NUMERIC(10, 2) NOT NULL,
    coupon_code TEXT,
    payment_status payment_status DEFAULT 'pending',
    fulfillment_status fulfillment_status DEFAULT 'pending',
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    tracking_number TEXT,
    tracking_carrier TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    variant_info JSONB,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL,
    line_total NUMERIC(10, 2) NOT NULL
);

-- 14. Order Timeline
CREATE TABLE IF NOT EXISTS order_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    note TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    body TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    author_name TEXT DEFAULT 'Verified Collector',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Coupons
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    type coupon_type NOT NULL DEFAULT 'percentage',
    value NUMERIC(10, 2) NOT NULL,
    min_order_amount NUMERIC(10, 2) DEFAULT 0,
    usage_limit INT DEFAULT 100,
    per_customer_limit INT DEFAULT 1,
    times_used INT DEFAULT 0,
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_to TIMESTAMPTZ,
    applicable_products UUID[] DEFAULT '{}',
    applicable_categories UUID[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Hero Slides
CREATE TABLE IF NOT EXISTS hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    heading TEXT NOT NULL,
    subheading TEXT,
    cta_text TEXT DEFAULT 'Discover Collection',
    cta_link TEXT DEFAULT '/products',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- 19. Wishlist
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

-- 20. Media Library
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    filename TEXT NOT NULL,
    size INT,
    mime_type TEXT,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 4. TRIGGERS & FUNCTIONS
-- ====================================================================

-- Trigger to update updated_at automatically
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE OR REPLACE TRIGGER trg_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE OR REPLACE TRIGGER trg_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE OR REPLACE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE OR REPLACE TRIGGER trg_seo_settings_updated_at BEFORE UPDATE ON seo_settings FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger to create profile when auth.user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
        'customer'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to decrement inventory and increment coupon usage on order insert
CREATE OR REPLACE FUNCTION public.handle_order_creation()
RETURNS TRIGGER AS $$
DECLARE
    item RECORD;
BEGIN
    -- Log initial order timeline event
    INSERT INTO public.order_timeline (order_id, status, note)
    VALUES (NEW.id, 'placed', 'Order initialized via checkout payment flow');

    -- Decrement coupon usage if coupon_code provided
    IF NEW.coupon_code IS NOT NULL AND NEW.coupon_code != '' THEN
        UPDATE public.coupons
        SET times_used = times_used + 1
        WHERE code = NEW.coupon_code;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_order_created
    AFTER INSERT ON orders
    FOR EACH ROW EXECUTE FUNCTION public.handle_order_creation();

-- ====================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_option_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can view & update their own, Admins can view all
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Admins can insert profiles" ON profiles FOR INSERT WITH CHECK (public.is_admin() OR auth.uid() = id);

-- Public Read tables
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage site_settings" ON site_settings FOR ALL USING (public.is_admin());

CREATE POLICY "Public read seo_settings" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage seo_settings" ON seo_settings FOR ALL USING (public.is_admin());

CREATE POLICY "Public read page_seo" ON page_seo FOR SELECT USING (true);
CREATE POLICY "Admins manage page_seo" ON page_seo FOR ALL USING (public.is_admin());

CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON categories FOR ALL USING (public.is_admin());

CREATE POLICY "Public read active products" ON products FOR SELECT USING (status = 'active' OR public.is_admin());
CREATE POLICY "Admins manage products" ON products FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Admins manage product_images" ON product_images FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product_options" ON product_options FOR SELECT USING (true);
CREATE POLICY "Admins manage product_options" ON product_options FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product_option_values" ON product_option_values FOR SELECT USING (true);
CREATE POLICY "Admins manage product_option_values" ON product_option_values FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product_variants" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Admins manage product_variants" ON product_variants FOR ALL USING (public.is_admin());

CREATE POLICY "Public read hero_slides" ON hero_slides FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admins manage hero_slides" ON hero_slides FOR ALL USING (public.is_admin());

-- Addresses: Customers can manage their own
CREATE POLICY "Users can read own addresses" ON addresses FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can insert own addresses" ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can update own addresses" ON addresses FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can delete own addresses" ON addresses FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- Orders & Items
CREATE POLICY "Users read own orders" ON orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage orders" ON orders FOR ALL USING (public.is_admin());

CREATE POLICY "Users read order_items" ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Create order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage order items" ON order_items FOR ALL USING (public.is_admin());

CREATE POLICY "Read order timeline" ON order_timeline FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_timeline.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Admins manage timeline" ON order_timeline FOR ALL USING (public.is_admin());

-- Reviews: Public read, authenticated users can insert, admins delete
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users insert reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage reviews" ON reviews FOR ALL USING (public.is_admin());

-- Coupons: Public read for validation, admins manage
CREATE POLICY "Public read active coupons" ON coupons FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admins manage coupons" ON coupons FOR ALL USING (public.is_admin());

-- Subscribers
CREATE POLICY "Anyone can subscribe" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read subscribers" ON subscribers FOR SELECT USING (public.is_admin());

-- Wishlist: Users manage their own
CREATE POLICY "Users manage wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);

-- Media
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);
CREATE POLICY "Admins manage media" ON media FOR ALL USING (public.is_admin());

-- ====================================================================
-- 6. STORAGE BUCKETS (Execute via Supabase Dashboard or API)
-- ====================================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('brand-assets', 'brand-assets', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('media-library', 'media-library', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public bucket read" ON storage.objects FOR SELECT USING (bucket_id IN ('product-images', 'brand-assets', 'media-library', 'avatars'));
CREATE POLICY "Admins write storage" ON storage.objects FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins update storage" ON storage.objects FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins delete storage" ON storage.objects FOR DELETE USING (public.is_admin());
CREATE POLICY "Users upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ====================================================================
-- 7. INITIAL SEED DATA
-- ====================================================================

-- Site Settings
INSERT INTO site_settings (id, site_name, tagline, contact_email, currency_code, currency_symbol, announcement_bar_text)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'LUMEN ATELIER',
    'Curated Minimalist Living & Objects',
    'concierge@lumenatelier.com',
    'USD',
    '$',
    'COMPLIMENTARY ARCHIVAL WORLDWIDE DELIVERY ON ORDERS OVER $150'
) ON CONFLICT (id) DO NOTHING;

-- SEO Settings
INSERT INTO seo_settings (id, meta_title_template, default_meta_description)
VALUES (
    'b0000000-0000-0000-0000-000000000001',
    '{Page Title} | LUMEN ATELIER',
    'Discover architectural home essentials, handcrafted apparel, and sensory design objects designed for refined modern living.'
) ON CONFLICT (id) DO NOTHING;

-- Hero Slides
INSERT INTO hero_slides (image_url, heading, subheading, cta_text, cta_link, sort_order)
VALUES
('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=85', 'ARCHITECTURAL FORM & SANCTUARY', 'A seasonal curation of sculpted stoneware, cast brass instruments, and quiet wool textiles.', 'Explore Collection', '/products', 1),
('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85', 'SILENT LUXURY IN TIMELESS LINEN', 'Designed in Copenhagen, tailored from raw unbleached fibers to age gracefully across decades.', 'View Lookbook', '/products?category=apparel', 2),
('https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=2000&q=85', 'BOTANICAL SCENTS & WARMTH', 'Wildcrafted hinoki resin, smoked cedarwood, and hand-poured beeswax candles.', 'Shop Fragrance', '/products?category=fragrance', 3)
ON CONFLICT DO NOTHING;

-- Categories
INSERT INTO categories (id, name, slug, description, image_url, sort_order)
VALUES
('c1000000-0000-0000-0000-000000000001', 'Living Objects', 'living', 'Sculptural vessels, artisanal brassware, and ambient ceramics.', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80', 1),
('c1000000-0000-0000-0000-000000000002', 'Sensory & Scent', 'fragrance', 'Cold-pressed botanical essences, hinoki burners, and raw beeswax.', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', 2),
('c1000000-0000-0000-0000-000000000003', 'Apparel & Knitwear', 'apparel', 'Undyed merino wool, heavyweight raw linen shirts, and unstructured coats.', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80', 3),
('c1000000-0000-0000-0000-000000000004', 'Leather Goods', 'leather', 'Vegetable-tanned full-grain leather folios, card cases, and totes.', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', 4)
ON CONFLICT (slug) DO NOTHING;

-- Products
INSERT INTO products (id, title, slug, description, category_id, price, sale_price, sku, stock_quantity, track_inventory, status, tags)
VALUES
('p1000000-0000-0000-0000-000000000001', 'Brutalist Travertine Vessel', 'brutalist-travertine-vessel', '<p>Hand-carved from solid Tuscan travertine. Each vessel retains geological cavities and naturally weathered textures, grounding your space with raw stone poise.</p>', 'c1000000-0000-0000-0000-000000000001', 280.00, 240.00, 'LMN-VES-001', 18, true, 'active', ARRAY['stone', 'decor', 'craft', 'bestseller']),
('p1000000-0000-0000-0000-000000000002', 'Cast Bronze Incense Cradle', 'cast-bronze-incense-cradle', '<p>Heavyweight sand-cast bronze burner that catches falling ash along an elongated parabolic trough. Matures with an exquisite antique patina over time.</p>', 'c1000000-0000-0000-0000-000000000002', 145.00, NULL, 'LMN-INC-002', 34, true, 'active', ARRAY['bronze', 'incense', 'fragrance']),
('p1000000-0000-0000-0000-000000000003', 'Heavyweight Raw Linen Overshirt', 'heavyweight-raw-linen-overshirt', '<p>Woven from 340gsm Normandy flax with horn button closures. Cut generously for breathable layering across all seasons.</p>', 'c1000000-0000-0000-0000-000000000003', 220.00, NULL, 'LMN-APP-003', 25, true, 'active', ARRAY['linen', 'clothing', 'apparel', 'bestseller']),
('p1000000-0000-0000-0000-000000000004', 'Vegetable-Tanned Studio Folio', 'vegetable-tanned-studio-folio', '<p>Italian saddle-stitched Tuscan leather designed to sheath an A4 notebook and 13-inch laptop. Edge-burnished with natural beeswax.</p>', 'c1000000-0000-0000-0000-000000000004', 310.00, 275.00, 'LMN-LEA-004', 12, true, 'active', ARRAY['leather', 'stationery', 'travel']),
('p1000000-0000-0000-0000-000000000005', 'Hinoki Wood & Smoked Amber Candle', 'hinoki-wood-smoked-amber-candle', '<p>Hand-poured coconut and beeswax blend in a matte ceramic jar. Scent notes of Japanese cypress, resinous labdanum, and peat smoke.</p>', 'c1000000-0000-0000-0000-000000000002', 68.00, NULL, 'LMN-CND-005', 45, true, 'active', ARRAY['candle', 'hinoki', 'fragrance', 'new']),
('p1000000-0000-0000-0000-000000000006', 'Merino Wool Seamless Ribbed Beanie', 'merino-wool-seamless-beanie', '<p>Spun from superfine 19.5-micron New Zealand merino wool. Double-folded brim offering warmth without itching or bulk.</p>', 'c1000000-0000-0000-0000-000000000003', 75.00, NULL, 'LMN-APP-006', 40, true, 'active', ARRAY['wool', 'apparel', 'winter']),
('p1000000-0000-0000-0000-000000000007', 'Hand-Forged Brass Table Lamp', 'hand-forged-brass-table-lamp', '<p>Solid spun brass dome shade casting warm, diffused downward illumination. Cord wrapped in braided graphite cord with inline dial dimmer.</p>', 'c1000000-0000-0000-0000-000000000001', 490.00, 420.00, 'LMN-LMP-007', 8, true, 'active', ARRAY['lighting', 'brass', 'decor']),
('p1000000-0000-0000-0000-000000000008', 'Minimalist Bi-Fold Card Wallet', 'minimalist-bi-fold-card-wallet', '<p>Six precision-cut card slots and a lined bill sleeve, crafted from buttero vegetable leather that patinas with individual character.</p>', 'c1000000-0000-0000-0000-000000000004', 110.00, NULL, 'LMN-LEA-008', 28, true, 'active', ARRAY['leather', 'accessories', 'new'])
ON CONFLICT (slug) DO NOTHING;

-- Product Images
INSERT INTO product_images (product_id, image_url, sort_order, alt_text)
VALUES
('p1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80', 1, 'Brutalist Travertine Vessel Main Angle'),
('p1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1200&q=80', 2, 'Brutalist Travertine Vessel Detail Texture'),
('p1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80', 1, 'Cast Bronze Incense Cradle Studio Shot'),
('p1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=80', 2, 'Cast Bronze Incense Burner In Action'),
('p1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=80', 1, 'Heavyweight Raw Linen Overshirt Front'),
('p1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80', 2, 'Heavyweight Raw Linen Overshirt Fabric Close-up'),
('p1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80', 1, 'Vegetable-Tanned Studio Folio'),
('p1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80', 1, 'Hinoki Wood & Smoked Amber Candle'),
('p1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=80', 1, 'Merino Wool Beanie Natural Tone'),
('p1000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80', 1, 'Hand-Forged Brass Table Lamp'),
('p1000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80', 1, 'Minimalist Bi-Fold Card Wallet')
ON CONFLICT DO NOTHING;

-- Product Options & Variants for Linen Overshirt
INSERT INTO product_options (id, product_id, name, sort_order)
VALUES
('o1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000003', 'Size', 1),
('o1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000003', 'Color', 2)
ON CONFLICT DO NOTHING;

INSERT INTO product_option_values (option_id, value, sort_order)
VALUES
('o1000000-0000-0000-0000-000000000001', 'Small', 1),
('o1000000-0000-0000-0000-000000000001', 'Medium', 2),
('o1000000-0000-0000-0000-000000000001', 'Large', 3),
('o1000000-0000-0000-0000-000000000002', 'Sand Dune', 1),
('o1000000-0000-0000-0000-000000000002', 'Midnight Slate', 2)
ON CONFLICT DO NOTHING;

INSERT INTO product_variants (product_id, sku, price, stock_quantity, option_values)
VALUES
('p1000000-0000-0000-0000-000000000003', 'LMN-APP-003-SM-SND', 220.00, 8, '[{"name":"Size","value":"Small"},{"name":"Color","value":"Sand Dune"}]'::jsonb),
('p1000000-0000-0000-0000-000000000003', 'LMN-APP-003-MD-SND', 220.00, 10, '[{"name":"Size","value":"Medium"},{"name":"Color","value":"Sand Dune"}]'::jsonb),
('p1000000-0000-0000-0000-000000000003', 'LMN-APP-003-LG-SND', 220.00, 7, '[{"name":"Size","value":"Large"},{"name":"Color","value":"Sand Dune"}]'::jsonb)
ON CONFLICT DO NOTHING;

-- Coupons
INSERT INTO coupons (code, type, value, min_order_amount, usage_limit, is_active)
VALUES
('WELCOME10', 'percentage', 10.00, 50.00, 500, true),
('ARCHIVE50', 'fixed', 50.00, 200.00, 50, true)
ON CONFLICT (code) DO NOTHING;

-- Reviews
INSERT INTO reviews (product_id, rating, title, body, is_verified, author_name)
VALUES
('p1000000-0000-0000-0000-000000000001', 5, 'Exquisite tactile weight', 'The travertine has an unbelievable presence on our oak console. True monolithic design.', true, 'Elena Vance, Architect'),
('p1000000-0000-0000-0000-000000000001', 5, 'Quiet perfection', 'Even better in person. The porous stone texture brings such grounding stillness to the study.', true, 'Julian K.'),
('p1000000-0000-0000-0000-000000000003', 5, 'Unmatched drape and density', 'Hands down the best linen overshirt I have ever worn. Heavyweight yet effortlessly breathable.', true, 'Marcus Thorne')
ON CONFLICT DO NOTHING;
