import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface ProductImageProps {
  src?: string | null;
  alt: string;
  productId: string;
  categoryName?: string;
  className?: string;
  aspectClass?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  productId,
  categoryName = 'Handmade',
  className = 'w-full h-full object-cover',
  aspectClass = 'aspect-square',
}) => {
  const [imageError, setImageError] = useState(false);
  const hasValidSrc = Boolean(src && src.trim() && !imageError);

  if (hasValidSrc) {
    return (
      <img
        src={src!}
        alt={alt}
        onError={(e) => {
          setImageError(true);
          const target = e.currentTarget;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.style.backgroundColor = '#f5ede8';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
          }
        }}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // Boutique Artisanal Placeholder (Elegant, Luxury Studio Aesthetic — NO Clutter or Debug Text)
  return (
    <div
      title={`Product Photo: /public/products/${productId}.jpg`}
      className={`w-full ${aspectClass} bg-gradient-to-b from-[#FAF5F0] via-[#F5ECE3] to-[#EFE4D7] flex flex-col items-center justify-center p-5 text-center select-none relative overflow-hidden group transition-all`}
    >
      {/* Delicate organic background ring */}
      <div className="absolute inset-4 rounded-2xl border border-terracotta-200/40 pointer-events-none" />

      {/* Central Artisan Logo Emblem */}
      <div className="relative z-10 flex flex-col items-center space-y-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-warm border-2 border-white bg-white p-1 transform group-hover:scale-105 transition-transform duration-300">
          <img
            src="/logo.jpg"
            alt="ClayKriti Studio"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="space-y-0.5">
          <p className="text-[10px] sm:text-xs font-serif italic text-terracotta-700 tracking-wide font-medium">
            Handcrafted with Love
          </p>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/80 border border-terracotta-200/60 shadow-sm">
            <Camera className="w-3 h-3 text-terracotta-600" />
            <span className="text-[9px] sm:text-[10px] font-medium text-clay-charcoal">
              Photo Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Subtle hover tooltip for store owner indicating the exact file to drop */}
      <div className="absolute bottom-2 inset-x-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
        <span className="text-[9px] font-mono text-clay-charcoal bg-white/95 px-2 py-0.5 rounded-md shadow-sm border border-terracotta-200/80">
          Add photo: products/{productId}.jpg
        </span>
      </div>
    </div>
  );
};
