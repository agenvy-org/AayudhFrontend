'use client';

import React from 'react';
import { Video } from '@/types/video';
import { VideoCard } from '../video/VideoCard';

interface VideosSectionProps {
  videos: Video[];
}

export const VideosSection: React.FC<VideosSectionProps> = ({ videos }) => {
  return (
    <div className="flex flex-col h-full bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 shadow-sm">
      <h3 className="font-serif text-lg font-bold text-brand-navy pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
        📹 More Videos
      </h3>
      <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar max-h-[420px]">
        {videos.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">कोई वीडियो नहीं मिला</p>
        ) : (
          videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        )}
      </div>
    </div>
  );
};

export default VideosSection;
