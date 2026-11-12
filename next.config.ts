import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // The browser only learns whether TMDB is on; the token stays on the server
  env: { NEXT_PUBLIC_TMDB_ENABLED: process.env.TMDB_TOKEN ? '1' : '' },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },
};

export default withVanillaExtract(nextConfig);
