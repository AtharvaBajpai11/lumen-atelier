'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  shimmer?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      shimmer = true,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-10 px-4 text-xs tracking-wider',
      md: 'h-12 px-6 text-sm tracking-wide',
      lg: 'h-14 px-8 text-sm tracking-widest',
    };

    const variantClasses = {
      primary:
        'bg-[#1A1A1A] text-white hover:bg-black focus-visible:ring-accent border border-black shadow-subtle',
      secondary:
        'bg-[#F5F5F0] text-primary-text hover:bg-[#EBEBE5] focus-visible:ring-accent border border-black/5',
      outline:
        'bg-transparent text-primary-text border border-black/15 hover:border-black/50 hover:bg-black/[0.02] focus-visible:ring-accent',
      ghost:
        'bg-transparent text-primary-text hover:bg-black/5 focus-visible:ring-accent',
      destructive:
        'bg-sale text-white hover:bg-red-700 focus-visible:ring-red-400 border border-transparent shadow-subtle',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        disabled={disabled || isLoading}
        className={cn(
          'group relative inline-flex items-center justify-center font-medium uppercase transition-colors duration-200 cursor-pointer overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {/* Shimmer gradient overlay for primary buttons */}
        {variant === 'primary' && shimmer && !disabled && !isLoading && (
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-shimmer"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
              width: '100%',
              height: '100%',
            }}
          />
        )}

        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="opacity-90">Processing</span>
          </span>
        ) : (
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
