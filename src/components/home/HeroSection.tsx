'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ChevronRight } from 'lucide-react';
import { Article } from '@/types/article';
import { Button } from '../common/Button';

interface HeroSectionProps {
  featuredArticle?: Article;
  latestArticles: Article[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredArticle,
  latestArticles
}) => {
  if (!featuredArticle) return null;

  return (
    <section className="py-6 border-b border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Side: Large Featured Banner (Col-span-2) */}
        <div className="lg:col-span-2 flex flex-col justify-center border border-slate-200/60 rounded-2xl p-4 sm:p-6 bg-white shadow-sm transition-all duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Featured Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 shadow-md border border-slate-100/50">
              <Image
                src={featuredArticle.thumbnail}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
            </div>
            
            {/* Featured Text */}
            <div className="flex flex-col justify-center">
              <span className="inline-block text-[10px] font-black uppercase tracking-wider text-brand-purple mb-2">
                {featuredArticle.category.name} • मुख्य समाचार
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                {featuredArticle.title}
              </h1>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed font-sans line-clamp-4">
                {featuredArticle.excerpt}
              </p>
              
              <Link href={`/news/${featuredArticle.slug}`} className="mt-6 self-start group">
                <Button className="bg-gradient-to-r from-brand-navy to-brand-navy-light border border-slate-700/50 text-white text-[11px] px-3.5 py-1.5 rounded-[8px] font-bold font-sans transition-all duration-300 shadow-[0_4px_12px_rgba(4,30,66,0.3)] hover:shadow-[0_6px_20px_rgba(4,30,66,0.5)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1 overflow-hidden relative">
                  <span className="relative z-10">Read More</span>
                  <div className="relative z-10 flex items-center justify-center bg-white/10 rounded-full w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-white/20">
                    <ChevronRight className="w-3 h-3" />
                  </div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-purple to-brand-navy-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Right Side: List of Trending headlines */}
        <div className="flex flex-col border border-slate-200/60 rounded-2xl p-4 sm:p-5 bg-white justify-between">
          <div className="space-y-4">
            <h2 className="font-serif text-lg font-bold text-brand-navy pb-2 border-b border-slate-100 flex items-center gap-1.5">
              ⚡ आज की सुर्खियां
            </h2>
            
            <div className="divide-y divide-slate-100">
              {latestArticles.slice(0, 3).map((art) => (
                <Link
                  key={art.id}
                  href={`/news/${art.slug}`}
                  className="flex items-start gap-3 py-3 group cursor-pointer first:pt-0 last:pb-0"
                >
                  <div className="mt-1 shrink-0 rounded-full bg-slate-50 p-1.5 text-brand-navy group-hover:bg-brand-purple-light group-hover:text-brand-purple transition-all duration-200">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold leading-snug text-slate-800 group-hover:text-brand-purple transition-colors duration-200 line-clamp-2">
                      {art.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 mt-1 block font-sans font-semibold">
                      {art.publishedAt}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
