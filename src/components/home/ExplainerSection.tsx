'use client';

import React from 'react';
import { Video } from '@/types/video';
import { ExplainerCard } from '../video/ExplainerCard';
import { SectionHeading } from '../common/SectionHeading';

interface ExplainerSectionProps {
  videos: Video[];
}

export const ExplainerSection: React.FC<ExplainerSectionProps> = ({ videos }) => {
  return (
    <div className="flex flex-col h-full">
      <SectionHeading title="Explainer" accentColor="navy" className="mb-4" actionLink="/category/explainer" />
      <div className="flex-1 bg-white border border-slate-200/60 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col gap-4 overflow-hidden">
        {videos.length === 0 ? (
          <div className="text-center text-slate-400 text-xs flex-1 flex items-center justify-center">
            कोई एक्सप्लेनर नहीं मिला
          </div>
        ) : (
          videos.slice(0, 2).map((video) => (
            <ExplainerCard key={video.id} video={video} className="flex-1" />
          ))
        )}
      </div>
    </div>
  );
};

export default ExplainerSection;
