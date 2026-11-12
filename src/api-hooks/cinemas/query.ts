import { useQuery } from '@tanstack/react-query';
import { mockServer } from 'common/api/mock/server';
import { StaleTimes } from 'common/api/query-client';

export const cinemaKey = {
  listKey: 'getCinemas',
  detailKey: 'getCinema',
  list(cityId?: string) {
    return [cinemaKey.listKey, cityId];
  },
  detail(id: string) {
    return [cinemaKey.detailKey, id];
  },
};

export function useGetCinemas(input: { cityId?: string }) {
  return useQuery(
    cinemaKey.list(input.cityId),
    () => mockServer.getCinemas(input.cityId),
    {
      staleTime: StaleTimes.long,
    },
  );
}

export function useGetCinema(input: { id?: string }) {
  return useQuery(
    cinemaKey.detail(input.id ?? ''),
    () => mockServer.getCinema(input.id!),
    {
      staleTime: StaleTimes.long,
      enabled: !!input.id,
    },
  );
}
