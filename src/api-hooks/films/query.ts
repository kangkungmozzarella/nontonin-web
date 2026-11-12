import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { catalog } from 'common/api/catalog';
import { StaleTimes } from 'common/api/query-client';
import useLanguage from 'hooks/use-language';
import { FilmModel, FilmStatus } from './model';

export const filmKey = {
  listKey: 'getFilms',
  detailKey: 'getFilm',
  list(status: FilmStatus, lang: string) {
    return [filmKey.listKey, status, lang];
  },
  detail(id: string, lang: string) {
    return [filmKey.detailKey, id, lang];
  },
};

export function useGetFilms(
  input: { status: FilmStatus },
  options?: UseQueryOptions<FilmModel[]>,
) {
  const { lang } = useLanguage();
  return useQuery(
    filmKey.list(input.status, lang),
    () => catalog.getFilms(input.status, lang),
    {
      staleTime: StaleTimes.long,
      ...options,
    },
  );
}

export function useGetFilm(
  input: { id?: string },
  options?: UseQueryOptions<FilmModel>,
) {
  const { lang } = useLanguage();
  return useQuery(
    filmKey.detail(input.id ?? '', lang),
    () => catalog.getFilm(input.id!, lang),
    {
      staleTime: StaleTimes.long,
      enabled: !!input.id,
      ...options,
    },
  );
}
