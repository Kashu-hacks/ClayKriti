import React from 'react';
import { Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If product requires mandatory customization, open the detail modal instead
    if (product.allowCustomization) {
      onViewDetails(product);
    } else {
      addItem(product, 1);
    }
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group bg-white rounded-2xl overflow-hidden border border-clay-sand hover:border-terracotta-300 shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square overflow-hidden bg-clay-blush/40">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          productId={product.id}
          categoryName={product.category.replace('-', ' ')}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badge (Bestseller, Festive, etc.) */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                product.badge === 'Bestseller'
                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                  : product.badge === 'Festive Special'
                  ? 'bg-rose-100 text-rose-900 border border-rose-200'
                  : product.badge === 'Customizable'
                  ? 'bg-terracotta-100 text-terracotta-900 border border-terracotta-200'
                  : 'bg-clay-ivory text-clay-charcoal border border-clay-stone'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Customization Available Tag */}
        {product.allowCustomization && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-medium text-terracotta-700 flex items-center gap-1 shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Personalizable</span>
          </div>
        )}

        {/* Quick View Button on desktop hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            aria-label={`View details for ${product.name}`}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white/95 text-clay-charcoal rounded-full text-xs font-semibold shadow-lg hover:bg-terracotta-600 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <p className="text-[11px] text-clay-muted uppercase tracking-wider font-medium">
            {product.category.replace('-', ' ')}
          </p>
          <h3 className="font-serif font-bold text-sm sm:text-base text-clay-charcoal group-hover:text-terracotta-700 transition-colors line-clamp-2 mt-0.5">
            {product.name}
          </h3>
          <p className="text-xs text-clay-muted line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2.5 border-t border-clay-sand/60 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base sm:text-lg font-serif font-bold text-clay-charcoal whitespace-nowrap">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-clay-muted line-through whitespace-nowrap">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-clay-sageDark font-medium">Handcrafted to order</p>
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
              product.allowCustomization
                ? 'bg-clay-blush text-terracotta-800 hover:bg-terracotta-600 hover:text-white'
                : 'bg-terracotta-600 hover:bg-terracotta-700 text-white'
            }`}
            title={product.allowCustomization ? 'Customize & Add' : 'Add to Cart'}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {product.allowCustomization ? 'Customize' : 'Add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
