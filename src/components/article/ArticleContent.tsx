'use client';

import React from 'react';
import Image from 'next/image';
import { Article } from '@/types/article';
import { AuthorBox } from './AuthorBox';
import { ShareButtons } from './ShareButtons';
import { CommentSection } from './CommentSection';
import { Eye, Calendar, Clock } from 'lucide-react';

interface ArticleContentProps {
  article: Article;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article className="max-w-3xl mx-auto py-4">
      {/* Category tag */}
      <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-purple bg-brand-purple-light px-3 py-1 rounded-full font-sans">
        {article.category.name}
      </span>

      {/* Main Headline */}
      <h1 className="mt-4 font-serif text-3xl md:text-4xl font-bold leading-tight text-slate-900">
        {article.title}
      </h1>

      {/* Excerpt */}
      <p className="mt-4 text-base text-slate-600 leading-relaxed border-l-4 border-brand-purple/40 pl-4 font-sans italic">
        {article.excerpt}
      </p>

      {/* Metadata Bar */}
      <div className="mt-6 border-y border-slate-100 py-3.5 flex flex-wrap gap-4 items-center justify-between font-sans text-xs text-slate-500 font-semibold">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.publishedAt}</span>
          </div>

          {article.views && (
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>{article.views} व्यूज</span>
            </div>
          )}
        </div>
        <ShareButtons url={currentUrl} title={article.title} />
      </div>

      {/* Main Image */}
      <div className="relative mt-6 rounded-2xl overflow-hidden aspect-video bg-slate-100 shadow-sm border border-slate-100">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      {/* Editorial Content paragraphs */}
      <div className="mt-8 font-serif text-slate-800 text-[21px] md:text-[23px] leading-[1.8] space-y-7">
        {article.content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Tag list */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1 rounded-full font-sans"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Author Box */}
      <div className="mt-8">
        <AuthorBox author={article.author} />
      </div>

      {/* Comment Section */}
      <CommentSection />
    </article>
  );
};

export default ArticleContent;
