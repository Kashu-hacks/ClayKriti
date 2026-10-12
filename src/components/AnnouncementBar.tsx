import React from 'react';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-terracotta-700 via-terracotta-600 to-terracotta-800 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide shadow-inner flex items-center justify-center gap-2">
      <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse hidden sm:inline" />
      <span>{siteConfig.announcementText}</span>
      <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse hidden sm:inline" />
    </div>
  );
};
