'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useVideos } from '@/hooks/useVideos';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Loader } from '@/components/common/Loader';
import { Play } from 'lucide-react';

function VideosContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const { data: videos, isLoading } = useVideos();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    if (videos && slug) {
      const idx = videos.findIndex(v => v.slug === slug);
      if (idx !== -1) {
        setActiveVideoIndex(idx);
      }
    }
  }, [videos, slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader size="lg" />
        <p className="mt-4 text-xs font-semibold text-slate-500 animate-pulse font-sans">
          वीडियो लोड हो रहे हैं...
        </p>
      </div>
    );
  }

  if (!videos || videos.length === 0) return null;

  const currentVideo = videos[activeVideoIndex];

  return (
    <div className="py-6 font-sans">
      <SectionHeading 
        title="वीडियो बुलेटिन" 
        subtitle="ताज़ा समाचार वीडियो, लाइव डिबेट और एक्सप्लेनर रिपोर्ट" 
        accentColor="purple" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Big Video Player (Col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-800">
            <iframe
              src={currentVideo.url}
              title={currentVideo.title}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 shadow-sm">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-purple bg-brand-purple-light px-2.5 py-1 rounded-full">
              {currentVideo.category || 'न्यूज़ बुलेटिन'}
            </span>
            <h1 className="font-serif text-xl md:text-2xl font-bold text-slate-800 leading-snug mt-2.5">
              {currentVideo.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-[10px] text-slate-400 font-semibold border-t border-slate-50 pt-3">
              <span>{currentVideo.publishedAt}</span>
              <span>•</span>
              <span>{currentVideo.views || '10K'} व्यूज</span>
            </div>
          </div>
        </div>

        {/* Right Column: Playlist selector sidebar (Col-span-4) */}
        <div className="lg:col-span-4 space-y-4 bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm max-h-[500px] overflow-y-auto">
          <h3 className="font-serif text-sm font-bold text-slate-800 pb-2 border-b border-slate-100">
            अगला वीडियो चुनें
          </h3>
          <div className="space-y-3">
            {videos.map((vid, index) => {
              const isSelected = activeVideoIndex === index;
              return (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideoIndex(index)}
                  className={`flex gap-3 items-center group cursor-pointer p-2 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-brand-purple bg-brand-purple-light/20'
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="relative w-20 h-14 bg-slate-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-slate-150">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${isSelected ? 'text-brand-purple font-extrabold' : 'text-slate-750'}`}>
                      {vid.title}
                    </h4>
                    <span className="text-[9px] text-slate-400 mt-1 block">{vid.publishedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function VideosPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader size="lg" />
      </div>
    }>
      <VideosContent />
    </Suspense>
  );
}
