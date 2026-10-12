import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config/siteConfig';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  onNavigateSection,
}) => {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-clay-ivory/90 backdrop-blur-md border-b border-clay-sand/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Menu Button & Desktop Links */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-clay-charcoal hover:text-terracotta-600 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden md:flex items-center space-x-7 text-sm font-medium tracking-wide text-clay-charcoal/80">
              <button
                onClick={() => handleNavClick('shop-section')}
                className="hover:text-terracotta-600 transition-colors cursor-pointer"
              >
                Catalogue
              </button>
              <button
                onClick={() => handleNavClick('craftsmanship-section')}
                className="hover:text-terracotta-600 transition-colors cursor-pointer"
              >
                Craftsmanship
              </button>
              <button
                onClick={() => handleNavClick('custom-gifting-section')}
                className="hover:text-terracotta-600 transition-colors cursor-pointer"
              >
                Custom Gifts
              </button>
              <button
                onClick={() => handleNavClick('testimonials-section')}
                className="hover:text-terracotta-600 transition-colors cursor-pointer"
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={siteConfig.logoUrl}
              alt="ClayKriti Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm border border-terracotta-200/80 group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-clay-charcoal tracking-tight leading-tight">
                Clay<span className="text-terracotta-600 font-serif italic">Kriti</span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-clay-muted tracking-widest uppercase font-medium">
                Wrapped in Creativity
              </p>
            </div>
          </div>

          {/* Right: Search, WhatsApp Direct, & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Toggle */}
            <div className="relative">
              {showSearch ? (
                <div className="hidden md:flex items-center bg-white border border-terracotta-300 rounded-full px-3 py-1 shadow-sm w-44 sm:w-60 transition-all">
                  <Search className="w-4 h-4 text-clay-muted mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search clay gifts..."
                    className="w-full text-xs text-clay-charcoal bg-transparent focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearch(false);
                    }}
                    className="text-clay-muted hover:text-clay-charcoal ml-1"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-clay-charcoal/80 hover:text-terracotta-600 transition-colors rounded-full hover:bg-clay-blush/60"
                  title="Search items"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Direct WhatsApp link */}
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-full transition-colors"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{siteConfig.whatsappDisplayNumber}</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-800 rounded-full transition-all border border-terracotta-200/60 shadow-sm flex items-center gap-2 group"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-terracotta-600 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-terracotta-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (when expanded on small screen) */}
        {showSearch && (
          <div className="pb-3 flex md:hidden">
            <div className="flex items-center bg-white border border-terracotta-300 rounded-lg px-3 py-2 shadow-sm w-full">
              <Search className="w-4 h-4 text-clay-muted mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clay gifts, tealights, keychains..."
                className="w-full text-sm text-clay-charcoal bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-xs text-clay-muted mr-2">
                  Clear
                </button>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearch(false);
                }}
                className="text-clay-muted hover:text-clay-charcoal"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-clay-ivory border-b border-clay-sand px-6 py-5 space-y-4 animate-fade-in shadow-xl max-h-screen overflow-y-auto">
          <div className="space-y-3 font-medium text-clay-charcoal">
            <button
              onClick={() => handleNavClick('shop-section')}
              className="block w-full text-left py-2 text-base hover:text-terracotta-600 border-b border-clay-blush"
            >
              🛍️ All Products & Categories
            </button>
            <button
              onClick={() => handleNavClick('craftsmanship-section')}
              className="block w-full text-left py-2 text-base hover:text-terracotta-600 border-b border-clay-blush"
            >
              🏺 The Handcrafted Story
            </button>
            <button
              onClick={() => handleNavClick('custom-gifting-section')}
              className="block w-full text-left py-2 text-base hover:text-terracotta-600 border-b border-clay-blush"
            >
              🎁 Custom & Bulk Favors
            </button>
            <button
              onClick={() => handleNavClick('testimonials-section')}
              className="block w-full text-left py-2 text-base hover:text-terracotta-600 border-b border-clay-blush"
            >
              💬 Genuine Customer Reviews
            </button>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white font-medium rounded-xl text-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({siteConfig.whatsappDisplayNumber})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
