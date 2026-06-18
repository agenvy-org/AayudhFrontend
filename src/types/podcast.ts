export interface Podcast {
  id: string;
  title: string;
  slug: string;
  audioUrl: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
  host: string;
  description?: string;
}
