export type CategoryType =
  | 'all'
  | 'keychains'
  | 'bag-charms'
  | 'magnets'
  | 'shagun-items'
  | 'festive-decor'
  | 'tealight-holders'
  | 'gift-hampers'
  | 'home-decor'
  | 'customised-gifts';

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  shortDesc: string;
  iconName: string;
  count?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  features?: string[];
  materials?: string;
  dimensions?: string;
  badge?: 'Bestseller' | 'Handcrafted' | 'Festive Special' | 'Limited Edition' | 'Customizable';
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  leadTimeDays?: number; // e.g., 2-4 days for handcrafting
  allowCustomization?: boolean;
  customizationPrompt?: string; // e.g. "Enter name, initials, or color theme preference"
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizationText?: string;
}

export interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  deliveryNotes?: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  logoUrl: string;
  whatsappNumber: string; // e.g. "916280170498"
  whatsappDisplayNumber: string; // e.g. "+91 62801 70498"
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  city: string;
  country: string;
  deliveryCharge: number; // Flat delivery charge in INR
  freeDeliveryThreshold: number; // Order amount above which shipping is free
  announcementText: string;
}
