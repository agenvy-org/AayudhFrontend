'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
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
    <div className="relative min-h-screen py-6 sm:py-12 font-sans overflow-hidden bg-[#FAFAFC]">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-10 items-start">
          
          {/* Left Column: Big Video Player & Details (Col-span-8) */}
          <div className="xl:col-span-8 flex flex-col w-full">
            
            {/* Main Player Container with Ambient Glow */}
            <div className="relative group w-full">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple/20 via-brand-red/20 to-brand-purple/20 rounded-[28px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              {/* Player Card */}
              <div className="relative w-full aspect-video bg-slate-950 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl shadow-slate-300/40 ring-1 ring-slate-200 z-10">
                <iframe
                  src={getEmbedUrl(currentVideo.url)}
                  title={currentVideo.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            
            {/* Video Meta Info Card */}
            <div className="relative mt-6 sm:mt-8 bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-xl shadow-slate-200/30 border border-slate-100 flex flex-col gap-5 z-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[13px] font-bold uppercase tracking-widest text-brand-purple bg-gradient-to-r from-brand-purple/10 to-transparent px-4 py-2 rounded-full border border-brand-purple/10">
                  <MonitorPlay className="w-4 h-4" />
                  {currentVideo.category || 'न्यूज़ बुलेटिन'}
                </span>
                
                {/* Social Share Group */}
                <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-slate-50/80 rounded-full border border-slate-100 shadow-inner">
                  <button 
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(currentVideo.title + ' ' + window.location.href)}`, '_blank')}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-[0_4px_12px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-1"
                    title="WhatsApp पर शेयर करें"
                  >
                    <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-[0_4px_12px_rgba(24,119,242,0.3)] transition-all duration-300 hover:-translate-y-1"
                    title="Facebook पर शेयर करें"
                  >
                    <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentVideo.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-black hover:text-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1"
                    title="X (Twitter) पर शेयर करें"
                  >
                    <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <div className="w-[1px] h-6 bg-slate-200 mx-1 hidden sm:block"></div>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: currentVideo.title, url: window.location.href });
                      }
                    }}
                    className="flex items-center justify-center gap-2 text-[13px] font-bold text-slate-700 hover:text-brand-purple px-4 h-10 rounded-full transition-all duration-300 hover:bg-white hover:shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">शेयर</span>
                  </button>
                </div>
              </div>

              <h1 className="font-serif text-[26px] sm:text-[36px] font-black text-slate-900 leading-[1.25] tracking-tight">
                {currentVideo.title}
              </h1>

              {currentVideo.description && (
                <p className="text-[15px] sm:text-[17px] text-slate-600 leading-[1.7] font-medium max-w-4xl">
                  {currentVideo.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-[13px] sm:text-[14px] text-slate-500 font-bold pt-6 mt-2 border-t border-slate-100/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                  {currentVideo.publishedAt}
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">{currentVideo.views || '10K'} व्यूज</span>
              </div>
            </div>
          </div>

          {/* Right Column: Playlist sidebar (Col-span-4) */}
          <div className="xl:col-span-4 flex flex-col bg-white border border-slate-100/80 rounded-[24px] sm:rounded-[32px] shadow-xl shadow-slate-200/30 overflow-hidden h-[calc(100vh-100px)] xl:sticky xl:top-20 z-20">
            {/* Header */}
            <div className="px-6 py-5 bg-white/80 backdrop-blur-md border-b border-slate-100/50 flex items-center justify-between shrink-0 z-10">
              <h3 className="font-serif text-[20px] font-black text-slate-900 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600">
                  <PlaySquare className="w-4 h-4" />
                </span>
                प्लेलिस्ट
              </h3>
              <span className="text-[13px] font-bold text-brand-purple bg-brand-purple/5 px-3.5 py-1.5 rounded-full border border-brand-purple/10">
                {activeVideoIndex + 1} / {videos.length}
              </span>
            </div>

            {/* Playlist Items */}
            <div 
              ref={playlistRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200/50 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {videos.map((vid, index) => {
                const isSelected = activeVideoIndex === index;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideoIndex(index)}
                    className={`group relative flex gap-4 items-start cursor-pointer p-3 rounded-[20px] transition-all duration-500 ease-out ${
                      isSelected
                        ? 'bg-slate-50 shadow-md shadow-slate-200/50 scale-[1.02] ring-1 ring-brand-purple/20 z-10'
                        : 'hover:bg-slate-50/50 hover:shadow-sm hover:scale-[1.01]'
                    }`}
                  >
                    {/* Active Background Gradient */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/[0.03] to-transparent rounded-[20px] pointer-events-none"></div>
                    )}
                    {isSelected && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand-purple rounded-r-full"></div>
                    )}

                    {/* Thumbnail */}
                    <div className="relative w-[140px] aspect-video bg-slate-100 rounded-[14px] overflow-hidden shrink-0 border border-slate-200/50 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isSelected ? 'scale-105' : 'group-hover:scale-110'}`}
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-black/30 backdrop-blur-[2px]' : 'bg-black/10 group-hover:bg-black/30'}`}>
                        {isSelected ? (
                          <div className="flex gap-1 items-end bg-brand-purple/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.3)] h-8">
                            <span className="w-1 h-[100%] bg-white rounded-full animate-[bounce_1s_infinite]"></span>
                            <span className="w-1 h-[60%] bg-white rounded-full animate-[bounce_1s_infinite_100ms]"></span>
                            <span className="w-1 h-[80%] bg-white rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                          </div>
                        ) : (
                          <div className="bg-white/95 rounded-full p-2.5 shadow-[0_8px_16px_rgba(0,0,0,0.15)] transform scale-90 group-hover:scale-110 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                            <Play className="w-4 h-4 text-brand-navy fill-brand-navy ml-0.5" />
                          </div>
                        )}
                      </div>
                      {!isSelected && (
                        <span className="absolute bottom-1.5 right-1.5 text-[10px] font-bold tracking-wide text-white bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md shadow-sm">
                          {vid.duration}
                        </span>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="min-w-0 flex-1 py-0.5 relative z-10">
                      <h4 className={`text-[14px] sm:text-[15px] font-bold leading-[1.4] line-clamp-3 transition-colors duration-300 ${isSelected ? 'text-brand-purple' : 'text-slate-800 group-hover:text-brand-navy'}`}>
                        {vid.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className={`text-[11px] font-bold transition-colors ${isSelected ? 'text-brand-purple/70' : 'text-slate-400'}`}>
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
