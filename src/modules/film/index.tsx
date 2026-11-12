import { Badge, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import { CalendarBlank, Clock, MapPin, Star } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate, formatDuration } from 'common/helpers/format';
import { buildUrl, NavigationRoutes, RouterQueryType } from 'common/routes';
import colors from 'common/styles/colors';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import { useCity } from 'hooks/use-city';
import useLanguage from 'hooks/use-language';
import { useGetFilm } from 'api-hooks/films';
import { useGetFilmSchedule } from 'api-hooks/showtimes';
import DateStrip, { upcomingDays } from 'modules/components/date-strip';
import ShowtimeChips from 'modules/components/showtime-chips';
import * as styles from './styles.css';

export default function FilmScreen() {
  const { t } = useTranslation(['booking', 'layout', 'common']);
  const { lang } = useLanguage();
  const { city } = useCity();
  const query = useRouter()
    .query as RouterQueryType<NavigationRoutes.FilmDetail>;
  const [date, setDate] = React.useState(() => upcomingDays()[0]);
  const film = useGetFilm({ id: query.id });
  const schedule = useGetFilmSchedule({
    filmId: query.id,
    cityId: city.id,
    date,
  });

  if (!film.data)
    return (
      <AppLayout>
        {film.error ? (
          <StateView
            error={film.error}
            onRetry={film.refetch}
            minHeight={480}
          />
        ) : (
          <>
            <Skeleton h={440} radius={0} />
            <Container>
              <Skeleton h={300} w={260} mt={-200} radius={18} />
            </Container>
          </>
        )}
      </AppLayout>
    );

  const f = film.data;
  const soon = f.status === 'soon';

  return (
    <AppLayout title={f.title}>
      <div className={styles.backdrop}>
        <Image
          src={f.backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.backdropImage}
        />
        <div className={styles.backdropShade} />
      </div>
      <Container>
        <div className={styles.top}>
          <div className={styles.poster}>
            <Image
              src={f.poster}
              alt={f.title}
              fill
              sizes="260px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <Stack gap={14} pb={8}>
            {soon && f.releaseDate && (
              <Badge variant="light" size="lg" radius="sm" w="fit-content">
                {t('layout:hero.comingSoon')} ·{' '}
                {formatDate(f.releaseDate, 'd MMM yyyy', lang)}
              </Badge>
            )}
            <Title order={1} fz={52} lh={1.05} style={{ letterSpacing: -1 }}>
              {f.title}
            </Title>
            <Group gap={18}>
              {f.rating && (
                <span className={styles.ratingPill}>{f.rating}</span>
              )}
              {f.duration != null && (
                <Group gap={6}>
                  <Clock size={16} color={colors.muted} />
                  <Text c="dimmed">{formatDuration(f.duration, lang)}</Text>
                </Group>
              )}
              {f.score != null && (
                <Group gap={6}>
                  <Star size={16} weight="fill" color={colors.warm} />
                  <Text fw={600}>{f.score.toFixed(1)}</Text>
                </Group>
              )}
              <Text c="dimmed">{f.genres.join(', ')}</Text>
            </Group>
          </Stack>
        </div>

        <div className={styles.body}>
          <div className={styles.info}>
            <div>
              <Title order={3} fz={18} mb={8}>
                {t('film.synopsis')}
              </Title>
              <Text c="#C9C7CF" lh={1.7}>
                {f.synopsis}
              </Text>
            </div>
            {(f.director || f.cast.length > 0) && (
              <div className={styles.credits}>
                {f.director && (
                  <>
                    <Text c="dimmed" size="sm">
                      {t('film.director')}
                    </Text>
                    <Text size="sm">{f.director}</Text>
                  </>
                )}
                {f.cast.length > 0 && (
                  <>
                    <Text c="dimmed" size="sm">
                      {t('film.cast')}
                    </Text>
                    <Text size="sm">{f.cast.join(', ')}</Text>
                  </>
                )}
              </div>
            )}
          </div>

          <section className={styles.schedule}>
            <Group justify="space-between" mb={18}>
              <Title order={2} fz={24}>
                {t('film.schedule')}
              </Title>
              <Group gap={6}>
                <MapPin size={16} weight="fill" color={colors.sel} />
                <Text size="sm" fw={600}>
                  {t('layout:film.playingIn', { city: city.name })}
                </Text>
              </Group>
            </Group>
            {soon ? (
              <StateView
                empty={{
                  icon: <CalendarBlank size={36} color={colors.dim} />,
                  title: t('film.comingSoon', {
                    date: f.releaseDate
                      ? formatDate(f.releaseDate, 'EEEE, d MMMM yyyy', lang)
                      : '',
                  }),
                }}
                minHeight={200}
              />
            ) : (
              <>
                <DateStrip value={date} onChange={setDate} />
                <Text size="sm" c="dimmed" mt={18}>
                  {t('layout:film.pickTime')}
                </Text>
                <div style={{ marginTop: 6 }}>
                  {schedule.isLoading || schedule.error ? (
                    <StateView
                      loading={schedule.isLoading}
                      error={schedule.error}
                      onRetry={schedule.refetch}
                      minHeight={200}
                    />
                  ) : !schedule.data?.length ? (
                    <StateView
                      empty={{ title: t('layout:film.noScheduleDay') }}
                      minHeight={200}
                    />
                  ) : (
                    schedule.data.map(({ cinema, showtimes }) => (
                      <div key={cinema.id} className={styles.cinemaRow}>
                        <div>
                          <Link
                            href={buildUrl(NavigationRoutes.CinemaDetail, {
                              paths: { id: cinema.id },
                            })}
                          >
                            <Text fw={700}>{cinema.name}</Text>
                          </Link>
                          <Text
                            size="sm"
                            c={
                              cinema.tier === 'premiere'
                                ? colors.warm
                                : 'dimmed'
                            }
                            fw={500}
                          >
                            {t(`common:tier.${cinema.tier}`)} ·{' '}
                            {t('common:studio', { n: showtimes[0].studio })}
                          </Text>
                        </div>
                        <ShowtimeChips showtimes={showtimes} />
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </Container>
    </AppLayout>
  );
}
