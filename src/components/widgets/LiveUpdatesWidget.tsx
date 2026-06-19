'use client';

import React from 'react';
import { Clock, ChevronDown, Sparkles, Zap } from 'lucide-react';
import { useArticles } from '@/hooks/useArticles';
import Link from 'next/link';

export const LiveUpdatesWidget: React.FC = () => {
  const { data: articles, isLoading } = useArticles();
  
  // Take the 5 most recent articles for the widget
  const latestArticles = articles?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 font-sans relative group/widget overflow-hidden">
      {/* Premium top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-navy via-brand-purple to-[#ff4e50] z-20"></div>

      {/* Header Section */}
      <div className="relative p-5 sm:p-6 pb-4 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white pt-6">
        {/* Subtle background glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative flex items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full bg-brand-purple/5 animate-ping opacity-30"></div>
              <Zap className="w-4 h-4 text-brand-purple fill-brand-purple/10" />
            </div>
            <h3 className="font-serif text-[22px] font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-brand-navy to-slate-800 tracking-wide">
              लेटेस्ट अपडेट्स
            </h3>
          </div>
        </div>
      </div>
      
      <div className="p-3 sm:p-5 relative bg-white rounded-b-3xl">
        <div className="relative">
          {/* Vertical connecting line perfectly aligned with the center of the dots (left 17px) */}
          <div className="absolute left-[17px] top-[30px] bottom-[20px] w-[2px] bg-gradient-to-b from-brand-purple/30 via-slate-200 to-transparent"></div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative pl-12 py-3 animate-pulse">
                  <div className="absolute left-[13px] top-5 w-3.5 h-3.5 rounded-full bg-slate-200 ring-4 ring-white"></div>
                  <div className="h-3 w-20 bg-slate-200 rounded-full mb-3"></div>
                  <div className="h-4 w-full bg-slate-200 rounded-md mb-2"></div>
                  <div className="h-4 w-4/5 bg-slate-200 rounded-md"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {latestArticles.map((article, index) => (
                <div key={article.id} className="relative pl-10 sm:pl-12 group">
                  {/* Timeline Dot: Left aligned to 11px. Width is 14px. Center is 18px. Line is at 17px + 1px width = 18px center. */}
                  <div className="absolute left-[11px] top-[26px] z-10 flex items-center justify-center">
                    {index === 0 ? (
                      <div className="relative">
                        <div className="absolute -inset-1.5 bg-brand-purple/30 rounded-full animate-ping"></div>
                        <div className="relative w-[14px] h-[14px] rounded-full bg-brand-purple ring-[4px] ring-white shadow-sm"></div>
                      </div>
                    ) : (
                      <div className="relative w-[14px] h-[14px] rounded-full bg-slate-300 ring-[4px] ring-white shadow-sm group-hover:bg-brand-purple transition-colors duration-300"></div>
                    )}
                  </div>
                  
                  {/* Content Card */}
                  <Link 
                    href={`/news/${article.slug}`} 
                    className="block p-4 sm:p-5 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50 hover:shadow-sm transition-all duration-300"
                  >
                    {/* Category / Time Label */}
                    <div className={`text-[12px] font-black tracking-wide uppercase mb-2 flex items-center gap-2 ${
                      index === 0 ? 'text-brand-purple' : 'text-slate-400 group-hover:text-brand-purple/80'
                    } transition-colors duration-200`}>
                      {index === 0 ? 'अभी-अभी' : article.category.name}
                      {index === 0 && <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></span>}
                    </div>
                    
                    {/* Headline */}
                    <h4 className="text-slate-800 text-[15px] sm:text-[16px] font-bold leading-[1.4] group-hover:text-brand-purple transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h4>
                    
                    {/* Timestamp */}
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-3 font-semibold group-hover:text-slate-500 transition-colors">
                      <Clock className="w-3.5 h-3.5" />
                      {article.publishedAt}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LiveUpdatesWidget;
