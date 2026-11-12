import type { NextApiRequest, NextApiResponse } from 'next';
import exportEnv from 'common/config';

const BASE = 'https://api.themoviedb.org/3';
// Only the read endpoints the catalogue uses may be proxied
const ALLOWED = [
  /^movie\/(now_playing|upcoming)$/,
  /^movie\/\d+$/,
  /^genre\/movie\/list$/,
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!exportEnv.tmdbToken)
    return res.status(503).json({ error: 'tmdb_disabled' });

  const parts = req.query.path;
  const path = (Array.isArray(parts) ? parts : [parts]).join('/');
  if (!ALLOWED.some((r) => r.test(path)))
    return res.status(404).json({ error: 'not_found' });

  const search = new URLSearchParams();
  Object.entries(req.query).forEach(([k, v]) => {
    if (k !== 'path' && typeof v === 'string') search.set(k, v);
  });

  const upstream = await fetch(`${BASE}/${path}?${search}`, {
    headers: {
      Authorization: `Bearer ${exportEnv.tmdbToken}`,
      Accept: 'application/json',
    },
  });
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=3600',
  );
  res.status(upstream.status).json(await upstream.json());
}
