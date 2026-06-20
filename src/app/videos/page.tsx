'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useVideos } from '@/hooks/useVideos';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Loader } from '@/components/common/Loader';
import { Play, Share2, PlaySquare, MonitorPlay } from 'lucide-react';
import { WhatsAppIcon, FacebookIcon, TwitterIcon } from '@/components/common/BrandIcons';

function VideosContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const { data: videos, isLoading } = useVideos();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const playlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videos && slug) {
      const idx = videos.findIndex(v => v.slug === slug);
      if (idx !== -1) {
        setActiveVideoIndex(idx);
      }
    }
  }, [videos, slug]);

  // Scroll to active video in playlist
  useEffect(() => {
    if (playlistRef.current) {
      const activeElement = playlistRef.current.children[activeVideoIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeVideoIndex]);

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
  
  // Ensure the video URL has autoplay=1 for a better experience if we are switching
  const getEmbedUrl = (url: string) => {
    if (url.includes('autoplay=1')) return url;
    return url + (url.includes('?') ? '&autoplay=1' : '?autoplay=1');
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 font-sans bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Big Video Player & Details (Col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            
            {/* Main Player Container */}
            <div className="w-full aspect-video bg-black rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-lg border border-slate-900/10">
              <iframe
                src={getEmbedUrl(currentVideo.url)}
                title={currentVideo.title}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            
            {/* Video Meta Info Card */}
            <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-200/60 flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-purple bg-brand-purple/5 px-3 py-1.5 rounded-full">
                  <MonitorPlay className="w-3.5 h-3.5" />
                  {currentVideo.category || 'न्यूज़ बुलेटिन'}
                </span>
                
                {/* Social Share Group */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(currentVideo.title + ' ' + window.location.href)}`, '_blank')}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-[#25D366] bg-slate-50 border border-slate-200/60 hover:bg-[#25D366] hover:text-white hover:border-transparent transition-colors"
                    title="WhatsApp पर शेयर करें"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-[#1877F2] bg-slate-50 border border-slate-200/60 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-colors"
                    title="Facebook पर शेयर करें"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentVideo.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 bg-slate-50 border border-slate-200/60 hover:bg-black hover:text-white hover:border-transparent transition-colors"
                    title="X (Twitter) पर शेयर करें"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </button>
                  <div className="w-[1px] h-5 bg-slate-200 mx-1 hidden sm:block"></div>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: currentVideo.title, url: window.location.href });
                      }
                    }}
                    className="flex items-center justify-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200/60 hover:bg-slate-100 hover:text-brand-purple px-4 h-9 rounded-full transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">शेयर</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-serif text-2xl sm:text-[32px] font-bold text-slate-900 leading-[1.3] tracking-tight">
                  {currentVideo.title}
                </h1>
                
                {currentVideo.description && (
                  <p className="text-[14px] sm:text-[15px] text-slate-600 leading-[1.6] font-medium max-w-4xl mt-1">
                    {currentVideo.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-[13px] text-slate-500 font-bold pt-5 mt-2 border-t border-slate-100">
                <span className="bg-slate-50 px-2.5 py-1 rounded-md">{currentVideo.publishedAt}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="bg-slate-50 px-2.5 py-1 rounded-md">{currentVideo.views || '10K'} व्यूज</span>
              </div>
            </div>
          </div>

          {/* Right Column: Playlist sidebar (Col-span-4) */}
          <div className="lg:col-span-4 flex flex-col bg-white border border-slate-200/60 rounded-[20px] sm:rounded-[24px] shadow-sm overflow-hidden h-[calc(100vh-100px)] lg:sticky lg:top-8">
            {/* Header */}
            <div className="px-5 py-4 sm:py-5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
              <h3 className="font-serif text-[18px] font-bold text-slate-900 flex items-center gap-2.5">
                <PlaySquare className="w-5 h-5 text-slate-800" />
                प्लेलिस्ट
              </h3>
              <span className="text-[11px] sm:text-xs font-bold text-brand-purple bg-brand-purple/5 px-3 py-1.5 rounded-full">
                {activeVideoIndex + 1} / {videos.length}
              </span>
            </div>

            {/* Playlist Items */}
            <div 
              ref={playlistRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1 scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-50 border-l border-transparent hover:[&::-webkit-scrollbar-thumb]:bg-slate-100 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {videos.map((vid, index) => {
                const isSelected = activeVideoIndex === index;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideoIndex(index)}
                    className={`group flex gap-3.5 items-start cursor-pointer p-3 rounded-[16px] transition-colors ${
                      isSelected
                        ? 'bg-[#f8f5fe]'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-[130px] h-[74px] bg-slate-100 rounded-[8px] overflow-hidden shrink-0">
                      <Image
                        src={vid.thumbnail}
                        alt={vid.title}
                        fill
                        className="object-cover"
                        sizes="130px"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        {isSelected ? (
                          <div className="bg-[#8b5cf6] px-2.5 py-1 rounded">
                            <span className="text-[10px] font-bold text-white tracking-widest uppercase">Playing</span>
                          </div>
                        ) : (
                          <Play className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                        )}
                      </div>
                      {!isSelected && (
                        <span className="absolute bottom-1 right-1.5 text-[9px] font-bold text-white bg-black/80 px-1.5 py-0.5 rounded">
                          {vid.duration}
                        </span>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="min-w-0 flex-1 py-0.5">
                      <h4 className={`text-[14px] font-bold leading-[1.35] line-clamp-3 transition-colors ${isSelected ? 'text-[#8b5cf6]' : 'text-slate-800 group-hover:text-slate-900'}`}>
                        {vid.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[12px] font-medium ${isSelected ? 'text-[#8b5cf6]/80' : 'text-slate-400'}`}>
                          {vid.publishedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
