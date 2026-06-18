'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { useArticlesByCategory } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { EmptyState } from '@/components/common/EmptyState';
import { Loader } from '@/components/common/Loader';
import { mockCategories } from '@/data/mockArticles';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const category = mockCategories.find(c => c.slug === slug);
  const { data: articles, isLoading, isError } = useArticlesByCategory(slug);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader size="lg" />
        <p className="mt-4 text-xs font-semibold text-slate-500 animate-pulse font-sans">
          कैटेगरी की खबरें लोड हो रही हैं...
        </p>
      </div>
    );
  }

  // Handle case where category is not defined in mockCategories list
  if (isError || !category) {
    notFound();
  }

  return (
    <div className="py-6">
      <SectionHeading 
        title={category.name} 
        subtitle={`${category.name} की ताज़ा और महत्वपूर्ण खबरें`} 
        accentColor="purple" 
      />
      
      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} layout="vertical" />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="कोई खबर नहीं मिली" 
          description="इस कैटेगरी में अभी कोई खबर उपलब्ध नहीं है। कृपया बाद में जांचें।" 
        />
      )}
    </div>
  );
}
