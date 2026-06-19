'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearchArticles } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { EmptyState } from '@/components/common/EmptyState';
import { Loader } from '@/components/common/Loader';
import { Input } from '@/components/common/Input';
import { Search } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [triggerQuery, setTriggerQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
    setTriggerQuery(initialQuery);
  }, [initialQuery]);

  const { data: results, isLoading } = useSearchArticles(triggerQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTriggerQuery(searchQuery);
  };

  return (
    <div className="pt-10 pb-8 font-sans">
      {/* Large search input form */}
      <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-10">
        <div className="relative w-full flex gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white p-2 rounded-2xl border border-slate-100">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="शीर्षक, स्थान या मुख्य शब्द टाइप करें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10 pr-4 text-sm"
            />
            <Search className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-400" />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-brand-purple hover:bg-brand-purple-dark text-white text-sm px-6 py-2.5 font-bold transition-all shadow-sm flex items-center justify-center cursor-pointer"
          >
            खोजें
          </button>
        </div>
      </form>

      {/* Query label */}
      {triggerQuery && (
        <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
          &ldquo;{triggerQuery}&rdquo; के लिए खोज परिणाम ({results?.length || 0} मिले)
        </p>
      )}

      {/* Grid listing */}
      {isLoading ? (
        <Loader size="lg" className="py-12" />
      ) : results && results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((art) => (
            <ArticleCard key={art.id} article={art} layout="vertical" />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="कोई परिणाम नहीं मिला" 
          description="आपके खोज शब्द के लिए कोई खबर नहीं मिली। कृपया कोई अन्य शब्द टाइप करें।" 
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader size="lg" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
