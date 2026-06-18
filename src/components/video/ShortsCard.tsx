'use client';

import React from 'react';
import { Play, Heart } from 'lucide-react';
import { Short } from '@/types/shorts';

interface ShortsCardProps {
  short: Short;
  onClick?: () => void;
  isActive?: boolean;
}

export const ShortsCard: React.FC<ShortsCardProps> = ({ short, onClick, isActive = false }) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md border border-slate-100 flex flex-col cursor-pointer transition-all duration-300 w-[170px] sm:w-[190px] shrink-0 ${
        isActive ? 'ring-2 ring-brand-purple' : ''
      }`}
    >
      
      {/* Top Media/Gradient Section */}
      <div className={`relative aspect-[3/4] bg-gradient-to-tr ${short.bgColor || 'from-indigo-400 to-purple-600'} flex items-center justify-center`}>
        {/* Play Icon */}
        <div className="bg-white/25 backdrop-blur-sm rounded-full p-2.5 shadow-md group-hover:scale-110 transition-transform duration-300">
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        </div>

        {/* Short Tag badge */}
        <span className="absolute top-3 left-3 bg-brand-purple text-[8px] font-black text-white px-2 py-0.5 rounded-full font-sans tracking-wide">
          {short.tag}
        </span>

        {/* Likes Count Overlay */}
        {short.likes && (
          <div className="absolute bottom-2 right-2.5 flex items-center gap-1 text-[9px] font-bold text-white bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded">
            <Heart className="w-2.5 h-2.5 fill-red-500 text-red-500" />
            <span>{short.likes}</span>
          </div>
        )}
      </div>

      {/* Bottom Title Panel */}
      <div className="p-3 bg-white border-t border-slate-55 flex-1 flex flex-col justify-center">
        <h4 className="text-xs font-bold text-slate-850 line-clamp-2 leading-snug">
          {short.title}
        </h4>
      </div>

    </div>
  );
};

export default ShortsCard;
