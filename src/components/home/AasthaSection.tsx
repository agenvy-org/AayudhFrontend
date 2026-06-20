'use client';

import React from 'react';
import { useArticlesByCategory } from '@/hooks/useArticles';
import { Loader } from '../common/Loader';
import { SectionHeading } from '../common/SectionHeading';
import { ArticleCard } from '../article/ArticleCard';

export const AasthaSection: React.FC = () => {
  const { data: articlesData, isLoading } = useArticlesByCategory('aastha');

  if (isLoading) return <Loader size="md" className="py-12" />;

  const articles = articlesData?.slice(0, 3) || [];
  if (articles.length === 0) return null;

  return (
    <section className="py-4 border-b border-slate-100 font-sans">
      <SectionHeading 
        title="आस्था और अध्यात्म" 
        actionLink="/aastha" 
        actionText="और पढ़ें" 
        hideLine={true}
        accentColor="amber"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            layout="vertical"
            variant="simple"
          />
        ))}
      </div>
    </section>
  );
};

export default AasthaSection;
