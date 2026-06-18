import { mockShorts } from '../data/mockShorts';
import { fetcher } from '../lib/api';
import { Short } from '../types/shorts';

export const shortsService = {
  async getShorts(): Promise<Short[]> {
    return fetcher(mockShorts);
  },
  async getShortBySlug(slug: string): Promise<Short | undefined> {
    const short = mockShorts.find(s => s.slug === slug);
    return fetcher(short);
  }
};
export type ShortsService = typeof shortsService;
