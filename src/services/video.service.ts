import { mockVideos } from '../data/mockVideos';
import { fetcher } from '../lib/api';
import { Video } from '../types/video';

export const videoService = {
  async getVideos(): Promise<Video[]> {
    return fetcher(mockVideos);
  },
  async getVideosByType(type: 'explainer' | 'normal' | 'podcast'): Promise<Video[]> {
    const filtered = mockVideos.filter(v => v.type === type);
    return fetcher(filtered);
  },
  async getVideoBySlug(slug: string): Promise<Video | undefined> {
    const video = mockVideos.find(v => v.slug === slug);
    return fetcher(video);
  }
};
export type VideoService = typeof videoService;
