import React, { useState, useMemo } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { CustomGiftingSection } from './components/CustomGiftingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Toast } from './components/Toast';
import { PolicyModal } from './components/PolicyModal';

import { PRODUCTS, CATEGORIES } from './data/products';
import { Product, CategoryType } from './types';
import { Sparkles, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'bestseller' | 'price-low' | 'price-high'>('featured');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      all: PRODUCTS.length,
      'keychains': 0,
      'bag-charms': 0,
      'magnets': 0,
      'shagun-items': 0,
      'festive-decor': 0,
      'tealight-holders': 0,
      'gift-hampers': 0,
      'customised-gifts': 0,
      'home-decor': 0,
    };
    PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.materials && product.materials.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    // Sorting
    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'bestseller':
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      default:
        // 'featured'
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // Featured / Bestseller spotlight items for curated row
  const bestsellers = useMemo(() => {
    return PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-clay-ivory flex flex-col font-sans">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Sticky Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigateSection={scrollToSection}
      />

      {/* Hero Section */}
      <Hero
        onShopClick={() => scrollToSection('shop-section')}
        onCustomClick={() => scrollToSection('custom-gifting-section')}
      />

      {/* Bestseller Highlights Strip */}
      <section className="py-12 bg-clay-blush/30 border-b border-clay-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-terracotta-700 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Most Adored Pieces</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-clay-charcoal mt-1">
                Studio Bestsellers
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('bestseller');
                scrollToSection('shop-section');
              }}
              className="text-xs sm:text-sm font-semibold text-terracotta-700 hover:text-terracotta-900 underline self-start cursor-pointer"
            >
              View all bestsellers
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(p) => setModalProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Shop / Catalogue Section */}
      <section id="shop-section" className="scroll-mt-24 py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        {/* Category Navigation Pills */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          categoryCounts={categoryCounts}
        />

        {/* Filters & Sorting Bar */}
        <div className="mt-8 pt-6 border-t border-clay-sand flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-clay-muted">
            <span className="font-medium text-clay-charcoal">
              Showing {filteredProducts.length} handcrafted {filteredProducts.length === 1 ? 'piece' : 'pieces'}
            </span>
            {selectedCategory !== 'all' && (
              <span className="bg-clay-sand px-2 py-0.5 rounded-full text-clay-charcoal font-medium">
                {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
              </span>
            )}
            {searchQuery && (
              <span className="bg-terracotta-100 text-terracotta-800 px-2 py-0.5 rounded-full font-medium">
                "{searchQuery}"
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-clay-muted">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-clay-sand rounded-xl px-3 py-1.5 text-clay-charcoal focus:outline-none focus:ring-1 focus:ring-terracotta-500 font-medium"
            >
              <option value="featured">Featured & Artisan Picks</option>
              <option value="bestseller">Customer Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white/60 rounded-3xl border border-clay-sand mt-8">
            <div className="w-16 h-16 rounded-full bg-clay-blush mx-auto flex items-center justify-center text-clay-muted">
              <Search className="w-8 h-8 opacity-40" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-clay-charcoal">
                No creations found
              </h3>
              <p className="text-xs sm:text-sm text-clay-muted max-w-sm mx-auto">
                We couldn't find any pieces matching your current filters. Try searching for something else or view all pieces.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold rounded-full shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(p) => setModalProduct(p)}
              />
            ))}
          </div>
        )}

      </section>

      {/* Craftsmanship Section */}
      <CraftsmanshipSection />

      {/* Custom Gifting Section */}
      <CustomGiftingSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Instagram Studio Showcase */}
      <InstagramSection />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onNavigateSection={scrollToSection}
        onOpenPrivacy={() => setShowPrivacy(true)}
        onOpenTerms={() => setShowTerms(true)}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Floating Boutique WhatsApp Widget */}
      <WhatsAppFloatingButton />

      {/* Toast notifications */}
      <Toast />

      {/* Privacy Policy Modal */}
      <PolicyModal isOpen={showPrivacy} title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
        <p className="text-xs text-clay-muted">Last updated: October 2025</p>
        <p>ClayKriti is a small handmade goods studio. We take your privacy seriously and keep things simple and honest.</p>
        <h3 className="font-semibold">What data we collect</h3>
        <p>When you place an order, you type your name, phone number, and delivery address into the checkout form. This information is sent directly to us via WhatsApp — only when <em>you</em> choose to tap Send. We do not collect or store this data on any server.</p>
        <h3 className="font-semibold">Your cart</h3>
        <p>Your cart items (product IDs and quantities) are saved in your browser's localStorage so your cart survives a page refresh. This data never leaves your device and is not sent to us unless you place an order via WhatsApp.</p>
        <h3 className="font-semibold">No accounts, no tracking, no cookies</h3>
        <p>This site has no user accounts, no login, no analytics, no tracking pixels, and no advertising cookies. We do not sell or share your data with anyone.</p>
        <h3 className="font-semibold">Third-party services</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>WhatsApp (Meta):</strong> When you tap the WhatsApp button, you are redirected to WhatsApp. Meta's privacy policy applies to that interaction.</li>
          <li><strong>Instagram (Meta):</strong> Our Instagram links open Instagram. Meta's privacy policy applies.</li>
          <li><strong>Google Fonts:</strong> This site loads fonts from fonts.googleapis.com. Google may log your IP address per their privacy policy.</li>
        </ul>
        <h3 className="font-semibold">Data deletion</h3>
        <p>Since we don't store your personal data on a server, there is nothing for us to delete. If you shared an order via WhatsApp and want us to delete the conversation, please contact us on WhatsApp or Instagram and we will do so promptly.</p>
        <h3 className="font-semibold">Contact</h3>
        <p>Questions? Reach us on WhatsApp or Instagram at @clay__kriti.</p>
      </PolicyModal>

      {/* Terms & Shipping Modal */}
      <PolicyModal isOpen={showTerms} title="Terms, Shipping & Returns" onClose={() => setShowTerms(false)}>
        <p className="text-xs text-clay-muted">Last updated: October 2025</p>
        <h3 className="font-semibold">Handmade products</h3>
        <p>All ClayKriti products are handmade to order. Slight variations in colour, texture, and finish are natural and part of what makes each piece unique.</p>
        <h3 className="font-semibold">Ordering</h3>
        <p>Orders are placed via WhatsApp. After you send your order message, we will confirm availability, handcrafting timeline, and payment details on WhatsApp.</p>
        <h3 className="font-semibold">Payment</h3>
        <p>Payment is arranged directly on WhatsApp after we confirm your order. We accept UPI and bank transfer.</p>
        <h3 className="font-semibold">Pricing</h3>
        <p>All prices are in Indian Rupees (₹). Delivery charges are shown at checkout. Free delivery on orders above ₹999.</p>
        <h3 className="font-semibold">Delivery</h3>
        <p>We ship pan-India via standard courier. [PLACEHOLDER: Estimated delivery time — please update in siteConfig and here.]</p>
        <h3 className="font-semibold">Returns & Exchanges</h3>
        <p>We want you to love your order. If there is a quality issue or damage in transit, please contact us on WhatsApp within [PLACEHOLDER: X days of receiving your order] with photos and we will resolve it.</p>
        <p>Custom/personalised items are non-refundable unless defective.</p>
        <h3 className="font-semibold">Cancellations</h3>
        <p>You may cancel before we begin crafting your order. Please contact us on WhatsApp as soon as possible.</p>
        <h3 className="font-semibold">Contact</h3>
        <p>WhatsApp or Instagram @clay__kriti for any questions.</p>
      </PolicyModal>
    </div>
  );
};
