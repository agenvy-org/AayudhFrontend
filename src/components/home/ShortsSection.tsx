'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { Short } from '@/types/shorts';
import { SectionHeading } from '../common/SectionHeading';
import { ShortsCard } from '../video/ShortsCard';

interface ShortsSectionProps {
  shorts: Short[];
}

export const ShortsSection: React.FC<ShortsSectionProps> = ({ shorts }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const hasOverflow = scrollWidth > clientWidth;
      setShowLeftArrow(hasOverflow && scrollLeft > 5);
      setShowRightArrow(hasOverflow && scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

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

  useEffect(() => {
    handleScroll();
    // Add window resize listener to update arrow visibility if screen width changes
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [shorts]);

  return (
    <section className="py-8 border-b border-slate-100 relative group/shorts">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-5 relative px-[10px]">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-serif">
          वीडियो शॉर्ट्स
        </h2>
        <Link
          href="/shorts"
          className="shrink-0 flex items-center justify-center gap-1 rounded-[10px] px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-300 border cursor-pointer bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 self-start md:self-auto group"
        >
          और भी
          <ChevronsRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        {/* Integrated bottom border design */}
        <div className="absolute bottom-0 left-[10px] right-[10px] h-[1px] bg-slate-200" />
        <div className="absolute bottom-0 left-[10px] h-[3px] w-24 rounded-full bg-brand-yellow -mb-[1px]" />
      </div>

      {/* Carousel Wrapper with Relative positioning for absolute arrows */}
      <div className="relative">
        {/* Left Navigation Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-8 h-12 rounded bg-white border border-slate-200/80 shadow-md text-slate-500 hover:text-brand-purple hover:border-brand-purple hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="पीछे स्क्रॉल करें"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Right Navigation Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-8 h-12 rounded bg-white border border-slate-200/80 shadow-md text-slate-500 hover:text-brand-purple hover:border-brand-purple hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="आगे स्क्रॉल करें"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 px-1 snap-x scroll-smooth"
        >
          {shorts.map((short) => (
            <div key={short.id} className="snap-start">
              <ShortsCard short={short} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortsSection;
