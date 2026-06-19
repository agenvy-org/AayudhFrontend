import React from 'react';
import { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';

interface RelatedArticlesProps {
  articles: Article[];
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="mt-8 border-t border-slate-100 pt-8">
      <h3 className="font-serif text-lg font-bold text-slate-850 mb-4">संबंधित खबरें</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(0, 2).map((article) => (
          <ArticleCard key={article.id} article={article} layout="vertical" />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
