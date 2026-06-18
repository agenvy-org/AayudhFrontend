'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Short } from '@/types/shorts';
import { SectionHeading } from '../common/SectionHeading';
import { ShortsCard } from '../video/ShortsCard';

interface ShortsSectionProps {
  shorts: Short[];
}

export const ShortsSection: React.FC<ShortsSectionProps> = ({ shorts }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8 border-b border-slate-100">
      <div className="flex justify-between items-end mb-4">
        <div className="flex-1">
          <SectionHeading
            title="Shorts Section"
            subtitle="Vertical short news cards for mobile-first audience"
            accentColor="purple"
            className="mb-0 border-b-0 pb-0"
          />
        </div>
        
        {/* Navigation arrows (Desktop only) */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple-light transition-all cursor-pointer"
            aria-label="पीछे स्क्रॉल करें"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple-light transition-all cursor-pointer"
            aria-label="आगे स्क्रॉल करें"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 px-1 snap-x scroll-smooth"
      >
        {shorts.map((short) => (
          <div key={short.id} className="snap-start">
            <ShortsCard short={short} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShortsSection;
