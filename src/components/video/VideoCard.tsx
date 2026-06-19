import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Video } from '@/types/video';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, className }) => {
  return (
    <Link href={`/videos?slug=${video.slug}`} className={cn("block", className)}>
      <div className="flex gap-2.5 items-center group cursor-pointer hover:bg-slate-50/80 p-1.5 rounded-lg transition-all duration-200">
        
        {/* Thumbnail with play icon */}
        <div className="relative w-[110px] h-[72px] bg-slate-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-slate-150">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/35 transition-colors duration-200">
            <div className="bg-white/95 rounded-full p-1.5 shadow-sm">
              <Play className="w-3.5 h-3.5 text-brand-navy fill-brand-navy ml-0.5" />
            </div>
          </div>
          <span className="absolute bottom-1 right-1.5 text-[9px] font-bold text-white bg-black/70 px-1 rounded">
            {video.duration}
          </span>
        </div>

        {/* Text metadata */}
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-semibold text-slate-800 leading-[1.35] line-clamp-2 group-hover:text-brand-purple transition-colors duration-200">
            {video.title}
          </h4>
          {video.description && (
            <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
              {video.description}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1.5 font-semibold">
            <span>{video.publishedAt}</span>
            {video.views && (
              <>
                <span>•</span>
                <span>{video.views} व्यूज</span>
              </>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
};

export default VideoCard;
