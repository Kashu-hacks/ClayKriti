import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mr-3 bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-clay-sand text-xs text-clay-charcoal flex items-center gap-2 animate-fade-in max-w-xs">
          <span>Questions or custom designs? Chat directly with us! 🤎</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-clay-muted hover:text-clay-charcoal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
          'Hello ClayKriti! I have a question about your handcrafted creations.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group relative shrink-0"
        aria-label="Chat with ClayKriti on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
