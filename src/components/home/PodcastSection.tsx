'use client';

import React from 'react';
import { Podcast } from '@/types/podcast';
import { PodcastCard } from '../video/PodcastCard';
import { SectionHeading } from '../common/SectionHeading';

interface PodcastSectionProps {
  podcasts: Podcast[];
}

export const PodcastSection: React.FC<PodcastSectionProps> = ({ podcasts }) => {
  const mainPodcast = podcasts[0];

  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <SectionHeading title="पॉडकास्ट" accentColor="navy" className="mb-4" actionLink="/podcast" />
      <div className="bg-white border border-slate-200/60 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col overflow-hidden min-h-0">
        {mainPodcast ? (
          <PodcastCard podcast={mainPodcast} className="flex-1" />
        ) : (
          <div className="text-center text-slate-400 text-xs flex-1 flex items-center justify-center">
            कोई पॉडकास्ट उपलब्ध नहीं है
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastSection;
