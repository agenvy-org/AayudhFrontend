import { useQuery } from '@tanstack/react-query';
import { articleService } from '../services/article.service';

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: () => articleService.getArticles(),
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => articleService.getArticleBySlug(slug),
    enabled: !!slug,
  });
};

export const useFeaturedArticle = () => {
  return useQuery({
    queryKey: ['featuredArticle'],
    queryFn: () => articleService.getFeaturedArticle(),
  });
};

export const useArticlesByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['articlesCategory', categorySlug],
    queryFn: () => articleService.getArticlesByCategory(categorySlug),
    enabled: !!categorySlug,
  });
};

export const useRelatedArticles = (slug: string, categorySlug: string) => {
  return useQuery({
    queryKey: ['relatedArticles', slug, categorySlug],
    queryFn: () => articleService.getRelatedArticles(slug, categorySlug),
    enabled: !!slug && !!categorySlug,
  });
};

export const useSearchArticles = (query: string) => {
  return useQuery({
    queryKey: ['searchArticles', query],
    queryFn: () => articleService.searchArticles(query),
    enabled: query !== undefined,
  });
};
