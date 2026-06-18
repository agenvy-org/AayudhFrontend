'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Calendar, Clock } from 'lucide-react';
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
    <Card className={`overflow-hidden p-0 bg-white border border-slate-100 flex flex-col ${className}`}>
      
      {/* Player Display (Dark Slate Video-like Box) */}
      <div className="relative aspect-video bg-[#0b1329] flex items-center justify-center group overflow-hidden">
        <img
          src={podcast.thumbnail}
          alt={podcast.title}
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Play overlay button */}
        <button
          onClick={togglePlayback}
          className="relative z-10 rounded-full bg-red-600 p-4 shadow-lg hover:bg-red-700 hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label={isPlaying ? 'रोकें' : 'चलाएं'}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white fill-white" />
          ) : (
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          )}
        </button>

        {/* Live Audio indicator overlay */}
        {isPlaying && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-white tracking-wide font-sans">
            <Volume2 className="w-3.5 h-3.5 animate-bounce text-live-green" />
            <span>सुन रहे हैं</span>
          </div>
        )}

        <span className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded font-sans">
          {podcast.duration}
        </span>
      </div>

      {/* Title & Info Panel */}
      <div className="p-4 bg-white">
        <h4 className="font-serif text-base font-bold text-slate-850 leading-snug line-clamp-2 hover:text-brand-purple transition-colors duration-200">
          {podcast.title}
        </h4>
        <p className="mt-1.5 text-xs text-slate-400 font-sans">
          होस्ट: <span className="font-semibold text-slate-600">{podcast.host}</span>
        </p>
        
        {podcast.description && (
          <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2 font-sans">
            {podcast.description}
          </p>
        )}

        {/* Metadata Footer */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-4 text-[10px] text-slate-400 font-semibold font-sans">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {podcast.publishedAt}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {podcast.duration}</span>
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

    </Card>
  );
};

export default PodcastCard;
