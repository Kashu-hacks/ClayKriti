import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Clock,
  Heart,
} from 'lucide-react';
import { Product } from '../types';
import { formatCurrency, getWhatsAppInquiryUrl } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  const { addItem, openCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customizationText, setCustomizationText] = useState('');

  const handleAddToCart = () => {
    addItem(product, quantity, customizationText);
    onClose();
    openCart(); // Smoothly open the slide cart drawer so they see their item added!
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-clay-charcoal/60 backdrop-blur-sm animate-fade-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative w-full max-w-4xl bg-clay-ivory rounded-3xl shadow-2xl border border-clay-sand overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-clay-charcoal hover:text-terracotta-700 shadow-sm transition-all"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-clay-blush/40 border border-clay-sand shadow-inner relative">
                <ProductImage
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  productId={product.id}
                  categoryName={product.category.replace('-', ' ')}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-terracotta-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails if multiple images exist */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImage === idx
                          ? 'border-terracotta-600 scale-105 shadow-sm'
                          : 'border-clay-stone/60 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Artisan Note */}
              <div className="p-4 bg-clay-blush/60 rounded-2xl border border-terracotta-200/50 text-xs text-clay-charcoal/80 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-terracotta-800">
                  <Heart className="w-3.5 h-3.5 fill-terracotta-600 text-terracotta-600" />
                  <span>Artisan's Handcrafted Note</span>
                </div>
                <p>
                  Because each piece is sculpted and painted by hand, subtle organic textures and nuances make your piece genuinely one-of-a-kind.
                </p>
              </div>
            </div>

            {/* Right: Product Details & Controls */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-terracotta-700 font-semibold">
                  {product.category.replace('-', ' ')}
                </p>
                <h2
                  id="product-modal-title"
                  className="text-2xl sm:text-3xl font-serif font-bold text-clay-charcoal mt-1"
                >
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex flex-wrap items-baseline gap-3 mt-3">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-terracotta-700">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-clay-muted line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                    In Stock & Handcrafted to Order
                  </span>
                </div>

                {/* Description */}
                <div className="mt-4 text-sm text-clay-charcoal/90 leading-relaxed space-y-2">
                  <p>{product.description}</p>
                </div>

                {/* Key Specifications */}
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-clay-sand">
                  {product.dimensions && (
                    <div>
                      <span className="text-clay-muted block">Dimensions:</span>
                      <span className="font-medium text-clay-charcoal">{product.dimensions}</span>
                    </div>
                  )}
                  {product.materials && (
                    <div>
                      <span className="text-clay-muted block">Materials:</span>
                      <span className="font-medium text-clay-charcoal">{product.materials}</span>
                    </div>
                  )}
                  <div className="col-span-2 flex items-center gap-1.5 text-clay-muted pt-1 border-t border-clay-sand/50">
                    <Clock className="w-3.5 h-3.5 text-terracotta-600" />
                    <span>Dispatched in <strong>{product.leadTimeDays || 2}–3 business days</strong> from our studio.</span>
                  </div>
                </div>

                {/* Customization Input if applicable */}
                {product.allowCustomization && (
                  <div className="mt-5 p-4 bg-terracotta-50/70 border border-terracotta-200 rounded-2xl space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-terracotta-900">
                      <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
                      <span>Customization / Personalization Details:</span>
                    </label>
                    <textarea
                      value={customizationText}
                      onChange={(e) => setCustomizationText(e.target.value)}
                      placeholder={
                        product.customizationPrompt ||
                        'Enter your desired names, initials, favorite color theme, or special instructions here...'
                      }
                      rows={2}
                      className="w-full text-xs p-2.5 rounded-xl bg-white border border-terracotta-300 focus:outline-none focus:ring-2 focus:ring-terracotta-400 text-clay-charcoal placeholder:text-clay-muted/70"
                    />
                    <p className="text-[11px] text-terracotta-700/80">
                      These details will be included in your WhatsApp order message for the artisan to review!
                    </p>
                  </div>
                )}
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-4 pt-4 border-t border-clay-sand">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-clay-charcoal">Quantity:</span>
                  <div className="flex items-center border border-clay-stone bg-white rounded-full p-1 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-clay-blush text-clay-charcoal transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-clay-charcoal">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-clay-blush text-clay-charcoal transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold rounded-2xl shadow-warm hover:shadow-warm-hover transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatCurrency(product.price * quantity)})</span>
                  </button>

                  <a
                    href={getWhatsAppInquiryUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium rounded-2xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm text-center"
                    title="Direct WhatsApp Question"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
