import { mockCategories } from '../data/mockArticles';
import { fetcher } from '../lib/api';
import { Category } from '../types/category';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    return fetcher(mockCategories);
  },
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const category = mockCategories.find(c => c.slug === slug);
    return fetcher(category);
  }
};
export type CategoryService = typeof categoryService;
