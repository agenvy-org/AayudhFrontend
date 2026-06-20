'use client';

import React from 'react';
import { useArticlesByCategory } from '@/hooks/useArticles';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Loader } from '@/components/common/Loader';
import { ArticleCard } from '@/components/article/ArticleCard';

export default function AasthaPage() {
  const { data: articles = [], isLoading } = useArticlesByCategory('aastha');

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader size="lg" />
        <p className="mt-4 text-xs font-semibold text-slate-500 animate-pulse font-sans">
          लेख लोड हो रहे हैं...
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 font-sans">
      <SectionHeading 
        title="आस्था और अध्यात्म" 
        subtitle="धर्म, ज्योतिष, वास्तु और अध्यात्म से जुड़ी विशेष जानकारियां" 
        accentColor="amber" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {articles.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            layout="vertical"
            variant="simple"
          />
        ))}
        {articles.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            अभी कोई लेख उपलब्ध नहीं है।
          </div>
        )}
      </div>
    </div>
  );
}
