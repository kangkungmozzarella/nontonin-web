import { useQuery } from '@tanstack/react-query';
import { catalog } from 'common/api/catalog';
import { StaleTimes } from 'common/api/query-client';
import useLanguage from 'hooks/use-language';

export const promoKey = {
  listKey: 'getPromos',
  list(lang: string) {
    return [promoKey.listKey, lang];
  },
};

export function useGetPromos() {
  const { lang } = useLanguage();
  return useQuery(promoKey.list(lang), () => catalog.getPromos(lang), {
    staleTime: StaleTimes.long,
  });
}
