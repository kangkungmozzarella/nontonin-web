import { Button, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import {
  CalendarBlank,
  Clock,
  ShieldCheck,
  Star,
  Ticket,
} from '@phosphor-icons/react';
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
  const { t } = useTranslation(['booking', 'layout', 'common', 'home']);
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
            <Container className={styles.page}>
              <Skeleton h={390} w={260} radius="md" />
            </Container>
          </>
        )}
      </AppLayout>
    );

  const f = film.data;
  const soon = f.status === 'soon';

  return (
    <AppLayout title={f.title}>
      <div className={styles.backdrop} aria-hidden>
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
      <Container className={styles.page}>
        <div className={styles.top}>
          <div className={styles.poster}>
            <Image
              src={f.poster}
              alt={f.title}
              fill
              sizes="(min-width: 768px) 260px, 140px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <Stack gap={16} className={styles.info}>
            <Title order={1} className={styles.title}>
              {f.title}
            </Title>
            {f.score != null && (
              <Group gap={6}>
                <Star size={18} weight="fill" color={colors.star} />
                <Text fw={700} fz={18}>
                  {f.score.toFixed(1)}
                </Text>
                <Text c="dimmed" size="sm">
                  / 10
                </Text>
              </Group>
            )}
            <Group gap={8}>
              {f.genres.map((g) => (
                <span key={g} className={styles.chip}>
                  {g}
                </span>
              ))}
            </Group>
            <Group gap={20}>
              {f.duration != null && (
                <Group gap={6}>
                  <Clock size={18} color={colors.muted} aria-hidden />
                  <Text>{formatDuration(f.duration, lang)}</Text>
                </Group>
              )}
              {f.rating && (
                <Group gap={6}>
                  <ShieldCheck size={18} color={colors.muted} aria-hidden />
                  <Text>{f.rating}</Text>
                </Group>
              )}
              {soon && f.releaseDate && (
                <Group gap={6}>
                  <CalendarBlank size={18} color={colors.muted} aria-hidden />
                  <Text>
                    {t('home:releaseOn', {
                      date: formatDate(f.releaseDate, 'd MMMM yyyy', lang),
                    })}
                  </Text>
                </Group>
              )}
            </Group>
            <Text c="#C9C7CF" lh={1.7} maw={640}>
              {f.synopsis}
            </Text>
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
                    <Text size="sm">{f.cast.slice(0, 6).join(', ')}</Text>
                  </>
                )}
              </div>
            )}
            {!soon && (
              <Button
                component="a"
                href="#jadwal"
                size="md"
                w="fit-content"
                mt={4}
                leftSection={<Ticket size={18} weight="fill" />}
              >
                {t('layout:hero.buy')}
              </Button>
            )}
          </Stack>
        </div>

        <section id="jadwal" className={styles.schedule}>
          <div className={styles.scheduleHead}>
            <Title order={2} fz={26} style={{ letterSpacing: -0.5 }}>
              {t('film.schedule')}
            </Title>
            <Text size="sm" c="dimmed">
              {t('layout:film.playingIn', { city: city.name })}
            </Text>
          </div>
          {soon ? (
            <StateView
              empty={{
                icon: <CalendarBlank size={36} color={colors.muted} />,
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
              <div className={styles.cinemas}>
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
                          className={styles.cinemaName}
                        >
                          {cinema.name}
                        </Link>
                        <Text size="sm" c="dimmed">
                          {t(`common:tier.${cinema.tier}`)},{' '}
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
      </Container>
    </AppLayout>
  );
}
