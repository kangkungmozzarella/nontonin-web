import { QueryClient } from '@tanstack/react-query';

export const StaleTimes = {
  short: 60 * 1000,
  long: 10 * 60 * 1000,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: StaleTimes.short,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
