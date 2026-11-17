'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/image';
import NextLink from 'next/link';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductBySlug, getProducts } from '@/lib/store';
import { Product, Review } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/storefront/ProductCard';
import {
  Star,
  Check,
  Plus,
  Minus,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Gauge,
  Zap,
  Car,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Vehicle Enquiry Modal State
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryCity, setEnquiryCity] = useState('');
  const [enquiryDate, setEnquiryDate] = useState('');
  const [enquiryNotes, setEnquiryNotes] = useState('');
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev1',
      product_id: '',
      rating: 5,
      title: 'Monolithic presence in our space',
      body: 'The tactile texture and sheer weight are incredible. You can feel the artisanal craftsmanship immediately. Arrived impeccably packed with archival certificates.',
      is_verified: true,
      author_name: 'Elena Vance, Interior Architect',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      id: 'rev2',
      product_id: '',
      rating: 5,
      title: 'Flawless execution',
      body: 'Pairs perfectly with raw wood surfaces and linen drapery. It has a silent, tranquil quality that anchors the whole room.',
      is_verified: true,
      author_name: 'Julian K.',
      created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    },
  ]);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const { addItem } = useCart();
  const { addToast } = useToast();

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    addToast(
      !isWishlisted
        ? `Added "${product?.title}" to your private wishlist`
        : `Removed from wishlist`,
      'info'
    );
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) {
      addToast('Please provide your name and contact phone number', 'error');
      return;
    }
    setIsSubmittingEnquiry(true);
    setTimeout(() => {
      setIsSubmittingEnquiry(false);
      setEnquirySubmitted(true);
      addToast(
        `Consultation request reserved for ${product?.title}. Our automotive concierge will reach out within 2 hours.`,
        'success'
      );
      setTimeout(() => {
        setIsEnquiryModalOpen(false);
        setEnquirySubmitted(false);
        setEnquiryName('');
        setEnquiryPhone('');
        setEnquiryEmail('');
        setEnquiryCity('');
        setEnquiryDate('');
        setEnquiryNotes('');
      }, 2000);
    }, 700);
  };

  const handleReserveVehicleOnline = (e: React.MouseEvent) => {
    if (!product) return;
    addItem(
      {
        productId: product.id,
        title: `${product.title} (Refundable Reservation Token)`,
        price: 25000,
        originalPrice: product.price,
        image: currentImage,
        quantity: 1,
        maxStock: 5,
        variantInfo: {
          'Booking Type': 'Refundable Vehicle Consignment Deposit',
          'Vehicle Model': product.vehicle_specs?.model || product.title,
          'Estimated Delivery': '14-21 Business Days',
        },
      },
      e
    );
    addToast(
      `Vehicle reservation token of ₹25,000 added to cart for ${product.title}`,
      'success'
    );
  };

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const prod = await getProductBySlug(slug);
      if (!prod) {
        return;
      }
      setProduct(prod);

      // Set default options
      if (prod.options && prod.options.length > 0) {
        const initialOpt: Record<string, string> = {};
        prod.options.forEach((opt) => {
          if (opt.values && opt.values[0]) {
            initialOpt[opt.name] = opt.values[0].value;
          }
        });
        setSelectedOptions(initialOpt);
      }

      // Related products
      const related = await getProducts({ categorySlug: prod.category?.slug });
      setRelatedProducts(related.filter((p) => p.id !== prod.id).slice(0, 4));
    }
    loadData();
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-site mx-auto px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-widest text-secondary-text mb-4">
          Loading Curated Object...
        </p>
      </div>
    );
  }

  const images = product.images || [
    {
      id: 'default',
      product_id: product.id,
      image_url:
        'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
      sort_order: 1,
    },
  ];

  const currentImage = images[selectedImageIndex]?.image_url || images[0].image_url;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    addItem(
      {
        productId: product.id,
        variantId: product.variants?.[0]?.id,
        title: product.title,
        price: product.sale_price || product.price,
        originalPrice: product.sale_price ? product.price : undefined,
        image: currentImage,
        quantity,
        maxStock: product.stock_quantity,
        variantInfo: selectedOptions,
      },
      e
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBody.trim() || !authorName.trim()) {
      addToast('Please provide your name and review impressions.', 'error');
      return;
    }
    setIsSubmittingReview(true);
    const rev: Review = {
      id: `rev_${Date.now()}`,
      product_id: product.id,
      rating: newRating,
      title: newTitle || 'Exceptional Piece',
      body: newBody,
      is_verified: true,
      author_name: authorName,
      created_at: new Date().toISOString(),
    };
    setReviews([rev, ...reviews]);
    setIsSubmittingReview(false);
    setNewTitle('');
    setNewBody('');
    setAuthorName('');
    addToast('Your review has been archived and published.', 'success');
  };

  // Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: currentImage,
    description: product.description.replace(/<[^>]*>?/gm, ''),
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.sale_price || product.price,
      availability:
        product.stock_quantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-8 lg:py-16">
      {/* Auto-injected JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-secondary-text mb-8">
        <NextLink href="/" className="hover:text-primary-text transition-colors">
          Home
        </NextLink>
        <span>/</span>
        <NextLink href="/products" className="hover:text-primary-text transition-colors">
          Collection
        </NextLink>
        {product.category && (
          <>
            <span>/</span>
            <NextLink
              href={`/products?category=${product.category.slug}`}
              className="hover:text-primary-text transition-colors"
            >
              {product.category.name}
            </NextLink>
          </>
        )}
        <span>/</span>
        <span className="text-primary-text font-semibold truncate">{product.title}</span>
      </nav>

      {/* Main Grid: Gallery on left, Info on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 items-start">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto w-full sm:w-20 shrink-0 pb-2 sm:pb-0">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 shrink-0 border transition-all cursor-pointer bg-[#F5F5F0] overflow-hidden ${
                    selectedImageIndex === idx
                      ? 'border-black ring-1 ring-black'
                      : 'border-black/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Image with Desktop Hover Zoom */}
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-[4/5] w-full bg-[#F5F5F0] overflow-hidden border border-black/5 cursor-crosshair"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className={`object-cover object-center transition-transform duration-200 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                        }
                      : undefined
                  }
                />
              </motion.div>
            </AnimatePresence>

            {product.sale_price && (
              <span className="absolute top-4 left-4 bg-sale text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 shadow-sm">
                Archival Sale
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {product.brand && (
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary-text bg-black/5 px-2.5 py-0.5">
                  {product.brand}
                </span>
              )}
              {product.category && (
                <span className="text-xs uppercase tracking-[0.15em] font-semibold text-secondary-text">
                  {product.category.name}
                </span>
              )}
              {product.subcategory && (
                <>
                  <span className="text-secondary-text">•</span>
                  <span className="text-xs uppercase tracking-[0.15em] font-medium text-secondary-text">
                    {product.subcategory}
                  </span>
                </>
              )}
              {product.is_vehicle && (
                <span className="text-[10px] uppercase tracking-wider font-bold text-accent bg-blue-50 border border-blue-200 px-2 py-0.5">
                  Automotive Division
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal leading-tight mb-3">
              {product.title}
            </h1>

            {/* Price & Star Rating */}
            <div className="flex items-center justify-between py-2 border-b border-black/10">
              <div className="flex items-baseline gap-3">
                {product.sale_price ? (
                  <>
                    <span className="text-2xl font-bold text-sale">
                      {formatCurrency(product.sale_price)}
                    </span>
                    <span className="text-base text-secondary-text line-through">
                      {formatCurrency(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold text-primary-text">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>

              {/* Star Rating summary */}
              <div className="flex items-center gap-1.5 text-xs text-primary-text">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">5.0</span>
                <span className="text-secondary-text">({reviews.length})</span>
              </div>
            </div>

            <p className="text-xs text-secondary-text mt-2 font-mono">
              SKU: {product.sku}
            </p>
          </div>

          {/* Vehicle Specifications Grid if Vehicle */}
          {product.is_vehicle && product.vehicle_specs && (
            <div className="bg-[#F5F5F0] border border-black/10 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-text">
                <Car className="w-4 h-4 text-accent" />
                <span>Vehicle Performance Specifications</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.vehicle_specs.model && (
                  <div className="bg-white p-2.5 border border-black/5">
                    <span className="text-[10px] text-secondary-text uppercase tracking-wider block">Model</span>
                    <span className="font-semibold text-primary-text">{product.vehicle_specs.model}</span>
                  </div>
                )}
                {product.vehicle_specs.fuel_type && (
                  <div className="bg-white p-2.5 border border-black/5">
                    <span className="text-[10px] text-secondary-text uppercase tracking-wider block">Powertrain</span>
                    <span className="font-semibold text-primary-text">{product.vehicle_specs.fuel_type}</span>
                  </div>
                )}
                {product.vehicle_specs.transmission && (
                  <div className="bg-white p-2.5 border border-black/5">
                    <span className="text-[10px] text-secondary-text uppercase tracking-wider block">Transmission</span>
                    <span className="font-semibold text-primary-text">{product.vehicle_specs.transmission}</span>
                  </div>
                )}
                {product.vehicle_specs.mileage_range && (
                  <div className="bg-white p-2.5 border border-black/5">
                    <span className="text-[10px] text-secondary-text uppercase tracking-wider block">Range / Mileage</span>
                    <span className="font-semibold text-primary-text">{product.vehicle_specs.mileage_range}</span>
                  </div>
                )}
                {product.vehicle_specs.top_speed && (
                  <div className="bg-white p-2.5 border border-black/5">
                    <span className="text-[10px] text-secondary-text uppercase tracking-wider block">Top Velocity</span>
                    <span className="font-semibold text-primary-text">{product.vehicle_specs.top_speed}</span>
                  </div>
                )}
                {product.vehicle_specs.engine_battery && (
                  <div className="bg-white p-2.5 border border-black/5">
                    <span className="text-[10px] text-secondary-text uppercase tracking-wider block">Engine / Pack</span>
                    <span className="font-semibold text-primary-text truncate block">{product.vehicle_specs.engine_battery}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Short Description */}
          <div
            className="text-sm text-secondary-text leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Dynamic Variant Selectors */}
          {product.options &&
            product.options.map((opt) => (
              <div key={opt.id} className="pt-2">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs uppercase tracking-wider font-semibold text-primary-text">
                    {opt.name}:{' '}
                    <span className="font-normal text-secondary-text">
                      {selectedOptions[opt.name] || 'Select'}
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {opt.values?.map((val) => {
                    const isSelected = selectedOptions[opt.name] === val.value;
                    const isColorOption = opt.name.toLowerCase().includes('color');

                    return (
                      <button
                        key={val.id}
                        onClick={() =>
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [opt.name]: val.value,
                          }))
                        }
                        className={`h-10 px-4 text-xs uppercase tracking-wider border transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white border-black font-semibold shadow-sm'
                            : 'bg-white text-primary-text border-black/15 hover:border-black/50'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{val.value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

          {/* Quantity Selector & Stock Status (Only for non-vehicles) */}
          {!product.is_vehicle ? (
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider font-semibold text-primary-text mb-2.5">
                Quantity
              </span>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center border border-black/15 bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 flex items-center justify-center text-primary-text hover:bg-black/5 cursor-pointer"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock_quantity || 99, quantity + 1))
                    }
                    className="w-11 h-11 flex items-center justify-center text-primary-text hover:bg-black/5 cursor-pointer"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-secondary-text">
                  {product.stock_quantity > 0 ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                      In stock ({product.stock_quantity} available)
                    </span>
                  ) : (
                    <span className="text-sale font-medium">Sold Out for the Season</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-2">
              <div className="bg-amber-50/60 border border-amber-200/60 p-3 text-xs text-amber-900 leading-relaxed">
                <span className="font-semibold block mb-0.5">Automotive Consultation Policy</span>
                Vehicles require documentation, RTO road-tax calculation, and insurance handover. You may request a complimentary test drive or reserve your allocation online.
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 space-y-3">
            {product.is_vehicle ? (
              <div className="space-y-2.5">
                <Button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  size="lg"
                  className="w-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Test Drive / Request Consultation</span>
                </Button>

                <div className="flex gap-2">
                  <button
                    onClick={handleReserveVehicleOnline}
                    className="flex-1 py-3 bg-white border border-black text-primary-text hover:bg-black hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold"
                  >
                    Reserve Unit (₹25,000 Deposit)
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className="px-4 py-3 border border-black/20 bg-white hover:border-black transition-colors flex items-center justify-center"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-sale text-sale' : 'text-primary-text'}`} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  size="lg"
                  className="flex-1 text-xs uppercase tracking-widest font-semibold"
                >
                  {product.stock_quantity === 0
                    ? 'Sold Out'
                    : 'Add to Cart — ' + formatCurrency((product.sale_price || product.price) * quantity)}
                </Button>
                <button
                  onClick={handleToggleWishlist}
                  className="h-12 w-12 border border-black/20 bg-white hover:border-black transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-sale text-sale' : 'text-primary-text'}`} />
                </button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-black/10 text-center text-[11px] text-secondary-text uppercase tracking-wider">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-primary-text" />
                <span>{product.is_vehicle ? 'Dealership Delivery' : 'Global Air Express'}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-primary-text" />
                <span>Verified Atelier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-primary-text" />
                <span>{product.is_vehicle ? 'Warranty Included' : '30-Day Returns'}</span>
              </div>
            </div>
          </div>

          {/* Accordion Sections: Specifications, Shipping, Care */}
          <div className="pt-6 border-t border-black/10 divide-y divide-black/10">
            {/* Description Accordion */}
            <div className="py-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-primary-text py-1 cursor-pointer"
              >
                <span>Curatorial Details</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openAccordion === 'desc' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openAccordion === 'desc' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pt-3 text-xs text-secondary-text leading-relaxed space-y-2"
                  >
                    <p>
                      Every piece is authenticated with direct manufacturer warranty and precision inspection. Specifications are verified against manufacturer archives.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Specifications Table Accordion */}
            <div className="py-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-primary-text py-1 cursor-pointer"
              >
                <span>Technical Specifications</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openAccordion === 'specs' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openAccordion === 'specs' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pt-3 text-xs"
                  >
                    <table className="w-full text-left border-collapse">
                      <tbody className="divide-y divide-black/5 text-secondary-text">
                        {product.brand && (
                          <tr>
                            <td className="py-2 font-semibold text-primary-text uppercase tracking-wider w-1/3">
                              Brand / Atelier
                            </td>
                            <td className="py-2">{product.brand}</td>
                          </tr>
                        )}
                        {product.subcategory && (
                          <tr>
                            <td className="py-2 font-semibold text-primary-text uppercase tracking-wider">
                              Category / Division
                            </td>
                            <td className="py-2">{product.subcategory}</td>
                          </tr>
                        )}
                        {product.specifications &&
                          Object.entries(product.specifications).map(([key, val]) => (
                            <tr key={key}>
                              <td className="py-2 font-semibold text-primary-text uppercase tracking-wider">
                                {key}
                              </td>
                              <td className="py-2">{val}</td>
                            </tr>
                          ))}
                        {!product.specifications && (
                          <>
                            <tr>
                              <td className="py-2 font-semibold text-primary-text uppercase tracking-wider w-1/3">
                                Origin
                              </td>
                              <td className="py-2">Global Certified Manufacture</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-semibold text-primary-text uppercase tracking-wider">
                                Finishing
                              </td>
                              <td className="py-2">Architectural Grade Refinement</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shipping & Returns Accordion */}
            <div className="py-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'ship' ? null : 'ship')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-primary-text py-1 cursor-pointer"
              >
                <span>Archival Shipping & Returns</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openAccordion === 'ship' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openAccordion === 'ship' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pt-3 text-xs text-secondary-text leading-relaxed space-y-2"
                  >
                    <p>
                      Complimentary worldwide archival shipping on all consignments exceeding $150. Custom crating and insurance are included with every delivery.
                    </p>
                    <p>
                      Unused objects in original archival packaging may be returned within 30 days of arrival.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-24 pt-16 border-t border-black/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text mb-2">
              Collector Perspectives
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary-text font-normal">
              Customer Reviews ({reviews.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Reviews Score Card (4 Cols) */}
          <div className="lg:col-span-4 bg-[#F5F5F0] p-6 border border-black/5 space-y-6">
            <div className="text-center pb-6 border-b border-black/10">
              <span className="font-serif text-5xl font-normal text-primary-text">5.0</span>
              <div className="flex justify-center text-amber-500 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-secondary-text uppercase tracking-wider">
                100% of collectors recommend this object
              </p>
            </div>

            {/* Rating breakdown bars */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-12 text-secondary-text">5 Stars</span>
                <div className="flex-1 h-2 bg-black/10 overflow-hidden">
                  <div className="w-full h-full bg-black" />
                </div>
                <span className="w-6 text-right font-medium">100%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-secondary-text">4 Stars</span>
                <div className="flex-1 h-2 bg-black/10 overflow-hidden">
                  <div className="w-0 h-full bg-black" />
                </div>
                <span className="w-6 text-right font-medium">0%</span>
              </div>
            </div>

            {/* Submit Review Form */}
            <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-black/10 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-primary-text">
                Submit Your Perspective
              </h4>

              <div>
                <span className="block text-[11px] uppercase tracking-wider text-secondary-text mb-1">
                  Rating
                </span>
                <div className="flex gap-1 text-amber-500 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= newRating ? 'fill-current text-amber-500' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your Name / City"
                  className="w-full h-10 px-3 bg-white border border-black/15 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Review Headline"
                  className="w-full h-10 px-3 bg-white border border-black/15 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Share details regarding texture, density, and spatial feel..."
                  className="w-full p-3 bg-white border border-black/15 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full h-10 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
              >
                Publish Review
              </button>
            </form>
          </div>

          {/* Individual Reviews (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-white border border-black/[0.06] shadow-subtle space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-secondary-text">
                    {formatDate(rev.created_at)}
                  </span>
                </div>

                {rev.title && (
                  <h4 className="font-serif text-lg font-normal text-primary-text">
                    {rev.title}
                  </h4>
                )}

                <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                  {rev.body}
                </p>

                <div className="flex items-center gap-2 pt-2 border-t border-black/5 text-xs text-primary-text font-medium">
                  <span>{rev.author_name}</span>
                  {rev.is_verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                      <Check className="w-3 h-3" />
                      <span>Verified Collector</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="mt-28 pt-16 border-t border-black/10">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text mb-2">
                Harmonious Pairings
              </p>
              <h2 className="font-serif text-3xl text-primary-text font-normal">
                Related Objects
              </h2>
            </div>
            <NextLink
              href="/products"
              className="text-xs uppercase tracking-widest font-semibold hover:text-accent"
            >
              View All
            </NextLink>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Vehicle Consultation & Test Drive Modal */}
      <Modal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        maxWidth="xl"
      >
        <div className="p-2 sm:p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-bold mb-1">
            <Car className="w-4 h-4" />
            <span>Automotive Concierge Appointment</span>
          </div>
          <h3 className="font-serif text-2xl font-normal text-primary-text mb-2">
            Schedule Test Drive: {product.title}
          </h3>
          <p className="text-xs text-secondary-text mb-6 leading-relaxed">
            Experience the craftsmanship and dynamics first-hand. Our private client automotive liaison will arrange an exclusive session at your preferred location or partner showroom.
          </p>

          {enquirySubmitted ? (
            <div className="py-8 text-center space-y-3 bg-emerald-50/50 border border-emerald-200 p-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-xl text-primary-text">Consultation Request Confirmed</h4>
              <p className="text-xs text-secondary-text max-w-sm mx-auto">
                Thank you, {enquiryName}. Your private test drive docket has been created. A specialist will call you at {enquiryPhone}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  placeholder="e.g. Vikramaditya Singhania"
                  required
                />
                <Input
                  label="Phone Number *"
                  type="tel"
                  value={enquiryPhone}
                  onChange={(e) => setEnquiryPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  value={enquiryEmail}
                  onChange={(e) => setEnquiryEmail(e.target.value)}
                  placeholder="name@domain.com"
                />
                <Input
                  label="City / Location"
                  value={enquiryCity}
                  onChange={(e) => setEnquiryCity(e.target.value)}
                  placeholder="e.g. Mumbai, Bangalore, Delhi"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Preferred Test Drive Date"
                  type="date"
                  value={enquiryDate}
                  onChange={(e) => setEnquiryDate(e.target.value)}
                />
                <Input
                  label="Specific Requirements / Inquiries"
                  value={enquiryNotes}
                  onChange={(e) => setEnquiryNotes(e.target.value)}
                  placeholder="e.g. Custom leather options, home delivery"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEnquiryModalOpen(false)}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider text-secondary-text hover:text-black font-semibold"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={isSubmittingEnquiry}
                  className="text-xs uppercase tracking-widest font-semibold px-6"
                >
                  {isSubmittingEnquiry ? 'Confirming...' : 'Request Private Appointment'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
}
