'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Article } from '@/types/article';
import { Card } from '../common/Card';
import { MapPin, Calendar } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  layout?: 'vertical' | 'horizontal';
  variant?: 'default' | 'simple';
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  layout = 'vertical',
  variant = 'simple',
  className
}) => {
  const isSimple = variant === 'simple';

  return (
    <Link href={`/news/${article.slug}`} className="block h-full">
      <Card className={cn(
        "group overflow-hidden h-full flex bg-white",
        isSimple ? "p-3.5 flex-col" : (layout === 'horizontal' ? 'flex-col sm:flex-row p-0' : 'flex-col p-0'),
        className
      )}>
        {/* Thumbnail Image */}
        <div className={cn(
          "relative overflow-hidden bg-slate-100 shrink-0",
          isSimple ? "aspect-video w-full rounded-xl" : (layout === 'horizontal' ? 'w-full sm:w-48 h-36' : 'aspect-video w-full')
        )}>
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        <div className={cn(
          "flex flex-1 flex-col",
          isSimple ? "pt-3 pb-2 w-full" : "p-4 justify-between"
        )}>
          {isSimple ? (
            <div className="w-full flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center mb-3">
                <h3 className="font-serif text-base font-extrabold text-slate-800 leading-snug line-clamp-2 group-hover:text-brand-purple transition-colors duration-200 text-center w-full px-2">
                  {article.title}
                </h3>
              </div>

              <div className="w-full border-t border-slate-100/80 pt-3 flex flex-wrap items-center justify-between gap-2 px-1 overflow-hidden">
                <div className="flex items-center gap-1.5 min-w-0 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#C3121E] shrink-0 -mt-[1px]" />
                  <span className="text-[11px] sm:text-xs font-semibold truncate">{article.location || 'Bhopal'}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 shrink-0 -mt-[1px]" />
                  <span className="text-[11px] sm:text-xs font-semibold whitespace-nowrap">Published: {article.fullPublishedDate || '18 May 2025, 10:30 AM'}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
