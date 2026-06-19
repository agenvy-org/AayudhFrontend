'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Calendar, Clock, User } from 'lucide-react';
import { Podcast } from '@/types/podcast';
import { Card } from '../common/Card';

interface PodcastCardProps {
  podcast: Podcast;
  className?: string;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`flex flex-col ${className || ''}`}>
      
      {/* Player Display */}
      {podcast.videoUrl ? (
        <div className="relative aspect-video rounded-xl overflow-hidden shrink-0 bg-[#0E1528]">
          <iframe 
            className="w-full h-full"
            src={podcast.videoUrl} 
            title={podcast.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div 
          className="relative aspect-video bg-[#0E1528] rounded-xl flex items-center justify-center group overflow-hidden cursor-pointer shrink-0"
          onClick={togglePlayback}
        >
          {/* Play overlay button (Simple Red Triangle) */}
          <div className="z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 active:scale-95">
            {isPlaying ? (
              <Pause className="w-14 h-14 text-red-600 fill-red-600" />
            ) : (
              <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[30px] border-l-[#C3121E] border-b-[18px] border-b-transparent ml-2" />
            )}
          </div>
        </div>
      )}

      {/* Title Panel */}
      <div className="pt-3 bg-white flex-1 flex flex-col">
        <h4 className="font-serif text-[22px] sm:text-[28px] font-black tracking-tight text-[#111827] leading-[1.25] line-clamp-3 hover:text-[#e01a22] transition-colors duration-200">
          {podcast.title}
        </h4>
        {podcast.description && (
          <p className="mt-2 text-[13px] sm:text-[14px] text-slate-500 line-clamp-2 leading-relaxed flex-1">
            {podcast.description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-[12px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published: {podcast.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <User className="w-3.5 h-3.5" />
            <span>Guest: Akash Kumar</span>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={podcast.audioUrl}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
        preload="none"
      />

    </div>
  );
};

export default PodcastCard;
