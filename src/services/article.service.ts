import { mockArticles } from '../data/mockArticles';
import { fetcher } from '../lib/api';
import { Article } from '../types/article';

export const articleService = {
  async getArticles(): Promise<Article[]> {
    return fetcher(mockArticles);
  },
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const article = mockArticles.find(a => a.slug === slug);
    return fetcher(article);
  },
  async getFeaturedArticle(): Promise<Article | undefined> {
    const featured = mockArticles.find(a => a.isFeatured);
    return fetcher(featured || mockArticles[0]);
  },
  async getArticlesByCategory(categorySlug: string): Promise<Article[]> {
    const filtered = mockArticles.filter(a => a.category.slug === categorySlug);
    return fetcher(filtered);
  },
  async getRelatedArticles(slug: string, categorySlug: string, limit: number = 3): Promise<Article[]> {
    const related = mockArticles.filter(a => a.category.slug === categorySlug && a.slug !== slug);
    return fetcher(related.slice(0, limit));
  },
  async searchArticles(query: string): Promise<Article[]> {
    if (!query) return fetcher([]);
    const lowerQuery = query.toLowerCase();
    const results = mockArticles.filter(
      a =>
        a.title.toLowerCase().includes(lowerQuery) ||
        a.excerpt.toLowerCase().includes(lowerQuery) ||
        a.content.toLowerCase().includes(lowerQuery)
    );
    return fetcher(results);
  }
};
export type ArticleService = typeof articleService;
