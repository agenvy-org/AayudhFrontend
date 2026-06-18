export interface Video {
  id: string;
  title: string;
  slug: string;
  url: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
  views?: string;
  category?: string;
  type: 'explainer' | 'normal' | 'podcast';
}
