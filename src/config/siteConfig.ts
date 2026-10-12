import { SiteConfig } from '../types';

/**
 * =====================================================================
 * CLAYKRITI SITE & WHATSAPP CONFIGURATION
 * =====================================================================
 * Update your business details, phone number, and delivery rules here.
 */
export const siteConfig: SiteConfig = {
  brandName: 'ClayKriti',
  tagline: 'Wrapped in Creativity.',
  logoUrl: '/logo.jpg',
  
  /**
   * WhatsApp Ordering Number:
   * Must include country code without '+' or spaces.
   * India country code is 91 followed by the 10-digit mobile number.
   * Configured Number: 916280170498
   */
  whatsappNumber: '916280170498',
  whatsappDisplayNumber: '+91 62801 70498',

  // Social & Brand Links
  instagramHandle: '@clay__kriti',
  instagramUrl: 'https://www.instagram.com/clay__kriti?stkn=MWRvdHIwZnhpaDA4bQ%3D%3D',
  email: 'claykriti.studio@gmail.com',
  city: 'Chandigarh / Mohali',
  country: 'India',

  // Delivery settings
  deliveryCharge: 70, // Standard pan-India shipping in INR (₹)
  freeDeliveryThreshold: 999, // Orders at or above ₹999 get free shipping!

  // Top bar announcement
  announcementText: '✨ Festive Gifting Season: Free Pan-India Delivery on orders above ₹999! ✨',
};
