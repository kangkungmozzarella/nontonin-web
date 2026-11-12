import { Skeleton, Text } from '@mantine/core';
import { CaretRight } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CINEMAS } from 'common/api/mock/data';
import { formatDate } from 'common/helpers/format';
import { buildUrl, NavigationRoutes } from 'common/routes';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import { useCity } from 'hooks/use-city';
import useLanguage from 'hooks/use-language';
import { useGetFilms } from 'api-hooks/films';
import FilmPosterCard from 'modules/components/film-poster-card';
import SectionHeader from 'modules/components/section-header';
import HeroCarousel from './components/hero-carousel';
import SeatPreviewFeature from './components/seat-preview-feature';
import * as styles from './styles.css';

type FilmsQuery = ReturnType<typeof useGetFilms>;

// Now showing: one scrolling rail of posters
function PosterRail({ query }: { query: FilmsQuery }) {
  if (query.isLoading)
    return (
      <div className={styles.rail}>
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton
            key={i}
            className={styles.railItem}
            style={{ aspectRatio: '2 / 3' }}
            radius="md"
          />
        ))}
      </div>
    );
  if (query.error)
    return <StateView error={query.error} onRetry={query.refetch} />;
  return (
    <div className={styles.rail}>
      {(query.data ?? []).slice(0, 12).map((f, i) => (
        <div key={f.id} className={styles.railItem}>
          <FilmPosterCard film={f} priority={i < 6} />
        </div>
      ))}
    </div>
  );
}

// Coming soon: wide backdrop cards led by the release date
function UpcomingList({ query }: { query: FilmsQuery }) {
  const { t } = useTranslation('home');
  const { lang } = useLanguage();
  if (query.isLoading)
    return (
      <div className={styles.upcomingGrid}>
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} style={{ aspectRatio: '16 / 9' }} radius="md" />
        ))}
      </div>
    );
  if (query.error)
    return <StateView error={query.error} onRetry={query.refetch} />;
  return (
    <div className={styles.upcomingGrid}>
      {(query.data ?? []).slice(0, 3).map((f) => (
        <Link
          key={f.id}
          href={buildUrl(NavigationRoutes.FilmDetail, { paths: { id: f.id } })}
          className={styles.upcomingCard}
        >
          <div className={styles.upcomingImage}>
            <Image
              src={f.backdrop}
              alt=""
              fill
              sizes="(min-width: 1280px) 400px, 90vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          {f.releaseDate && (
            <Text size="sm" fw={700} mt={14}>
              {t('releaseOn', {
                date: formatDate(f.releaseDate, 'd MMMM yyyy', lang),
              })}
            </Text>
          )}
          <Text fw={600} c="dimmed" lineClamp={1}>
            {f.title}
          </Text>
        </Link>
      ))}
    </div>
  );
}

export default function HomeScreen() {
  const { t } = useTranslation(['layout', 'home', 'common']);
  const { city } = useCity();
  const now = useGetFilms({ status: 'now' });
  const soon = useGetFilms({ status: 'soon' });
  const cinemas = CINEMAS.filter((c) => c.cityId === city.id);

  return (
    <AppLayout>
      <Container className={styles.page}>
        <HeroCarousel films={now.data} />

        <section className={styles.section}>
          <SectionHeader
            title={t('home:nowShowing')}
            subtitle={t('home.nowSub', { city: city.name })}
            action={{
              label: t('common:seeAll'),
              href: buildUrl(NavigationRoutes.Films, { query: { tab: 'now' } }),
            }}
          />
          <PosterRail query={now} />
        </section>

        <SeatPreviewFeature film={now.data?.[0]} />

        <section className={styles.section}>
          <SectionHeader
            title={t('home:comingSoon')}
            subtitle={t('home.soonSub')}
            action={{
              label: t('common:seeAll'),
              href: buildUrl(NavigationRoutes.Films, {
                query: { tab: 'soon' },
              }),
            }}
          />
          <UpcomingList query={soon} />
        </section>

        <section className={styles.cinemaSection}>
          <SectionHeader
            title={t('home.cinemasTitle', { city: city.name })}
            subtitle={t('home.cinemasSub', { count: cinemas.length })}
            action={{
              label: t('home.seeAllCinemas'),
              href: NavigationRoutes.Cinemas,
            }}
          />
          <ul className={styles.cinemaList}>
            {cinemas.map((c) => (
              <li key={c.id}>
                <Link
                  href={buildUrl(NavigationRoutes.CinemaDetail, {
                    paths: { id: c.id },
                  })}
                  className={styles.cinemaRow}
                >
                  <div style={{ minWidth: 0 }}>
                    <Text fw={700}>{c.name}</Text>
                    <Text size="sm" c="dimmed" lineClamp={1}>
                      {c.address}
                    </Text>
                  </div>
                  <Text size="sm" c="dimmed" className={styles.cinemaMeta}>
                    {t(`common:tier.${c.tier}`)},{' '}
                    {t('common:studios', { count: c.studios })}
                  </Text>
                  <CaretRight
                    size={16}
                    aria-hidden
                    className={styles.cinemaCaret}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </AppLayout>
  );
}
