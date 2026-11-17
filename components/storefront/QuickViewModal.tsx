'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Plus, Minus, ArrowRight, Check } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return null;

  const images = product.images || [
    {
      id: 'default',
      product_id: product.id,
      image_url:
        'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
      sort_order: 1,
    },
  ];

  const currentImage = images[selectedImageIndex]?.image_url || images[0].image_url;

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
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
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[4/5] w-full bg-[#F5F5F0] overflow-hidden border border-black/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 shrink-0 border transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-black ring-1 ring-black'
                      : 'border-black/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between h-full">
          <div>
            {product.category && (
              <p className="text-[11px] uppercase tracking-widest text-secondary-text mb-1 font-semibold">
                {product.category.name}
              </p>
            )}
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-primary-text mb-2">
              {product.title}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              {product.sale_price ? (
                <>
                  <span className="text-xl font-bold text-sale">
                    {formatCurrency(product.sale_price)}
                  </span>
                  <span className="text-sm text-secondary-text line-through">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-semibold text-primary-text">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <div
              className="text-sm text-secondary-text leading-relaxed mb-6 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Options / Variants */}
            {product.options &&
              product.options.map((opt) => (
                <div key={opt.id} className="mb-4">
                  <span className="block text-xs uppercase tracking-wider font-semibold text-primary-text mb-2">
                    {opt.name}: {selectedOptions[opt.name] || 'Select'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {opt.values?.map((val) => {
                      const isSelected = selectedOptions[opt.name] === val.value;
                      return (
                        <button
                          key={val.id}
                          onClick={() => handleOptionSelect(opt.name, val.value)}
                          className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-primary-text border-black/15 hover:border-black/50'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                          <span>{val.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* Quantity Selector */}
            <div className="mb-6">
              <span className="block text-xs uppercase tracking-wider font-semibold text-primary-text mb-2">
                Quantity
              </span>
              <div className="inline-flex items-center border border-black/15 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-primary-text hover:bg-black/5"
                  aria-label="Decrease"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock_quantity || 99, quantity + 1))
                  }
                  className="w-9 h-9 flex items-center justify-center text-primary-text hover:bg-black/5"
                  aria-label="Increase"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-black/10">
            {product.is_vehicle ? (
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="w-full flex items-center justify-center py-3.5 bg-black text-white hover:bg-neutral-800 text-xs tracking-widest uppercase font-semibold transition-colors"
              >
                <span>Vehicle Dossier & Book Test Drive</span>
              </Link>
            ) : (
              <Button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                size="lg"
                className="w-full"
              >
                {product.stock_quantity === 0 ? 'Sold Out' : 'Add to Cart'}
              </Button>
            )}
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="w-full flex items-center justify-center gap-1.5 text-xs tracking-widest uppercase font-semibold text-secondary-text hover:text-primary-text transition-colors py-1"
            >
              <span>View Full Object Dossier & Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
