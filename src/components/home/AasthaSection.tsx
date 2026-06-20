'use client';

import React, { useState, useEffect } from 'react';
import { articleService } from '@/services/article.service';
import { Article } from '@/types/article';
import { Loader } from '../common/Loader';
import { SectionHeading } from '../common/SectionHeading';
import { ArticleCard } from '../article/ArticleCard';

export const AasthaSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articleService.getArticlesByCategory('aastha');
        // Get the latest 3 articles for the homepage section
        setArticles(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <Loader size="md" className="py-12" />;
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
