import ky, { Options } from 'ky';

// Client for the app's own API routes (src/pages/api)
export const apiClient = ky.create({
  prefixUrl: '/api',
  timeout: 15000,
  retry: 1,
});

interface ApiFetchInput {
  url: string;
  method?: 'get' | 'post';
  params?: Record<string, string | number | undefined>;
  body?: unknown;
}

export async function ApiFetch<T>({
  url,
  method = 'get',
  params,
  body,
}: ApiFetchInput): Promise<T> {
  const options: Options = { method };
  if (params) {
    const searchParams: Record<string, string> = {};
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) searchParams[k] = String(v);
    });
    options.searchParams = searchParams;
  }
  if (body !== undefined) options.json = body;
  return apiClient(url.replace(/^\//, ''), options).json<T>();
}
