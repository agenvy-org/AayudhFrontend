import { mockPodcasts } from '../data/mockPodcasts';
import { fetcher } from '../lib/api';
import { Podcast } from '../types/podcast';

export const podcastService = {
  async getPodcasts(): Promise<Podcast[]> {
    return fetcher(mockPodcasts);
  },
  async getPodcastBySlug(slug: string): Promise<Podcast | undefined> {
    const podcast = mockPodcasts.find(p => p.slug === slug);
    return fetcher(podcast);
  }
};
export type PodcastService = typeof podcastService;
