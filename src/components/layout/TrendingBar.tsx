'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp } from 'lucide-react';
import { trendingTopics } from '@/config/navigation';
import { useSearchStore } from '@/store/search.store';

export const TrendingBar: React.FC = () => {
  const router = useRouter();
  const { setQuery } = useSearchStore();

  const handleTagClick = (topic: string) => {
    setQuery(topic);
    router.push(`/search?q=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="border-b border-slate-100 bg-slate-50 py-2.5">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 font-sans text-xs sm:px-6 lg:px-8">
        
        {/* Label */}
        <div className="flex shrink-0 items-center gap-1.5 font-bold text-red-600">
          <TrendingUp className="h-4 w-4" />
          <span>ट्रेंडिंग:</span>
        </div>

        {/* Scrollable list of topics */}
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-0.5">
          {trendingTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(topic)}
              className="shrink-0 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-slate-600 transition-all duration-200 hover:border-brand-purple hover:bg-brand-purple-light hover:text-brand-purple"
            >
              {topic}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TrendingBar;
