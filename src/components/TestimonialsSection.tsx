import React from 'react';
import { Star, MessageCircle, Heart } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface Review {
  name: string;
  location: string;
  itemPurchased: string;
  date: string;
  rating: number;
  comment: string;
}

export const TESTIMONIALS: Review[] = [
  {
    name: 'Ananya S.',
    location: 'New Delhi',
    itemPurchased: 'Lotus Blossom Tealight & Shagun Envelopes',
    date: 'Diwali Gifting',
    rating: 5,
    comment:
      'The lotus tealight holder looks so divine in person. The packaging was immaculate with dried petals and sweet wrapping — my sister was overjoyed receiving it. Ordering directly on WhatsApp was surprisingly swift!',
  },
  {
    name: 'Meera & Rohan',
    location: 'Bangalore',
    itemPurchased: 'Personalized Couple Nameplate',
    date: 'Housewarming Gift',
    rating: 5,
    comment:
      'We asked for an earthy terracotta plaque with our wedding year. The artisan sent progress updates and the finished piece now hangs right by our front door. Truly wrapped in creativity!',
  },
  {
    name: 'Tanya K.',
    location: 'Chandigarh',
    itemPurchased: 'Macaron Bag Charm & Bookshelf Keychain',
    date: 'Birthday Treat',
    rating: 5,
    comment:
      'Tiny details on the miniature books blew my mind! You can tell so much love goes into handcrafting each piece. Will definitely come back for festive hampers.',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials-section" className="scroll-mt-24 py-16 sm:py-24 bg-white border-b border-clay-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clay-blush text-terracotta-800 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-terracotta-600 text-terracotta-600" />
            <span>Customer Words</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-clay-charcoal">
            Loved Across Homes
          </h2>
          <p className="text-sm sm:text-base text-clay-muted">
            Heartfelt impressions from customers who brought our handcrafted clay art into their celebrations.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, idx) => (
            <div
              key={idx}
              className="bg-clay-ivory/60 hover:bg-clay-ivory p-6 sm:p-7 rounded-2xl border border-clay-sand hover:border-terracotta-300 shadow-sm hover:shadow-warm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-clay-charcoal/90 italic leading-relaxed">
                  “{review.comment}”
                </p>
              </div>

              <div className="pt-3 border-t border-clay-sand/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-clay-charcoal">{review.name}</h4>
                  <p className="text-[10px] text-clay-muted">{review.location} • {review.date}</p>
                </div>
                <span className="text-[10px] bg-terracotta-100/70 text-terracotta-800 px-2 py-0.5 rounded-md font-medium">
                  {review.itemPurchased.split('&')[0].trim()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Share your feedback prompt */}
        <div className="mt-12 text-center">
          <p className="text-xs text-clay-muted inline-flex items-center gap-1.5">
            <span>Own a ClayKriti piece?</span>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                'Hello ClayKriti! I wanted to share a photo and feedback for my handcrafted piece:'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3 text-emerald-600" />
              <span>Send us your photo & review on WhatsApp</span>
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
