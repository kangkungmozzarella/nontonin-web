import exportEnv from 'common/config';
import { ApiFetch } from './fetch';

const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const TMDB_ENABLED = exportEnv.tmdbEnabled;

// Calls TMDB through the /api/tmdb proxy, which adds the token on the server
export function tmdbGet<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
) {
  return ApiFetch<T>({ url: `tmdb${path}`, params });
}

export const tmdbImage = (
  path: string | null | undefined,
  size: 'w342' | 'w500' | 'w780' | 'w1280' | 'original',
) => (path ? `${IMAGE_BASE}/${size}${path}` : null);
