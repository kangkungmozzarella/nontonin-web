import { useQuery } from '@tanstack/react-query';
import { mockServer } from 'common/api/mock/server';
import { StaleTimes } from 'common/api/query-client';

export const cityKey = { listKey: 'getCities' };

export function useGetCities() {
  return useQuery([cityKey.listKey], () => mockServer.getCities(), {
    staleTime: StaleTimes.long,
  });
}
