# ClayKriti — Wrapped in Creativity 🏺

> Premium, mobile-responsive handcrafted gifting website with persistent cart and instant WhatsApp ordering.

Designed for boutique artisans, handmade clay creators, and personalized gifting brands. Customers can browse your catalogue, customize items, manage their cart, and send structured order requests directly to your WhatsApp with one click.

---

## ✨ Features & Architecture

- **Boutique Artisan Aesthetic**: Tailored color palette with warm ivory (`#FCFAF7`), soft blush, muted terracotta (`#C86D51`), earthy charcoal, and elegant serif typography (*Playfair Display* & *Plus Jakarta Sans*).
- **Catalogue & Shopping Cart**:
  - 8 core product categories: *Handmade Clay Keychains, Bag Charms, Refrigerator Magnets, Shagun Items, Festive Decorations, Diwali Tealight Holders, Handmade Gift Hampers, Customised Gifts*.
  - Search bar & category pill navigation with live item counts.
  - Sorting (Featured, Bestsellers, Price Low-to-High, Price High-to-Low).
  - Product details modal with high-res photo gallery, material & dimension specifications, crafting lead time, and customization input.
- **Persistent Cart (localStorage)**:
  - Slide-over drawer cart with quantity steppers and line-item removals.
  - Separate subtotal and delivery charge calculations (with automatic free shipping progress indicator above ₹999).
  - Remembers customer delivery details (Name, Phone, Address, PIN) in local storage so returning customers don't have to retype.
- **WhatsApp Ordering (Zero Payment Gateway Overhead)**:
  - Generates official click-to-chat links: `https://wa.me/916280170498?text=...`
  - Formats an itemized message including customer info, item names, customization requests, quantities, subtotal, delivery charges, and final estimated total.
  - Built-in "Preview WhatsApp Message" drawer toggle so customers can review their exact order text before sending.
  - Manual confirmation note: No fake automated order confirmations — you verify availability and provide payment details via WhatsApp reply.
- **Direct Engagement**:
  - Floating boutique WhatsApp widget for instant questions.
  - Custom gifting & bulk wedding favor consultation triggers.
  - Verified customer feedback showcase with WhatsApp review submissions.
  - Instagram studio feed showcase linked to `@claykriti`.

---

## 🛠️ Project Structure

```
claykriti-shop/
├── src/
│   ├── config/
│   │   └── siteConfig.ts       <-- Edit WhatsApp number (916280170498), delivery fee, tagline
│   ├── data/
│   │   └── products.ts         <-- Edit product names, photos, prices, categories & custom flags
│   ├── types/
│   │   └── index.ts            <-- TypeScript interfaces for Product, Cart, Customer
│   ├── utils/
│   │   └── whatsapp.ts         <-- Order calculation and WhatsApp click-to-chat URL generator
│   ├── context/
│   │   └── CartContext.tsx     <-- Persistent cart state management
│   ├── components/
│   │   ├── AnnouncementBar.tsx <-- Top announcement banner
│   │   ├── Navbar.tsx          <-- Responsive header with search & mobile menu
│   │   ├── Hero.tsx            <-- Hero section with brand story & trust badges
│   │   ├── CategoryFilter.tsx  <-- Category selector pills with counts
│   │   ├── ProductCard.tsx     <-- Product card with hover zoom & quick actions
│   │   ├── ProductDetailsModal.tsx <-- Detail view with customization text box
│   │   ├── CartDrawer.tsx      <-- Slide cart with WhatsApp ordering & live preview
│   │   ├── CraftsmanshipSection.tsx <-- Artisan hand-molding story
│   │   ├── CustomGiftingSection.tsx <-- Bespoke wedding favors & bulk hamper inquiries
│   │   ├── TestimonialsSection.tsx  <-- Customer feedback & WhatsApp review link
│   │   ├── InstagramSection.tsx     <-- Instagram studio grid
│   │   ├── Footer.tsx               <-- Footer with care instructions & links
│   │   └── WhatsAppFloatingButton.tsx <-- Floating WhatsApp quick contact
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── tailwind.config.js
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm

### Steps
1. Open your terminal and navigate to the project directory:
   ```bash
   cd claykriti-shop
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## ✏️ How to Customize Your Store

### 1. Change WhatsApp Number & Delivery Policies
Open `src/config/siteConfig.ts`:
```ts
export const siteConfig: SiteConfig = {
  brandName: 'ClayKriti',
  tagline: 'Wrapped in Creativity.',

  // WhatsApp number with country code (91 for India), NO '+' or spaces:
  whatsappNumber: '916280170498',
  whatsappDisplayNumber: '+91 62801 70498',

  // Delivery settings
  deliveryCharge: 70,           // Standard pan-India shipping
  freeDeliveryThreshold: 999,   // Free delivery on orders >= ₹999
  
  // Instagram
  instagramHandle: '@claykriti',
  instagramUrl: 'https://instagram.com/claykriti',
};
```

### 2. Add or Edit Products & Photos
Open `src/data/products.ts`. You can add new products or update existing ones:
```ts
{
  id: 'my-new-piece',
  name: 'Rose Quartz Clay Charm',
  category: 'bag-charms', // one of the 8 category IDs
  price: 349,
  originalPrice: 420,
  images: [
    'https://your-image-url-or-local-path.jpg' // replace with your real photos
  ],
  description: 'Hand-sculpted rose quartz charm with satin finish.',
  badge: 'Bestseller', // or 'Handcrafted', 'Festive Special', 'Customizable'
  inStock: true,
  allowCustomization: true,
  customizationPrompt: 'Enter your preferred initials or ribbon color'
}
```
> **Tip for local images:** Place your image files in `public/products/` and reference them as `'/products/my-photo.jpg'`.

---

## 🌐 How to Deploy Online (Free & Fast)

### Option 1: Deploy on Vercel (Recommended)
1. Push your repository to GitHub, or install the Vercel CLI:
   ```bash
   npm install -g vercel
   vercel
   ```
2. Or go to [vercel.com](https://vercel.com), click **"Add New Project"**, import your GitHub repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**. Your website will be live with a free SSL domain (e.g. `https://claykriti.vercel.app`) in under 60 seconds!

### Option 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and sign in.
2. Drag and drop the `dist/` folder after running `npm run build`, or connect your GitHub repository.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Click **Deploy**.

---

## 🤎 Brand Identity
- **Name**: ClayKriti
- **Tagline**: Wrapped in Creativity.
- **Ordering**: WhatsApp Direct (`916280170498`)
