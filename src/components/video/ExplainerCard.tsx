'use client';

import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Video } from '@/types/video';
import { Card } from '../common/Card';

interface ExplainerCardProps {
  video: Video;
  className?: string;
}

export const ExplainerCard: React.FC<ExplainerCardProps> = ({ video, className }) => {
  return (
    <Link href={`/videos?slug=${video.slug}`} className="block h-full">
      <Card className={`overflow-hidden p-0 bg-white border border-slate-100 h-full flex flex-col justify-between ${className}`}>
        
        {/* Aspect Ratio Video Container */}
        <div className="relative aspect-video bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center hover:bg-black/25 transition-colors duration-250">
            <div className="bg-brand-purple rounded-full p-2.5 shadow-md hover:scale-110 active:scale-95 transition-all duration-200">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
          <span className="absolute bottom-2 right-2 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded font-sans">
            {video.duration}
          </span>
        </div>

        {/* Text Area */}
        <div className="p-3 bg-white flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-sm font-bold text-slate-800 leading-snug line-clamp-2 hover:text-brand-purple transition-colors duration-200">
              {video.title}
            </h4>
          </div>
          <div className="mt-3 text-[9px] text-slate-400 font-semibold border-t border-slate-50 pt-2 font-sans flex justify-between">
            <span>{video.category || 'एक्सप्लेनर'}</span>
            <span>{video.publishedAt}</span>
          </div>
        </div>

      </Card>
    </Link>
  );
};

export default ExplainerCard;
