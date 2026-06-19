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
    <div className="flex flex-col h-full">
      <SectionHeading title="Podcast" accentColor="navy" className="mb-4" actionLink="/podcast" />
      <div className="flex-1 bg-white border border-slate-200/60 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col overflow-hidden">
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
