import { useQuery } from '@tanstack/react-query';
import { shortsService } from '../services/shorts.service';

export const useShorts = () => {
  return useQuery({
    queryKey: ['shorts'],
    queryFn: () => shortsService.getShorts(),
  });
};
