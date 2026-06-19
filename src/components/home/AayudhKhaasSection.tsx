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
      <SectionHeading title="आयुध ख़ास" accentColor="navy" actionLink="/category/aayudh-khaas" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.slice(0, 6).map((art) => (
          <ArticleCard key={art.id} article={art} layout="vertical" variant="simple" />
        ))}
      </div>
    </section>
  );
};

export default AayudhKhaasSection;
