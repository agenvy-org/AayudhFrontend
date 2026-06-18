'use client';

import React, { useState } from 'react';
import { Article } from '@/types/article';
import { SectionHeading } from '../common/SectionHeading';
import { ArticleCard } from '../article/ArticleCard';
import { CricketWidget } from '../widgets/CricketWidget';
import { REGIONS } from '@/lib/constants';

interface MPNewsSectionProps {
  articles: Article[];
}

export const MPNewsSection: React.FC<MPNewsSectionProps> = ({ articles }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredArticles = activeTab === 'all'
    ? articles
    : articles.filter(art => 
        art.tags?.some(tag => tag.includes(activeTab)) || 
        art.title.includes(activeTab) || 
        art.excerpt.includes(activeTab)
      );



  return (
    <section className="py-8 border-b border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Grid: MP News (col-span-8) */}
        <div className="lg:col-span-8">
          <SectionHeading
            title="Madhya Pradesh News"
            subtitle="भोपाल, इंदौर, जबलपुर, ग्वालियर और सभी जिलों की खबरें"
            accentColor="purple"
          />

          {/* Regional City Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1.5 border-b border-slate-100 font-sans">
            <button
              onClick={() => setActiveTab('all')}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-brand-purple text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              सभी ज़िले
            </button>
            {REGIONS.map((region) => (
              <button
                key={region.value}
                onClick={() => setActiveTab(region.name)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === region.name
                    ? 'bg-brand-purple text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-sans">
              इस क्षेत्र के लिए फ़िलहाल कोई खबर उपलब्ध नहीं है।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.slice(0, 6).map((art) => (
                <ArticleCard key={art.id} article={art} layout="vertical" />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar: Cricket Live Widget (col-span-4) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <CricketWidget />
        </div>

      </div>
    </section>
  );
};

export default MPNewsSection;
