import React from 'react';
import { notFound } from 'next/navigation';
import { articleService } from '@/services/article.service';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { EmptyState } from '@/components/common/EmptyState';
import { mockCategories } from '@/data/mockArticles';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockCategories.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = mockCategories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const articles = await articleService.getArticlesByCategory(slug);

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
            <ArticleCard key={art.id} article={art} layout="vertical" variant="simple" />
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
