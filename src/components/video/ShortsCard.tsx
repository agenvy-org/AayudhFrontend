'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { Short } from '@/types/shorts';

interface ShortsCardProps {
  short: Short;
  onClick?: () => void;
  isActive?: boolean;
}

export const ShortsCard: React.FC<ShortsCardProps> = ({ short, onClick, isActive = false }) => {
  // Helper to color half the title yellow and half white, matching the editorial reference image
  const renderOverlayTitle = (title?: string) => {
    if (!title) return null;
    let firstHalf = '';
    let secondHalf = '';

    if (title.includes('|')) {
      const parts = title.split('|');
      firstHalf = parts[0].trim();
      secondHalf = parts[1].trim();
    } else {
      const words = title.split(' ');
      if (words.length <= 1) {
        return (
          <span className="block drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            <span className="text-yellow-400 font-extrabold">{title}</span>
          </span>
        );
      }
      const mid = Math.ceil(words.length / 2);
      firstHalf = words.slice(0, mid).join(' ');
      secondHalf = words.slice(mid).join(' ');
    }

    return (
      <span className="block drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
        <span className="text-yellow-400 font-extrabold block">{firstHalf}</span>
        <span className="text-white block mt-0.5 font-bold">{secondHalf}</span>
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-[28px] overflow-hidden bg-white hover:-translate-y-1.5 border border-slate-200/80 flex flex-col cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-[190px] sm:w-[240px] shrink-0 group/card p-2 sm:p-2.5 ${
        isActive ? 'ring-2 ring-[#e01a22] ring-offset-2' : ''
      }`}
    >
      {/* Media Section with 9:16 Aspect Ratio */}
      <div className="relative aspect-[9/16] bg-slate-950 overflow-hidden shrink-0 rounded-[20px] sm:rounded-[22px]">
        {/* Subtle inner border for crispness */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 z-20 rounded-[20px] sm:rounded-[22px] pointer-events-none" />
        
        {short.thumbnail ? (
          <img
            src={short.thumbnail}
            alt={short.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:scale-110"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-tr ${short.bgColor || 'from-indigo-400 to-purple-600'} transition-transform duration-700 group-hover/card:scale-110`} />
        )}

        {/* Small Dark Circular Play Button Overlay (Bottom-Right) */}
        <div className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 backdrop-blur-sm border-[1.5px] border-white/80 text-white shadow-lg z-10 group-hover/card:bg-[#e01a22] group-hover/card:border-[#e01a22] group-hover/card:scale-110 transition-all duration-300 ease-out">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-1" />
        </div>
      </div>
    </div>
  );
};

export default ShortsCard;
