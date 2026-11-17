'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rect',
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-neutral-200/70',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 rounded-none w-3/4',
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-shimmer"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent)',
        }}
      />
    </div>
  );
};
