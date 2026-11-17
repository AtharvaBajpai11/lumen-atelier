'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, value, onChange, onFocus, onBlur, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== null && String(value).length > 0;

    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            placeholder=" "
            className={cn(
              'peer w-full h-14 pt-4 pb-1 px-4 bg-white border text-sm text-primary-text transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]',
              error
                ? 'border-sale focus-visible:ring-sale'
                : 'border-black/15 focus:border-accent hover:border-black/30',
              className
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              'absolute left-4 pointer-events-none transition-all duration-200 tracking-wider uppercase',
              isFocused || hasValue
                ? 'top-2 text-[10px] text-secondary-text font-semibold'
                : 'top-4 text-xs text-secondary-text/80'
            )}
          >
            {label}
          </label>
        </div>
        {error && <p className="mt-1.5 text-xs text-sale font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
