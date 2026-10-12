import React from 'react';
import { Sparkles, Heart, Feather, ShieldCheck } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Hand-Sculpted With Care',
      desc: 'No machine casts or mass production. Every petal, miniature tea glass, and shagun motif is sculpted from raw clay by hand.',
      icon: Feather,
    },
    {
      step: '02',
      title: 'Baked & Cured to Last',
      desc: 'Our pieces undergo precision temperature curing to ensure structural longevity while remaining delightfully lightweight.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Artisan Glazing & Sealing',
      desc: 'Each creation is sealed with high-grade protective UV resin or matte earthenware lacquer to safeguard against moisture and daily use.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Wrapped in Creativity',
      desc: 'Packed in eco-conscious aesthetic paper boxes with botanical twine, wax seals, and handwritten personal notes ready to gift.',
      icon: Heart,
    },
  ];

  return (
    <section id="craftsmanship-section" className="scroll-mt-24 py-16 sm:py-24 bg-white border-y border-clay-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clay-blush text-terracotta-800 text-xs font-semibold tracking-wider uppercase">
            <span>The Handcrafted Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-clay-charcoal">
            The Art & Soul Behind ClayKriti
          </h2>
          <p className="text-sm sm:text-base text-clay-muted leading-relaxed font-normal">
            In a world of factory-made trinkets, we choose the slow beauty of clay.
            Each piece reflects hours of careful molding, delicate brushstrokes, and personal devotion.
          </p>
        </div>

        {/* 4 Process Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-clay-ivory/60 hover:bg-clay-ivory p-6 sm:p-7 rounded-2xl border border-clay-sand hover:border-terracotta-300 transition-all duration-300 space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-clay-blush flex items-center justify-center text-terracotta-600 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-serif font-bold text-clay-stone/70">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-clay-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-clay-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Quote Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-clay-blush via-clay-cream to-clay-blush border border-terracotta-200/60 text-center space-y-2 max-w-3xl mx-auto">
          <p className="font-serif italic text-base sm:text-lg text-terracotta-900">
            “We don’t just create gifts — we mold memories into enduring, tactile treasures you can hold forever.”
          </p>
          <p className="text-xs uppercase tracking-widest text-clay-muted font-medium">
            — Studio ClayKriti
          </p>
        </div>

      </div>
    </section>
  );
};
