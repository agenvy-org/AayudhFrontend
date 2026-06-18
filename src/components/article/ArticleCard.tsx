'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Article } from '@/types/article';
import { Card } from '../common/Card';

interface ArticleCardProps {
  article: Article;
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  layout = 'vertical',
  className
}) => {
  return (
    <Link href={`/news/${article.slug}`} className="block h-full">
      <Card className={cn(
        "group overflow-hidden p-0 h-full flex bg-white",
        layout === 'horizontal' ? 'flex-col sm:flex-row' : 'flex-col',
        className
      )}>
        {/* Thumbnail Image */}
        <div className={cn(
          "relative overflow-hidden bg-slate-100 shrink-0",
          layout === 'horizontal' ? 'w-full sm:w-48 h-36' : 'aspect-video w-full'
        )}>
          <img
            src={article.thumbnail}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content Details */}
        <div className="flex flex-1 flex-col p-4 justify-between">
          <div>
            {/* Category tag */}
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-purple mb-1.5">
              {article.category.name}
            </span>

            {/* Headline */}
            <h3 className="font-serif text-base font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-brand-purple transition-colors duration-200">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
              {article.excerpt}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="mt-3.5 flex items-center justify-between text-[10px] text-slate-400 font-semibold border-t border-slate-50 pt-2.5 font-sans">
            <span>{article.author.name}</span>
            <div className="flex items-center gap-1.5">
              <span>{article.publishedAt}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
