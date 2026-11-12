// Every env value is read here, never straight from process.env elsewhere.
// TMDB_TOKEN is server-only: it is used by the /api/tmdb proxy and never
// reaches the browser. The client only learns whether it is set.
const exportEnv = {
  tmdbToken: process.env.TMDB_TOKEN ?? '',
  tmdbEnabled: process.env.NEXT_PUBLIC_TMDB_ENABLED === '1',
};

export default exportEnv;
