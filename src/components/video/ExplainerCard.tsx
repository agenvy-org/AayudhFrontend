'use client';

import React from 'react';
import Link from 'next/link';
import { Play, MapPin, Calendar } from 'lucide-react';
import { Video } from '@/types/video';
import { Card } from '../common/Card';

interface ExplainerCardProps {
  video: Video;
  className?: string;
}

export const ExplainerCard: React.FC<ExplainerCardProps> = ({ video, className }) => {
  return (
    <Link href={`/videos?slug=${video.slug}`} className={`block flex flex-col group h-full ${className || ''}`}>

      {/* Light Grayish Video Placeholder Container */}
      <div className="w-full aspect-[16/9] bg-[#D6DEE5] rounded-xl overflow-hidden shrink-0 relative transition-transform duration-300 group-hover:scale-[1.02]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover opacity-80 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100"
          loading="lazy"
        />
        {/* Subtle play indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
          <Play className="w-10 h-10 text-white fill-white drop-shadow-md" />
        </div>
      </div>

      {/* Text Area & Footer */}
      <div className="pt-3.5 flex-1 flex flex-col w-full">
        {/* Title and Description */}
        <div className="flex-1 flex flex-col items-center text-center px-2 mb-3">
          <h4 className="font-serif text-[15px] sm:text-[17px] font-bold text-[#111827] leading-[1.35] line-clamp-2 group-hover:text-[#e01a22] transition-colors duration-200 w-full">
            {video.title}
          </h4>
          {video.description && (
            <p className="mt-2 text-[13px] text-slate-500 line-clamp-2 leading-snug w-full">
              {video.description}
            </p>
          )}
        </div>
        
        {/* Date Footer */}
        <div className="w-full border-t border-slate-100/80 pt-3 flex items-center justify-end px-1.5 overflow-hidden text-slate-500">
          <div className="flex items-center gap-1.5 shrink-0">
            <Calendar className="w-4 h-4 shrink-0 -mt-[2px]" />
            <span className="text-[11px] sm:text-xs font-semibold whitespace-nowrap">Published: {video.publishedAt || '18 May 2025'}</span>
          </div>
        </div>
      </div>

    </Link>
  );
};

export default ExplainerCard;
