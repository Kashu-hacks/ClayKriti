import React from 'react';
import { MessageCircle, Heart, Mail, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { siteConfig } from '../config/siteConfig';
import { CATEGORIES } from '../data/products';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateSection,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-clay-dark text-clay-sand pt-16 pb-12 border-t border-clay-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-clay-muted/30">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={siteConfig.logoUrl}
                alt="ClayKriti Logo"
                className="w-12 h-12 rounded-full object-cover border border-clay-stone/40 shrink-0"
              />
              <div>
                <span className="text-2xl font-serif font-bold text-white tracking-tight">
                  Clay<span className="text-terracotta-400 italic">Kriti</span>
                </span>
                <p className="text-[10px] text-clay-stone tracking-widest uppercase font-medium">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs text-clay-sand/70 max-w-sm leading-relaxed">
              An independent studio dedicated to the art of handmade clay creations. From pocket charms to festive decor, every piece is sculpted by hand with warmth and patience.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-clay-sand/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
                <span>Handcrafted in {siteConfig.city}, {siteConfig.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: {siteConfig.whatsappDisplayNumber}</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
              Handcrafted Collections
            </h4>
            <ul className="space-y-2 text-xs text-clay-sand/70">
              {CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onNavigateSection('shop-section');
                    }}
                    className="hover:text-terracotta-300 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories & Custom Gifting */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
              Bespoke & Festivities
            </h4>
            <ul className="space-y-2 text-xs text-clay-sand/70">
              {CATEGORIES.slice(6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onNavigateSection('shop-section');
                    }}
                    className="hover:text-terracotta-300 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigateSection('custom-gifting-section')}
                  className="hover:text-terracotta-300 transition-colors text-left"
                >
                  Wedding & Bulk Favors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('craftsmanship-section')}
                  className="hover:text-terracotta-300 transition-colors text-left"
                >
                  Our Handcrafting Process
                </button>
              </li>
            </ul>
          </div>

          {/* Clay Care & Delivery Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
              Care & Ordering
            </h4>
            <ul className="space-y-2 text-xs text-clay-sand/70 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <Truck className="w-3.5 h-3.5 text-terracotta-400 mt-0.5 shrink-0" />
                <span>Pan-India delivery (Free above ₹{siteConfig.freeDeliveryThreshold}).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-terracotta-400 mt-0.5 shrink-0" />
                <span>Clean gently with dry microfiber cloth. Keep away from harsh chemicals.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Orders confirmed manually on WhatsApp after availability check.</span>
              </li>
              <li className="pt-1 flex flex-col space-y-1 text-xs">
                <button
                  onClick={onOpenTerms}
                  className="hover:text-terracotta-300 transition-colors text-left cursor-pointer underline text-[11px]"
                >
                  Shipping, Terms & Returns
                </button>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-terracotta-300 transition-colors text-left cursor-pointer underline text-[11px]"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-clay-sand/50 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>

          <div className="flex items-center space-x-3 text-clay-sand/70">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-terracotta-300 transition-colors text-left cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-terracotta-300 transition-colors text-left cursor-pointer"
            >
              Shipping & Returns
            </button>
          </div>

          <p className="flex items-center gap-1.5 text-clay-sand/60">
            <span>Hand-sculpted with</span>
            <Heart className="w-3.5 h-3.5 fill-terracotta-500 text-terracotta-500" />
            <span>in India</span>
          </p>

          <div className="flex items-center space-x-4">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
