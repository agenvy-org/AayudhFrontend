'use client';

import React from 'react';
import { Podcast } from '@/types/podcast';
import { PodcastCard } from '../video/PodcastCard';

interface PodcastSectionProps {
  podcasts: Podcast[];
}

export const PodcastSection: React.FC<PodcastSectionProps> = ({ podcasts }) => {
  const mainPodcast = podcasts[0];

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-serif text-lg font-bold text-brand-navy pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
        🎙️ Podcast
      </h3>
      {mainPodcast ? (
        <PodcastCard podcast={mainPodcast} className="flex-1 hover:shadow-md" />
      ) : (
        <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-xs flex-1 flex items-center justify-center">
          कोई पॉडकास्ट उपलब्ध नहीं है
        </div>
      )}
    </div>
  );
};

export default PodcastSection;
