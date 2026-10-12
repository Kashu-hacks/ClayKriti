import React from 'react';
import { ArrowRight, HeartHandshake, ShieldCheck, Truck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { InstagramIcon } from './InstagramIcon';

interface HeroProps {
  onShopClick: () => void;
  onCustomClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onCustomClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-clay-blush/60 via-clay-ivory to-clay-ivory py-12 sm:py-20 lg:py-24 border-b border-clay-sand/40">
      
      {/* Decorative organic background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-terracotta-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-clay-sand/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-terracotta-200 text-terracotta-900 text-xs sm:text-sm font-medium tracking-wide shadow-sm">
              <img src={siteConfig.logoUrl} alt="ClayKriti" className="w-5 h-5 rounded-full object-cover shrink-0 border border-terracotta-300" />
              <span>Little Things, Made With Love</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-clay-charcoal leading-[1.15] tracking-tight">
              Handcrafted with Love,{' '}
              <span className="italic font-serif text-terracotta-600 underline decoration-terracotta-300 decoration-wavy decoration-1 underline-offset-8">
                Wrapped in Creativity.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-clay-muted max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Welcome to <strong className="text-clay-charcoal font-semibold">{siteConfig.brandName}</strong>. 
              We sculpt intimate clay keychains, festive tealights, whimsical bag charms, and bespoke gift hampers designed to turn everyday moments into cherished keepsakes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 bg-terracotta-600 hover:bg-terracotta-700 text-white font-medium rounded-full shadow-warm-lg hover:shadow-warm-hover transition-all duration-300 flex items-center justify-center gap-2.5 text-base group cursor-pointer"
              >
                <span>Shop Handcrafted Pieces</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onCustomClick}
                className="w-full sm:w-auto px-7 py-4 bg-white/80 hover:bg-white text-clay-charcoal border border-clay-stone hover:border-terracotta-400 font-medium rounded-full shadow-sm transition-all duration-300 text-base cursor-pointer"
              >
                Custom Gifts & Favors
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-8 border-t border-clay-sand/80 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 text-terracotta-700" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-clay-charcoal">100% Handcrafted</h4>
                  <p className="text-[10px] text-clay-muted">Molded with clay</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-terracotta-700" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-clay-charcoal">Pan-India Ship</h4>
                  <p className="text-[10px] text-clay-muted">Safe packaging</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-terracotta-700" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-clay-charcoal">WhatsApp Order</h4>
                  <p className="text-[10px] text-clay-muted">Personalized care</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Official Brand Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Official Brand Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border-4 border-white aspect-square bg-gradient-to-b from-clay-blush/80 via-white to-clay-cream/80 p-6 flex flex-col items-center justify-center text-center">
                
                {/* Floating Artisan Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-clay-sand flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-clay-charcoal">Studio Open for Orders</span>
                </div>

                {/* Central Brand Logo Emblem */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-warm-lg border-4 border-white/90 bg-white p-2 transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={siteConfig.logoUrl}
                    alt="ClayKriti - Wrapped in Creativity"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Tagline Badge */}
                <div className="mt-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full border border-terracotta-200/60 shadow-sm">
                  <p className="text-xs font-serif font-bold text-terracotta-700 tracking-wide">
                    {siteConfig.brandName} • {siteConfig.tagline}
                  </p>
                </div>
              </div>

              {/* Overlapping Official Instagram Connect Card */}
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-warm-lg border border-terracotta-200/80 items-center gap-3 hover:scale-105 transition-transform group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <InstagramIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-clay-charcoal leading-tight group-hover:text-terracotta-600 transition-colors">
                    Official Instagram
                  </p>
                  <p className="text-[10px] text-terracotta-700 font-medium">{siteConfig.instagramHandle}</p>
                  <p className="text-[9px] text-clay-muted">See reels & real drops</p>
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
