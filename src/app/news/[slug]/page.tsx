'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { useArticle, useRelatedArticles } from '@/hooks/useArticles';
import { ArticleContent } from '@/components/article/ArticleContent';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { StockWidget } from '@/components/widgets/StockWidget';
import { Loader } from '@/components/common/Loader';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const { data: article, isLoading, isError } = useArticle(slug);
  const { data: related } = useRelatedArticles(slug, article?.category.slug || '');

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader size="lg" />
        <p className="mt-4 text-xs font-semibold text-slate-500 animate-pulse font-sans">
          खबर लोड हो रही है...
        </p>
      </div>
    );
  }

  if (isError || !article) {
    notFound();
  }

  return (
    <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Full Editorial Article */}
      <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-6 shadow-sm">
        <ArticleContent article={article} />
        {related && related.length > 0 && (
          <RelatedArticles articles={related} />
        )}
      </div>

      {/* Right Column: Widgets Sidebar */}
      <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
        <WeatherWidget />
        <StockWidget />
      </div>

    </div>
  );
}
