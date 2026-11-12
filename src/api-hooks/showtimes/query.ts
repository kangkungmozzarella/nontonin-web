import { useQuery } from '@tanstack/react-query';
import { mockServer } from 'common/api/mock/server';
import { useGetFilms } from 'api-hooks/films/query';

export const showtimeKey = {
  filmScheduleKey: 'getFilmSchedule',
  cinemaScheduleKey: 'getCinemaSchedule',
  detailKey: 'getShowtime',
  filmSchedule(filmId: string, cityId: string, date: string) {
    return [showtimeKey.filmScheduleKey, filmId, cityId, date];
  },
  cinemaSchedule(cinemaId: string, date: string, films: string) {
    return [showtimeKey.cinemaScheduleKey, cinemaId, date, films];
  },
  detail(id: string) {
    return [showtimeKey.detailKey, id];
  },
};

// Every cinema in the city that plays the film on that date
export function useGetFilmSchedule(input: {
  filmId?: string;
  cityId: string;
  date: string;
}) {
  return useQuery(
    showtimeKey.filmSchedule(input.filmId ?? '', input.cityId, input.date),
    () => mockServer.getFilmSchedule(input.filmId!, input.cityId, input.date),
    { enabled: !!input.filmId },
  );
}

// Every now-playing film at one cinema on that date
export function useGetCinemaSchedule(input: {
  cinemaId?: string;
  date: string;
}) {
  const films = useGetFilms({ status: 'now' });
  const ids = (films.data ?? []).map((f) => f.id).join(',');
  const query = useQuery(
    showtimeKey.cinemaSchedule(input.cinemaId ?? '', input.date, ids),
    () =>
      mockServer.getCinemaSchedule(
        input.cinemaId!,
        input.date,
        films.data ?? [],
      ),
    { enabled: !!input.cinemaId && !!films.data },
  );
  return {
    ...query,
    isLoading: films.isLoading || query.isLoading,
    error: films.error || query.error,
  };
}

export function useGetShowtime(input: { id?: string }) {
  return useQuery(
    showtimeKey.detail(input.id ?? ''),
    () => mockServer.getShowtime(input.id!),
    {
      enabled: !!input.id,
    },
  );
}
