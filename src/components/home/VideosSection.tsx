'use client';

import React from 'react';
import { Video } from '@/types/video';
import { VideoCard } from '../video/VideoCard';
import { SectionHeading } from '../common/SectionHeading';

interface VideosSectionProps {
  videos: Video[];
}

export const VideosSection: React.FC<VideosSectionProps> = ({ videos }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <SectionHeading title="वीडियो" accentColor="navy" className="mb-4" actionLink="/videos" />
      <div className="bg-white border border-slate-200/60 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col overflow-hidden min-h-0">
        <div className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
          {videos.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">कोई वीडियो नहीं मिला</p>
          ) : (
            videos.slice(0, 5).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VideosSection;
