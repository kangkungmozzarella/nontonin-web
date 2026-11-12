import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from 'common/constants/app';
import { AssetPaths } from 'common/constants/assets';
import { isUpcoming } from 'common/helpers/booking';
import { NavigationRoutes } from 'common/routes';
import { useBookings } from 'hooks/use-bookings';
import { isActive, NAV_ITEMS } from './nav-items';
import * as styles from './styles.css';

function useUpcomingCount() {
  const { bookings } = useBookings();
  return bookings.filter((b) => isUpcoming(b)).length;
}

export function AppSidebar() {
  const { t } = useTranslation('layout');
  const { pathname } = useRouter();
  const upcoming = useUpcomingCount();

  return (
    <aside className={styles.sidebar}>
      <Link
        href={NavigationRoutes.Home}
        className={styles.brand}
        aria-label={APP_NAME}
      >
        <Image
          src={AssetPaths.BrandMark}
          alt=""
          width={32}
          height={32}
          priority
        />
        {APP_NAME}
      </Link>
      <nav className={styles.sideNav} aria-label={t('nav.label')}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item, pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              href={item.route}
              className={styles.sideLink}
              data-active={active}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={20} weight={active ? 'fill' : 'regular'} />
              <span>{t(`nav.${item.key}`)}</span>
              {item.key === 'tickets' && upcoming > 0 && (
                <span
                  className={styles.count}
                  aria-label={t('nav.upcoming', { count: upcoming })}
                >
                  {upcoming}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function AppBottomNav() {
  const { t } = useTranslation('layout');
  const { pathname } = useRouter();
  const upcoming = useUpcomingCount();

  return (
    <nav className={styles.bottomNav} aria-label={t('nav.label')}>
      {NAV_ITEMS.map((item) => {
        const active = isActive(item, pathname);
        const Icon = item.icon;
        return (
          <Link
            key={item.key}
            href={item.route}
            className={styles.bottomLink}
            data-active={active}
            aria-current={active ? 'page' : undefined}
          >
            <span className={styles.bottomIcon}>
              <Icon size={22} weight={active ? 'fill' : 'regular'} />
              {item.key === 'tickets' && upcoming > 0 && (
                <span className={styles.dot} />
              )}
            </span>
            {t(`nav.${item.key}`)}
          </Link>
        );
      })}
    </nav>
  );
}
