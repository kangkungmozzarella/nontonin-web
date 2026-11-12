import { Group, Skeleton, Text } from '@mantine/core';
import { MapPin } from '@phosphor-icons/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CINEMAS } from 'common/api/mock/data';
import { buildUrl, NavigationRoutes } from 'common/routes';
import colors from 'common/styles/colors';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import { useCity } from 'hooks/use-city';
import { useGetFilms } from 'api-hooks/films';
import FilmPosterCard from 'modules/components/film-poster-card';
import SectionHeader from 'modules/components/section-header';
import * as componentStyles from 'modules/components/styles.css';
import HeroCarousel from './components/hero-carousel';
import SeatPreviewFeature from './components/seat-preview-feature';
import * as styles from './styles.css';

function PosterGrid({
  query,
  limit = 12,
}: {
  query: ReturnType<typeof useGetFilms>;
  limit?: number;
}) {
  if (query.isLoading)
    return (
      <div className={componentStyles.posterGrid}>
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} style={{ aspectRatio: '2 / 3' }} radius={14} />
        ))}
      </div>
    );
  if (query.error)
    return <StateView error={query.error} onRetry={query.refetch} />;
  return (
    <div className={componentStyles.posterGrid}>
      {(query.data ?? []).slice(0, limit).map((f, i) => (
        <FilmPosterCard key={f.id} film={f} priority={i < 6} />
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
      <HeroCarousel films={now.data} />
      <Container>
        <section className={styles.section}>
          <SectionHeader
            title={t('home:nowShowing')}
            subtitle={t('home.nowSub', { city: city.name })}
            action={{
              label: t('common:seeAll'),
              href: buildUrl(NavigationRoutes.Films, { query: { tab: 'now' } }),
            }}
          />
          <PosterGrid query={now} />
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
          <PosterGrid query={soon} limit={6} />
        </section>

        <section className={styles.section}>
          <SectionHeader
            title={t('home.cinemasTitle', { city: city.name })}
            subtitle={t('home.cinemasSub', { count: cinemas.length })}
            action={{
              label: t('home.seeAllCinemas'),
              href: NavigationRoutes.Cinemas,
            }}
          />
          <div className={styles.cinemaGrid}>
            {cinemas.map((c) => (
              <Link
                key={c.id}
                href={buildUrl(NavigationRoutes.CinemaDetail, {
                  paths: { id: c.id },
                })}
                className={styles.cinemaCard}
              >
                <Group justify="space-between">
                  <Text fw={700}>{c.name}</Text>
                  <Text
                    size="xs"
                    fw={600}
                    c={c.tier === 'premiere' ? colors.warm : 'dimmed'}
                  >
                    {t(`common:tier.${c.tier}`)}
                  </Text>
                </Group>
                <Group gap={6} wrap="nowrap">
                  <MapPin size={14} color={colors.muted} />
                  <Text size="sm" c="dimmed" lineClamp={1}>
                    {c.address}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {t('common:studios', { count: c.studios })}
                </Text>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </AppLayout>
  );
}
