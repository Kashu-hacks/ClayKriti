import React from 'react';
import {
  Sparkles,
  Key,
  ShoppingBag,
  Grid,
  Gift,
  Sun,
  Flame,
  Package,
  Heart,
} from 'lucide-react';
import { CategoryType, CategoryInfo } from '../types';
import { CATEGORIES } from '../data/products';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  categoryCounts: Record<CategoryType, number>;
}

const getCategoryIcon = (iconName: string) => {
  const iconProps = { className: 'w-4 h-4' };
  switch (iconName) {
    case 'Key':
      return <Key {...iconProps} />;
    case 'ShoppingBag':
      return <ShoppingBag {...iconProps} />;
    case 'Grid':
      return <Grid {...iconProps} />;
    case 'Gift':
      return <Gift {...iconProps} />;
    case 'Sun':
      return <Sun {...iconProps} />;
    case 'Flame':
      return <Flame {...iconProps} />;
    case 'Package':
      return <Package {...iconProps} />;
    case 'Heart':
      return <Heart {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-clay-charcoal">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-clay-muted">
            Your Favourites, All in One Place
          </p>
        </div>
      </div>

      {/* Horizontally scrollable pill tabs for mobile & desktop */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat: CategoryInfo) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-md transform scale-[1.02]'
                  : 'bg-white/80 hover:bg-white text-clay-charcoal border-clay-sand hover:border-terracotta-300 shadow-sm'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-terracotta-600'}>
                {getCategoryIcon(cat.iconName)}
              </span>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-clay-sand/60 text-clay-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
