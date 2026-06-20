'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '@/types/article';

interface TopNewsTickerProps {
  news: Article[];
}

export const TopNewsTicker: React.FC<TopNewsTickerProps> = ({ news }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!news || news.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 4000); // 4 seconds

    return () => clearInterval(timer);
  }, [news]);

  const handleNext = () => {
    if (!news || news.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const handlePrev = () => {
    if (!news || news.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  if (!news || news.length === 0) return null;

  return (
    <div className="mt-3 bg-red-600 border border-red-700 rounded-full px-4 py-3 flex items-center gap-4 shadow-sm mb-4 relative overflow-hidden group">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Breaking Badge */}
      <div className="flex items-center gap-2 font-sans font-black text-white tracking-wider text-[13px] uppercase shrink-0 z-10">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        BREAKING :
      </div>

      {/* Ticker Content */}
      <div className="flex-1 overflow-hidden min-w-0 relative h-[22px] z-10">
        {news.map((item, index) => (
          <Link
            href={`/news/${item.slug}`}
            key={index}
            className={`absolute top-0 left-0 w-full whitespace-nowrap overflow-hidden text-ellipsis font-serif font-semibold text-[15px] text-white cursor-pointer hover:text-yellow-300 transition-all duration-500 ease-in-out block ${index === currentIndex
              ? 'opacity-100 translate-y-0 z-10'
              : index < currentIndex
                ? 'opacity-0 -translate-y-4 -z-10 pointer-events-none'
                : 'opacity-0 translate-y-4 -z-10 pointer-events-none'
              }`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 shrink-0 ml-2 z-10">
        <button
          onClick={handlePrev}
          className="p-1.5 rounded-full hover:bg-red-700 transition-colors text-white/80 hover:text-white cursor-pointer"
          aria-label="Previous News"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
        </button>
        <button
          onClick={handleNext}
          className="p-1.5 rounded-full hover:bg-red-700 transition-colors text-white/80 hover:text-white cursor-pointer"
          aria-label="Next News"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default TopNewsTicker;
