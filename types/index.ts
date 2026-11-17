import { Product, ProductVariant } from './database';

export * from './database';

export interface CartItem {
  id: string; // unique item id: product_id + (variant_id || '')
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  maxStock: number;
  variantInfo?: Record<string, string>;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>, event?: React.MouseEvent) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  appliedCoupon: { code: string; type: 'percentage' | 'fixed'; value: number } | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
}

export interface FlyingImageParams {
  src: string;
  startX: number;
  startY: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
}

export interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info', title?: string) => void;
  removeToast: (id: string) => void;
}
