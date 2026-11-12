import { useRouter } from 'next/router';
import React from 'react';
import { buildUrl, NavigationRoutes, RouteParams } from 'common/routes';

// Typed wrapper around next/router, like kurosim-webapp's useKurosimNavigation
export default function useNontoninNavigation() {
  const router = useRouter();
  return React.useMemo(
    () => ({
      push<R extends NavigationRoutes>(route: R, params?: RouteParams[R]) {
        return router.push(buildUrl(route, params));
      },
      replace<R extends NavigationRoutes>(route: R, params?: RouteParams[R]) {
        return router.replace(buildUrl(route, params));
      },
      back(fallback: NavigationRoutes = NavigationRoutes.Home) {
        if (typeof window !== 'undefined' && window.history.length > 1)
          router.back();
        else router.push(fallback);
      },
      currentRoute: router.pathname as NavigationRoutes,
    }),
    [router],
  );
}
