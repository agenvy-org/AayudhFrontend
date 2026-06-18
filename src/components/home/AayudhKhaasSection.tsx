'use client';

import React from 'react';
import { Article } from '@/types/article';
import { SectionHeading } from '../common/SectionHeading';
import { ArticleCard } from '../article/ArticleCard';

interface AayudhKhaasSectionProps {
  articles: Article[];
}

export const AayudhKhaasSection: React.FC<AayudhKhaasSectionProps> = ({ articles }) => {
  return (
    <section className="py-8 border-b border-slate-100">
      <SectionHeading title="आयुध ख़ास" accentColor="navy" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((art) => (
          <ArticleCard key={art.id} article={art} layout="vertical" />
        ))}
      </div>
    </section>
  );
};

export default AayudhKhaasSection;
