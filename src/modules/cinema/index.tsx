import { Button, Group, Text, Title } from '@mantine/core';
import { MapPin, NavigationArrow } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  formatDistance,
  formatDuration,
  haversineKm,
} from 'common/helpers/format';
import { buildUrl, NavigationRoutes, RouterQueryType } from 'common/routes';
import colors from 'common/styles/colors';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import useLanguage from 'hooks/use-language';
import { useUserLocation } from 'hooks/use-user-location';
import { useGetCinema } from 'api-hooks/cinemas';
import { useGetCinemaSchedule } from 'api-hooks/showtimes';
import DateStrip, { upcomingDays } from 'modules/components/date-strip';
import ShowtimeChips from 'modules/components/showtime-chips';
import { mapsUrl } from 'modules/cinemas';
import * as cinemasStyles from 'modules/cinemas/styles.css';
import * as styles from './styles.css';

export default function CinemaScreen() {
  const { t } = useTranslation(['layout', 'home', 'common']);
  const { lang } = useLanguage();
  const { coords } = useUserLocation();
  const query = useRouter()
    .query as RouterQueryType<NavigationRoutes.CinemaDetail>;
  const [date, setDate] = React.useState(() => upcomingDays()[0]);
  const cinema = useGetCinema({ id: query.id });
  const schedule = useGetCinemaSchedule({ cinemaId: query.id, date });

  if (!cinema.data)
    return (
      <AppLayout>
        <StateView
          loading={!cinema.error}
          error={cinema.error}
          onRetry={cinema.refetch}
          minHeight={480}
        />
      </AppLayout>
    );
  const c = cinema.data;

  return (
    <AppLayout title={c.name}>
      <Container className={styles.page}>
        <div className={styles.header}>
          <div>
            <Group gap={12}>
              <Title order={1} fz={40} style={{ letterSpacing: -1 }}>
                {c.name}
              </Title>
              <span className={cinemasStyles.tier}>
                {t(`common:tier.${c.tier}`)}
              </span>
            </Group>
            <Group gap={6} mt={8}>
              <MapPin size={16} color={colors.muted} />
              <Text c="dimmed">
                {c.address}
                {coords
                  ? `, ${t('cinemas.away', { distance: formatDistance(haversineKm(coords, c)) })}`
                  : ''}
                {', '}
                {t('cinemas.studios', { count: c.studios })}
              </Text>
            </Group>
          </div>
          <Button
            component="a"
            href={mapsUrl(c.lat, c.lng)}
            target="_blank"
            rel="noreferrer"
            variant="default"
            leftSection={<NavigationArrow size={16} />}
          >
            {t('cinemas.directions')}
          </Button>
        </div>

        <DateStrip value={date} onChange={setDate} />

        <Title order={2} fz={24} mt={32}>
          {t('home:cinemas.playing')}
        </Title>
        {schedule.isLoading || schedule.error ? (
          <StateView
            loading={schedule.isLoading}
            error={schedule.error}
            onRetry={schedule.refetch}
          />
        ) : !schedule.data?.length ? (
          <StateView empty={{ title: t('home:cinemas.nothing') }} />
        ) : (
          <div className={styles.films}>
            {schedule.data.map(({ film, showtimes }) => (
              <div key={film.id} className={styles.filmRow}>
                <Image
                  src={film.poster}
                  alt=""
                  width={84}
                  height={126}
                  className={styles.filmPoster}
                />
                <div>
                  <Link
                    href={buildUrl(NavigationRoutes.FilmDetail, {
                      paths: { id: film.id },
                    })}
                  >
                    <Text fw={700} fz={18} lineClamp={2}>
                      {film.title}
                    </Text>
                  </Link>
                  <Text size="sm" c="dimmed" mt={4}>
                    {[
                      film.rating,
                      film.duration != null
                        ? formatDuration(film.duration, lang)
                        : film.genres[0],
                      t('common:studio', { n: showtimes[0].studio }),
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </Text>
                </div>
                <ShowtimeChips showtimes={showtimes} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </AppLayout>
  );
}
