import React, { useState } from 'react';
import { ArrowUpRight, Play, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { siteConfig } from '../config/siteConfig';

interface InstagramPostCard {
  id: string;
  image?: string;
  category: string;
  title: string;
  subtitle: string;
  reelUrl: string;
}

const INSTAGRAM_CARDS: InstagramPostCard[] = [
  {
    id: 'post-1',
    category: 'Clay Keychains',
    title: 'Floral Petal Sculpting',
    subtitle: 'Watch reel on Instagram 🎥',
    reelUrl: 'https://www.instagram.com/reel/Dc6oGOLTUp6/?stkn=MXZjN3lsc3BhbDA4OA==',
    image: '/products/kc-01.jpeg',
  },
  {
    id: 'post-2',
    category: 'Diwali Tealights',
    title: 'Lotus Diya In The Making',
    subtitle: 'See real drops & glow 🪔',
    reelUrl: 'https://www.instagram.com/reel/DcwMbQETzIN/?stkn=MTBoNW1keGg2OHNrYw==',
    image: '/products/tlt-01.jpeg',
  },
  {
    id: 'post-3',
    category: 'Bag Charms',
    title: 'Pastel Macaron Trio',
    subtitle: 'Tote charm styling reel ✨',
    reelUrl: 'https://www.instagram.com/reel/DcROO6MzZyn/?stkn=MTRsdnFwZDd4cDBvNg==',
    image: '/products/bc-01.jpeg',
  },
  {
    id: 'post-4',
    category: 'Handmade Hampers',
    title: 'Festive Box Packaging',
    subtitle: 'Behind the scenes wrapping 🎁',
    reelUrl: 'https://www.instagram.com/reel/Da8h-ySzYjD/?stkn=czFxejk5ZDQwcXRp',
    image: '/products/shg-01c.jpeg',
  },
  {
    id: 'post-5',
    category: 'Custom Gifts',
    title: 'Personalized Nameplates',
    subtitle: 'Artisan hand-carving video 🌿',
    reelUrl: 'https://www.instagram.com/reel/DdRwOZDTcbX/?stkn=MXJoMW4wbzk0MXFrNQ==',
    image: '/products/shg-01a.jpeg',
  },
  {
    id: 'post-6',
    category: 'Shagun Keepsakes',
    title: 'Embossed Clay Envelopes',
    subtitle: 'Royal festive details 🌸',
    reelUrl: 'https://www.instagram.com/reel/DcEcAvQzF-F/?stkn=ZmttNWRkdm42ODd1',
    image: '/products/shg-01b.jpeg',
  },
];

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-clay-ivory border-b border-clay-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta-700 uppercase tracking-widest mb-1">
              <InstagramIcon className="w-3.5 h-3.5 text-rose-500" />
              <span>Real Handmade Drops & Reels</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-clay-charcoal">
              Watch on Instagram
            </h2>
            <p className="text-xs sm:text-sm text-clay-muted">
              Explore real product videos, custom molding behind-the-scenes, and recent drops at{' '}
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-terracotta-700 hover:underline"
              >
                {siteConfig.instagramHandle}
              </a>
            </p>
          </div>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-clay-blush border border-clay-sand hover:border-terracotta-300 text-xs font-semibold text-clay-charcoal shadow-sm transition-all self-start group"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0">
              <InstagramIcon className="w-2.5 h-2.5 text-white" />
            </div>
            <span>Follow {siteConfig.instagramHandle}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-clay-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Real Product Instagram Discovery Cards (NO STOCK IMAGES) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_CARDS.map((card) => (
            <a
              key={card.id}
              href={card.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white via-clay-blush/60 to-clay-cream/80 border border-terracotta-200/80 p-3.5 flex flex-col justify-between shadow-sm hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top: Category Tag & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-terracotta-700 bg-white/80 px-2 py-0.5 rounded-full border border-terracotta-200/50">
                  {card.category}
                </span>
                <div className="w-6 h-6 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-2.5 h-2.5 fill-rose-600" />
                </div>
              </div>

              {/* Center: Product Image or Text */}
              {card.image ? (
                <div className="my-auto flex-1 flex items-center justify-center overflow-hidden rounded-lg -mx-1">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="my-auto text-center py-1">
                  <p className="font-serif font-bold text-xs text-clay-charcoal group-hover:text-terracotta-700 transition-colors leading-tight">
                    {card.title}
                  </p>
                  <p className="text-[10px] text-clay-muted mt-1 leading-tight">
                    {card.subtitle}
                  </p>
                </div>
              )}

              {/* Bottom: Instagram Action Indicator */}
              <div className="pt-2 border-t border-terracotta-200/50 flex items-center justify-between text-[9px] font-medium text-terracotta-800">
                <span>View on Reels</span>
                <ExternalLink className="w-3 h-3 text-clay-muted group-hover:text-terracotta-600 transition-colors" />
              </div>
            </a>
          ))}
        </div>

        {/* Brand Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-white/80 border border-clay-sand flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img
              src={siteConfig.logoUrl}
              alt="ClayKriti"
              className="w-10 h-10 rounded-full object-cover border border-terracotta-200 shadow-sm shrink-0"
            />
            <div>
              <p className="text-xs font-serif font-bold text-clay-charcoal">
                Handcrafted Exclusively by ClayKriti
              </p>
              <p className="text-[10px] text-clay-muted">
                Each product is uniquely molded. Check our Instagram stories for today's studio batches!
              </p>
            </div>
          </div>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-xl text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Open @clay__kriti on Instagram
          </a>
        </div>

      </div>
    </section>
  );
};
