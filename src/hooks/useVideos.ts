import { useQuery } from '@tanstack/react-query';
import { videoService } from '../services/video.service';
import { podcastService } from '../services/podcast.service';

export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: () => videoService.getVideos(),
  });
};

export const useVideosByType = (type: 'explainer' | 'normal' | 'podcast') => {
  return useQuery({
    queryKey: ['videos', type],
    queryFn: () => videoService.getVideosByType(type),
  });
};

export const usePodcasts = () => {
  return useQuery({
    queryKey: ['podcasts'],
    queryFn: () => podcastService.getPodcasts(),
  });
};
