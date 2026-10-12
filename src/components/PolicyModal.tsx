import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, title, onClose, children }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 id="policy-modal-title" className="text-lg font-serif font-bold text-clay-charcoal">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-clay-blush transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-clay-muted" />
          </button>
        </div>
        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-5 text-sm text-clay-charcoal leading-relaxed space-y-4 scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};
