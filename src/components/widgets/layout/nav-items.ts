import {
  FilmStrip,
  House,
  Info,
  MapPinLine,
  Ticket,
  type Icon,
} from '@phosphor-icons/react';
import { NavigationRoutes } from 'common/routes';

export interface NavItem {
  route: NavigationRoutes;
  key: 'home' | 'films' | 'cinemas' | 'tickets' | 'about';
  icon: Icon;
}

export const NAV_ITEMS: NavItem[] = [
  { route: NavigationRoutes.Home, key: 'home', icon: House },
  { route: NavigationRoutes.Films, key: 'films', icon: FilmStrip },
  { route: NavigationRoutes.Cinemas, key: 'cinemas', icon: MapPinLine },
  { route: NavigationRoutes.Tickets, key: 'tickets', icon: Ticket },
  { route: NavigationRoutes.About, key: 'about', icon: Info },
];

// Film, seat and checkout pages belong to the booking flow under "Films";
// cinema detail under "Cinemas"; ticket detail under "My tickets"
export function isActive(item: NavItem, pathname: string) {
  switch (item.key) {
    case 'home':
      return pathname === '/';
    case 'films':
      return /^\/(films|seat|checkout)/.test(pathname);
    default:
      return pathname.startsWith(item.route);
  }
}
