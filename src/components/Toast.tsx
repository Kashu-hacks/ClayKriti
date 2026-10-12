import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-24 right-4 z-50 animate-fade-in">
      <div className="bg-clay-charcoal text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-warm-lg flex items-center gap-2.5 border border-white/10">
        <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
