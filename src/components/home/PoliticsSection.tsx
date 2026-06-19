'use client';

import React from 'react';
import { Article } from '@/types/article';
import { SectionHeading } from '../common/SectionHeading';
import { ArticleCard } from '../article/ArticleCard';

interface PoliticsSectionProps {
  articles: Article[];
}

export const PoliticsSection: React.FC<PoliticsSectionProps> = ({ articles }) => {
  return (
    <section className="py-4 border-b border-slate-100">
      <SectionHeading title="राजनीती" accentColor="navy" actionLink="/category/politics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.slice(0, 4).map((art, index) => (
          <ArticleCard key={`${art.id}-${index}`} article={art} layout="vertical" variant="simple" />
        ))}
      </div>
    </section>
  );
};

export default PoliticsSection;
