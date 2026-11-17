import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartDrawer } from '@/components/storefront/CartDrawer';
import { PageTransition } from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'LUMEN ATELIER — Minimalist Architectural Living & Objects',
  description:
    'Discover architectural home essentials, handcrafted apparel, and sensory design objects designed for refined modern living.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A1A] antialiased selection:bg-black selection:text-white">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <PageTransition>{children}</PageTransition>
              <CartDrawer />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
