import {
  FilmStrip,
  House,
  Info,
  MapPinLine,
  Ticket,
  UserCircle,
  type Icon,
} from '@phosphor-icons/react';
import { NavigationRoutes } from 'common/routes';

export interface NavItem {
  route: NavigationRoutes;
  key: 'home' | 'films' | 'cinemas' | 'tickets' | 'profile' | 'about';
  icon: Icon;
  // Shown in the bottom bar on narrow screens (five slots; About lives in Profile there)
  bottom: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { route: NavigationRoutes.Home, key: 'home', icon: House, bottom: true },
  {
    route: NavigationRoutes.Films,
    key: 'films',
    icon: FilmStrip,
    bottom: true,
  },
  {
    route: NavigationRoutes.Cinemas,
    key: 'cinemas',
    icon: MapPinLine,
    bottom: true,
  },
  {
    route: NavigationRoutes.Tickets,
    key: 'tickets',
    icon: Ticket,
    bottom: true,
  },
  {
    route: NavigationRoutes.Profile,
    key: 'profile',
    icon: UserCircle,
    bottom: true,
  },
  { route: NavigationRoutes.About, key: 'about', icon: Info, bottom: false },
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
