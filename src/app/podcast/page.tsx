'use client';

import React from 'react';
import { usePodcasts } from '@/hooks/useVideos';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Loader } from '@/components/common/Loader';
import { PodcastCard } from '@/components/video/PodcastCard';
import { EmptyState } from '@/components/common/EmptyState';

export default function PodcastPage() {
  const { data: podcasts, isLoading } = usePodcasts();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader size="lg" />
        <p className="mt-4 text-xs font-semibold text-slate-500 animate-pulse font-sans">
          पॉडकास्ट लोड हो रहे हैं...
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 font-sans">
      <SectionHeading 
        title="Aayudh पॉडकास्ट" 
        subtitle="सुनिए मध्य प्रदेश के जमीनी मुद्दों पर ग्राउंड रिपोर्ट और समीक्षाएं" 
        accentColor="purple" 
      />
      
      {podcasts && podcasts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="कोई पॉडकास्ट नहीं मिला" 
          description="पॉडकास्ट अभी तैयार हो रहे हैं। कृपया बाद में देखें।" 
        />
      )}
    </div>
  );
}
