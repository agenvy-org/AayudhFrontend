import React from 'react';
import { notFound } from 'next/navigation';
import { articleService } from '@/services/article.service';
import { ArticleContent } from '@/components/article/ArticleContent';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { LiveUpdatesWidget } from '@/components/widgets/LiveUpdatesWidget';
import { WhatsAppWidget } from '@/components/widgets/WhatsAppWidget';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await articleService.getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await articleService.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await articleService.getRelatedArticles(slug, article.category.slug);

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
        <LiveUpdatesWidget />
        <WhatsAppWidget />
      </div>

    </div>
  );
}
