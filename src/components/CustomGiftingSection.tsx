import React from 'react';
import { Gift, HeartHandshake, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppCustomGiftUrl } from '../utils/whatsapp';
import { siteConfig } from '../config/siteConfig';

export const CustomGiftingSection: React.FC = () => {
  const occasions = [
    {
      title: 'Wedding & Mehendi Favors',
      desc: 'Custom clay floral charms, personalized shagun envelopes & souvenir coin holders matching your wedding invitation palette.',
      tag: 'Bespoke Favors',
      sampleWa: 'Weddings & Mehendi Favors',
    },
    {
      title: 'Festive & Diwali Corporate Hampers',
      desc: 'Eco-conscious handcrafted tealight hampers with artisan clay diyas, brass touches & branded message sleeves for clients & teams.',
      tag: 'Festive Hampers',
      sampleWa: 'Diwali Corporate Hampers',
    },
    {
      title: 'Baby Shower & Birthday Tokens',
      desc: 'Adorable custom miniature magnets, personalized nameplate charms, and sweet keepsake tokens molded with birth dates & names.',
      tag: 'Milestone Tokens',
      sampleWa: 'Baby Shower / Birthday Keepsakes',
    },
  ];

  return (
    <section id="custom-gifting-section" className="scroll-mt-24 py-16 sm:py-24 bg-clay-blush/40 border-b border-clay-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-semibold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Bespoke & Bulk Orders</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-clay-charcoal leading-tight">
              Crafting for Life’s Most Meaningful Celebrations
            </h2>

            <p className="text-sm sm:text-base text-clay-muted leading-relaxed font-normal">
              Looking for personalized return gifts, corporate festive hampers, or bespoke wedding favors?
              We work directly with you on color themes, initials, custom packaging, and custom batch sizes.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-clay-charcoal font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600"></span>
                <span>Tiered bulk pricing for 15+ pieces</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-clay-charcoal font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600"></span>
                <span>Personalized handwritten calligraphy note cards</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-clay-charcoal font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600"></span>
                <span>Safe pan-India courier packaging</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={getWhatsAppCustomGiftUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-warm hover:shadow-warm-lg transition-all text-sm group"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Discuss Custom Gifting on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-[11px] text-clay-muted mt-2">
                Replies usually within 2–4 hours during studio hours.
              </p>
            </div>
          </div>

          {/* Right Column: Occasion Cards */}
          <div className="lg:col-span-7 space-y-4">
            {occasions.map((occ, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-clay-sand hover:border-terracotta-300 shadow-warm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 max-w-md">
                  <span className="text-[10px] font-semibold text-terracotta-600 uppercase tracking-widest bg-terracotta-50 px-2 py-0.5 rounded-md">
                    {occ.tag}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-clay-charcoal group-hover:text-terracotta-700 transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-clay-muted leading-relaxed">
                    {occ.desc}
                  </p>
                </div>

                <a
                  href={getWhatsAppCustomGiftUrl(occ.sampleWa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-clay-ivory hover:bg-emerald-50 text-clay-charcoal hover:text-emerald-800 text-xs font-semibold rounded-xl border border-clay-sand hover:border-emerald-300 transition-colors shrink-0 self-start sm:self-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inquire Now</span>
                </a>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
