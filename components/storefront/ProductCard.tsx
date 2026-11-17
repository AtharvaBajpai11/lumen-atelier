'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatCurrency, getDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  priority = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const { addToast } = useToast();

  const primaryImage =
    product.images?.[0]?.image_url ||
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images?.[1]?.image_url || primaryImage;

  const isSale = product.sale_price !== null && product.sale_price !== undefined && product.sale_price < product.price;
  const isNew = product.tags?.includes('new');
  const discount = isSale ? getDiscountPercentage(product.price, product.sale_price) : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        productId: product.id,
        variantId: product.variants?.[0]?.id,
        title: product.title,
        price: product.sale_price || product.price,
        originalPrice: product.sale_price ? product.price : undefined,
        image: primaryImage,
        quantity: 1,
        maxStock: product.stock_quantity,
        variantInfo: product.variants?.[0]?.option_values
          ? Object.fromEntries(
              product.variants[0].option_values.map((v) => [v.name, v.value])
            )
          : undefined,
      },
      e
    );
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    addToast(
      !isWishlisted
        ? `Added "${product.title}" to your wishlist`
        : `Removed from wishlist`,
      'info'
    );
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-black/[0.06] shadow-subtle transition-shadow duration-300 hover:shadow-card"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F5F0]">
        {/* Primary Image */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            opacity: isHovered && secondaryImage !== primaryImage ? 0 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 320px"
            priority={priority}
            className="object-cover object-center"
          />
        </motion.div>

        {/* Secondary Lifestyle Image on Hover */}
        {secondaryImage !== primaryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <Image
              src={secondaryImage}
              alt={`${product.title} lifestyle view`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 320px"
              className="object-cover object-center"
            />
          </motion.div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {isNew && (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="px-2.5 py-1 bg-black text-white text-[10px] font-bold tracking-widest uppercase shadow-sm"
            >
              NEW
            </motion.span>
          )}
          {isSale && (
            <span className="px-2.5 py-1 bg-sale text-white text-[10px] font-bold tracking-widest uppercase shadow-sm">
              -{discount}%
            </span>
          )}
          {product.stock_quantity === 0 && (
            <span className="px-2.5 py-1 bg-neutral-800 text-white text-[10px] font-medium tracking-widest uppercase">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-black/5 rounded-full text-primary-text shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ scale: isWishlisted ? [1, 1.35, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-sale text-sale' : 'text-primary-text'
              }`}
            />
          </motion.div>
        </motion.button>

        {/* Quick View Button (Desktop Hover) */}
        {onQuickView && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center gap-2 px-4 py-2.5 bg-white/95 text-primary-text text-xs uppercase tracking-widest font-semibold shadow-md backdrop-blur-sm border border-black/10 hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </motion.button>
        )}

        {/* Quick Add Button sliding up from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="absolute bottom-3 inset-x-3 z-10"
        >
          {product.is_vehicle ? (
            <Link
              href={`/products/${product.slug}`}
              className="w-full h-11 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <span>Enquire & Test Drive</span>
            </Link>
          ) : (
            <button
              onClick={handleQuickAdd}
              disabled={product.stock_quantity === 0}
              className="w-full h-11 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer disabled:bg-neutral-400 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{product.stock_quantity === 0 ? 'Out of Stock' : 'Quick Add'}</span>
            </button>
          )}
        </motion.div>
      </div>

      {/* Product Details Area */}
      <Link href={`/products/${product.slug}`} className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-secondary-text mb-1 font-medium">
            {product.brand && <span className="font-semibold text-primary-text">{product.brand}</span>}
            {product.brand && (product.subcategory || product.category) && <span>•</span>}
            <span>{product.subcategory || product.category?.name}</span>
          </div>
          <h3 className="font-serif text-[18px] leading-snug text-primary-text group-hover:text-accent transition-colors line-clamp-1">
            {product.title}
          </h3>
        </div>

        <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-black/5">
          <div className="flex items-center gap-2">
            {isSale ? (
              <>
                <span className="text-base font-semibold text-sale">
                  {formatCurrency(product.sale_price!)}
                </span>
                <span className="text-xs text-secondary-text line-through">
                  {formatCurrency(product.price)}
                </span>
              </>
            ) : (
              <span className="text-base font-semibold text-primary-text">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
            <span className="text-[10px] text-amber-700 tracking-wider uppercase font-semibold">
              Only {product.stock_quantity} left
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
