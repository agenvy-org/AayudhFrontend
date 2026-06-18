'use client';

import React from 'react';
import { Video } from '@/types/video';
import { ExplainerCard } from '../video/ExplainerCard';

interface ExplainerSectionProps {
  videos: Video[];
}

export const ExplainerSection: React.FC<ExplainerSectionProps> = ({ videos }) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="font-serif text-lg font-bold text-brand-navy pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
        💡 Explainer
      </h3>
      <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar max-h-[420px]">
        {videos.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">कोई एक्सप्लेनर नहीं मिला</p>
        ) : (
          videos.slice(0, 2).map((video) => (
            <ExplainerCard key={video.id} video={video} />
          ))
        )}
      </div>
    </div>
  );
};

export default ExplainerSection;
