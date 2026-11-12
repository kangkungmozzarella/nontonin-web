import { NavigationRoutes } from './route';

// Typed path segments and query strings for each route
export interface RouteParams {
  [NavigationRoutes.Home]: { paths?: never; query?: never };
  [NavigationRoutes.Films]: { paths?: never; query?: { tab?: 'now' | 'soon' } };
  [NavigationRoutes.FilmDetail]: {
    paths: { id: string };
    query?: { date?: string };
  };
  [NavigationRoutes.Cinemas]: { paths?: never; query?: never };
  [NavigationRoutes.CinemaDetail]: {
    paths: { id: string };
    query?: { date?: string };
  };
  [NavigationRoutes.Seat]: {
    paths: { showtimeId: string };
    query?: { seat?: string; view?: string };
  };
  [NavigationRoutes.Checkout]: {
    paths: { showtimeId: string };
    query: { seats: string };
  };
  [NavigationRoutes.Tickets]: { paths?: never; query?: never };
  [NavigationRoutes.TicketDetail]: {
    paths: { id: string };
    query?: { new?: string };
  };
  [NavigationRoutes.About]: { paths?: never; query?: never };
}

// Optional `never` parts (routes without paths or query) collapse to `unknown`
type Part<T> = [NonNullable<T>] extends [never] ? unknown : NonNullable<T>;

export type RouterQueryType<R extends NavigationRoutes> = Part<
  RouteParams[R]['paths']
> &
  Part<RouteParams[R]['query']>;

export function buildUrl<R extends NavigationRoutes>(
  route: R,
  params?: RouteParams[R],
) {
  let path: string = route;
  const paths = (params?.paths ?? {}) as Record<string, string>;
  Object.entries(paths).forEach(([k, v]) => {
    path = path.replace(`[${k}]`, encodeURIComponent(v));
  });
  const query = Object.entries(
    (params?.query ?? {}) as Record<string, string | undefined>,
  ).filter(([, v]) => v !== undefined && v !== '');
  if (!query.length) return path;
  return `${path}?${new URLSearchParams(query as [string, string][])}`;
}
