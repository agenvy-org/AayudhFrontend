'use client';

import React, { useState } from 'react';
import { useShorts } from '@/hooks/useShorts';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Loader } from '@/components/common/Loader';
import { Play, Pause, Heart, VolumeX, Volume2 } from 'lucide-react';

export default function ShortsPage() {
  const { data: shorts, isLoading } = useShorts();
  const [activeShortIndex, setActiveShortIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader size="lg" />
        <p className="mt-4 text-xs font-semibold text-slate-500 animate-pulse font-sans">
          शॉर्ट्स लोड हो रहे हैं...
        </p>
      </div>
    );
  }

  if (!shorts || shorts.length === 0) return null;

  const currentShort = shorts[activeShortIndex];

  const handleLike = (id: string) => {
    setLikedList(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-6 max-w-md mx-auto font-sans">
      <SectionHeading 
        title="Aayudh Shorts" 
        subtitle="स्वाइप करें और 60 सेकंड में मध्य प्रदेश की खबरें जानें" 
        accentColor="purple" 
      />
      
      {/* Mobile-first Immersive Shorts Container */}
      <div className="relative aspect-[9/16] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Mock Video Autoplay Stream */}
        <video
          key={currentShort.id}
          src={currentShort.videoUrl}
          className="w-full h-full object-cover"
          autoPlay={isPlaying}
          loop
          muted={isMuted}
          playsInline
        />

        {/* Video Overlays (Backdrop shadow) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/75 pointer-events-none" />

        {/* Controls Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between text-white">
          
          {/* Left Portion: News title and Tag */}
          <div className="flex-1 pr-6 pointer-events-auto">
            <span className="inline-block bg-brand-purple text-[8px] font-black text-white px-2 py-0.5 rounded-full mb-2 uppercase tracking-wide">
              {currentShort.tag}
            </span>
            <h3 className="text-sm font-bold leading-snug drop-shadow-md">
              {currentShort.title}
            </h3>
          </div>

          {/* Right Portion: Action Buttons */}
          <div className="flex flex-col gap-4 items-center pointer-events-auto">
            
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-black/40 backdrop-blur-sm rounded-full p-2.5 text-white border border-white/10 hover:bg-black/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Play/Pause"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white text-white" /> : <Play className="w-4 h-4 fill-white text-white ml-0.5" />}
            </button>

            {/* Mute/Unmute */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-black/40 backdrop-blur-sm rounded-full p-2.5 text-white border border-white/10 hover:bg-black/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Mute/Unmute"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>

            {/* Like */}
            <button
              onClick={() => handleLike(currentShort.id)}
              className="bg-black/40 backdrop-blur-sm rounded-full p-2.5 text-white border border-white/10 hover:bg-black/60 hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-0.5 cursor-pointer"
              aria-label="Like"
            >
              <Heart className={`w-4 h-4 transition-colors ${likedList[currentShort.id] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              <span className="text-[9px] font-bold">{likedList[currentShort.id] ? (currentShort.likes || 0) + 1 : currentShort.likes}</span>
            </button>

          </div>

        </div>

        {/* Top Indicators / Feed navigation buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setActiveShortIndex(prev => (prev > 0 ? prev - 1 : shorts.length - 1))}
            className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white border border-white/10 hover:bg-black/60 active:scale-95 transition-all font-bold cursor-pointer"
          >
            ← पिछला
          </button>
          <button
            onClick={() => setActiveShortIndex(prev => (prev < shorts.length - 1 ? prev + 1 : 0))}
            className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white border border-white/10 hover:bg-black/60 active:scale-95 transition-all font-bold cursor-pointer"
          >
            अगला →
          </button>
        </div>

      </div>
    </div>
  );
}
