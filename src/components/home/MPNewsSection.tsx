'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import { SectionHeading } from '../common/SectionHeading';
import { ArticleCard } from '../article/ArticleCard';
import { REGIONS } from '@/lib/constants';
import { ChevronLeft, ChevronRight, ChevronsRight, MapPin } from 'lucide-react';
import { WeatherWidget } from '../widgets/WeatherWidget';
import { CricketScoreWidget } from '../widgets/CricketScoreWidget';
import { NewsletterWidget } from '../widgets/NewsletterWidget';

interface MPNewsSectionProps {
  articles: Article[];
}

export const MPNewsSection: React.FC<MPNewsSectionProps> = ({ articles }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
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
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    handleScroll();
    // Add window resize listener to update arrow visibility if screen width changes
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [articles]);

  const filteredArticles = activeTab === 'all'
    ? articles
    : activeTab === 'और भी'
      ? articles.filter(art =>
        !art.tags?.some(tag => tag.includes('भोपाल') || tag.includes('इंदौर') || tag.includes('जबलपुर')) &&
        !art.title.includes('भोपाल') && !art.title.includes('इंदौर') && !art.title.includes('जबलपुर')
      )
      : articles.filter(art =>
        art.tags?.some(tag => tag.includes(activeTab)) ||
        art.title.includes(activeTab) ||
        art.excerpt.includes(activeTab)
      );

  return (
    <section className="py-4 border-b border-slate-100">
      <div className="w-full">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 pb-3 relative px-[10px]">

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-serif flex items-center gap-2">
              मध्य प्रदेश
            </h2>
          </div>

          {/* Regional City Tabs with Scroll Controls */}
          <div className="relative group/scroll w-full md:w-auto md:max-w-[55%] lg:max-w-[65%] shrink-0">
            {/* Left Arrow & Gradient Overlay */}
            {showLeftArrow && (
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 hidden md:flex items-center pointer-events-none">
                <button
                  onClick={() => scroll('left')}
                  className="pointer-events-auto flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-brand-purple hover:border-brand-purple hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ml-1"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
              </div>
            )}

            {/* Right Arrow & Gradient Overlay */}
            {showRightArrow && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 hidden md:flex items-center justify-end pointer-events-none">
                <button
                  onClick={() => scroll('right')}
                  className="pointer-events-auto flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-brand-purple hover:border-brand-purple hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer mr-1"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 pt-1 scroll-smooth snap-x select-none px-1 md:px-1"
            >
              <button
                onClick={() => setActiveTab('all')}
                className={`shrink-0 rounded-[10px] px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-300 border cursor-pointer ${activeTab === 'all'
                    ? 'bg-brand-purple text-white border-brand-purple'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand-purple/40 hover:text-brand-purple hover:bg-brand-purple/5'
                  }`}
              >
                सभी ज़िले
              </button>
              {REGIONS.map((region) => (
                <button
                  key={region.value}
                  onClick={() => setActiveTab(region.name)}
                  className={`shrink-0 rounded-[10px] px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-300 border cursor-pointer ${activeTab === region.name
                      ? 'bg-brand-purple text-white border-brand-purple'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-brand-purple/40 hover:text-brand-purple hover:bg-brand-purple/5'
                    }`}
                >
                  {region.name}
                </button>
              ))}
              <Link
                href="/category/madhya-pradesh"
                className="shrink-0 flex items-center justify-center gap-1 rounded-[10px] px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-300 border cursor-pointer bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 group"
              >
                और भी
                <ChevronsRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Integrated bottom border design */}
          <div className="absolute bottom-0 left-[10px] right-[10px] h-[1px] bg-slate-200" />
          <div className="absolute bottom-0 left-[10px] h-[3px] w-24 rounded-full bg-brand-yellow -mb-[1px]" />
        </div>

        {/* Main Layout: Left Articles, Right Widgets */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Articles Grid */}
          <div className="flex-1 min-w-0">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-sans border border-slate-100 rounded-2xl bg-slate-50">
                इस क्षेत्र के लिए फ़िलहाल कोई खबर उपलब्ध नहीं है।
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArticles.slice(0, 9).map((art, index) => (
                  <ArticleCard key={`${art.id}-${index}`} article={art} layout="vertical" variant="simple" />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sidebar Widgets */}
          <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0 flex flex-col gap-6 h-full">
            <CricketScoreWidget />
            <WeatherWidget />
            <NewsletterWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MPNewsSection;

