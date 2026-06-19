'use client';

import React from 'react';
import { Article } from '@/types/article';
import { SectionHeading } from '../common/SectionHeading';
import { ArticleCard } from '../article/ArticleCard';

interface LifestyleSectionProps {
  articles: Article[];
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({ articles }) => {
  return (
    <section className="py-4 border-b border-slate-100">
      <SectionHeading title="लाइफस्टाइल" accentColor="navy" actionLink="/category/lifestyle" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((art) => (
          <ArticleCard key={art.id} article={art} layout="vertical" variant="simple" />
        ))}
      </div>
    </section>
  );
};

export default LifestyleSection;
