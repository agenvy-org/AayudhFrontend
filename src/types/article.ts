import { Category } from './category';

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: Category;
  author: Author;
  readTime: string;
  publishedAt: string;
  isFeatured?: boolean;
  views?: number;
  commentsCount?: number;
  tags?: string[];
}
