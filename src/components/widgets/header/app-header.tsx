import { SegmentedControl, Tooltip } from '@mantine/core';
import { CaretDown, MapPin, Ticket } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from 'common/constants/app';
import { AssetPaths } from 'common/constants/assets';
import { isUpcoming } from 'common/helpers/booking';
import { NavigationRoutes } from 'common/routes';
import colors from 'common/styles/colors';
import CityPickerModal from 'components/widgets/city-picker/city-picker-modal';
import Container from 'components/widgets/layout/container';
import { useBookings } from 'hooks/use-bookings';
import { useCity } from 'hooks/use-city';
import useLanguage from 'hooks/use-language';
import type { Lang } from 'common/api/model';
import * as styles from './styles.css';

const NAV: { route: NavigationRoutes; key: string; match: string[] }[] = [
  { route: NavigationRoutes.Films, key: 'films', match: ['/films'] },
  { route: NavigationRoutes.Cinemas, key: 'cinemas', match: ['/cinemas'] },
  { route: NavigationRoutes.Tickets, key: 'tickets', match: ['/tickets'] },
  { route: NavigationRoutes.About, key: 'about', match: ['/about'] },
];

export default function AppHeader() {
  const { t } = useTranslation('layout');
  const { pathname } = useRouter();
  const { city } = useCity();
  const { lang, setLanguage } = useLanguage();
  const { bookings } = useBookings();
  const [cityOpen, setCityOpen] = React.useState(false);
  const upcoming = bookings.filter((b) => isUpcoming(b)).length;

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link
          href={NavigationRoutes.Home}
          className={styles.brand}
          aria-label={APP_NAME}
        >
          <Image
            src={AssetPaths.BrandMark}
            alt=""
            width={34}
            height={34}
            priority
          />
          {APP_NAME}
        </Link>

        <nav className={styles.nav}>
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.route}
              className={styles.navLink}
              data-active={item.match.some((m) => pathname.startsWith(m))}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cityButton}
            onClick={() => setCityOpen(true)}
            aria-label={t('header.city')}
          >
            <MapPin size={16} weight="fill" color={colors.sel} />
            {city.name}
            <CaretDown size={12} color={colors.muted} />
          </button>
          <SegmentedControl
            size="xs"
            radius="xl"
            value={lang}
            onChange={(v) => setLanguage(v as Lang)}
            data={[
              { value: 'id', label: 'ID' },
              { value: 'en', label: 'EN' },
            ]}
            aria-label={t('header.language')}
          />
          <Tooltip label={t('nav.tickets')}>
            <Link
              href={NavigationRoutes.Tickets}
              className={styles.ticketLink}
              aria-label={t('nav.tickets')}
            >
              <Ticket size={18} />
              {upcoming > 0 && <span className={styles.badge}>{upcoming}</span>}
            </Link>
          </Tooltip>
        </div>
      </Container>
      <CityPickerModal opened={cityOpen} onClose={() => setCityOpen(false)} />
    </header>
  );
}
