export type ProductCategory = 
  | 'All'
  | 'Electronics'
  | 'Computers & Accessories'
  | 'Home & Kitchen'
  | 'Books'
  | 'Fashion'
  | 'Beauty & Care'
  | 'Smart Home';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: ProductCategory;
  price: number;
  listPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount?: number;
  prime: boolean;
  bestSeller?: boolean;
  amazonChoice?: boolean;
  dealTag?: string; // e.g. "Limited time deal", "Save 25%"
  image: string;
  galleryImages?: string[];
  description: string;
  features: string[];
  specs?: Record<string, string>;
  colors?: string[];
  sizes?: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  isGift?: boolean;
}

export interface SavedItem {
  product: Product;
  dateAdded: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  primeMember: boolean;
  avatar?: string;
  addresses: Address[];
}

export type OrderStatus = 'Ordered' | 'Shipped' | 'Out for delivery' | 'Delivered';

export interface OrderTrackingStep {
  status: OrderStatus;
  date: string;
  time: string;
  location: string;
  completed: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  deliveryDate: string;
  shippingSpeed: 'standard' | 'two-day' | 'one-day';
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber: string;
  trackingSteps: OrderTrackingStep[];
}
