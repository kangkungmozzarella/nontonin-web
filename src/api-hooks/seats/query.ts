import { useQuery } from '@tanstack/react-query';
import { mockServer } from 'common/api/mock/server';

export const seatKey = {
  mapKey: 'getSeatMap',
  map(showtimeId: string) {
    return [seatKey.mapKey, showtimeId];
  },
};

export function useGetSeatMap(input: { showtimeId?: string }) {
  return useQuery(
    seatKey.map(input.showtimeId ?? ''),
    () => mockServer.getSeatMap(input.showtimeId!),
    {
      enabled: !!input.showtimeId,
      staleTime: 0,
    },
  );
}
