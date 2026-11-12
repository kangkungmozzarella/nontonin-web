import { Button, Skeleton, Text, Title } from '@mantine/core';
import { addDays, format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'common/helpers/format';
import { buildUrl, NavigationRoutes } from 'common/routes';
import { hashString, mulberry } from 'common/theater/layout';
import { useCity } from 'hooks/use-city';
import useLanguage from 'hooks/use-language';
import type { FilmModel } from 'api-hooks/films/model';
import { useGetFilmSchedule } from 'api-hooks/showtimes';
import * as styles from '../styles.css';

const ROWS = [10, 12, 12, 14, 14, 14];
const day = (offset: number) =>
  format(addDays(new Date(), offset), 'yyyy-MM-dd');

// The next showtime of the film in the chosen city, today or tomorrow
function useNextShowtime(filmId?: string) {
  const { city } = useCity();
  const today = useGetFilmSchedule({ filmId, cityId: city.id, date: day(0) });
  const tomorrow = useGetFilmSchedule({
    filmId,
    cityId: city.id,
    date: day(1),
  });
  return React.useMemo(() => {
    for (const q of [today, tomorrow]) {
      for (const entry of q.data ?? []) {
        const s = entry.showtimes.find((x) => !x.isPast);
        if (s) return { showtime: s, cinema: entry.cinema };
      }
    }
    return null;
  }, [today, tomorrow]);
}

// Seat preview pitch: a drawn auditorium and a button straight into a real seat map
export default function SeatPreviewFeature({ film }: { film?: FilmModel }) {
  const { t } = useTranslation('layout');
  const { lang } = useLanguage();
  const next = useNextShowtime(film?.id);
  const rnd = mulberry(hashString('feature'));

  return (
    <section className={styles.feature}>
      <div className={styles.stage} aria-hidden>
        <div className={styles.stageScreen}>
          {film && (
            <Image
              src={film.backdrop}
              alt=""
              fill
              sizes="640px"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <div className={styles.stageRows}>
          {ROWS.map((n, r) => (
            <div key={r} className={styles.stageRow}>
              {Array.from({ length: n }, (_, c) => (
                <span
                  key={c}
                  className={styles.stageSeat}
                  data-taken={rnd() < 0.35}
                  data-on={r === 3 && c === 7}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.featureText}>
        <Title order={2} className={styles.featureTitle}>
          {t('home.featureTitle')}
        </Title>
        <Text c="dimmed" mt={14}>
          {t('home.featureDesc')}
        </Text>
        {!film ? (
          <Skeleton height={44} width={240} radius="xl" mt={28} />
        ) : next ? (
          <>
            <Text size="sm" mt={28} c="dimmed">
              {t('home.featureWhere', {
                film: film.title,
                cinema: next.cinema.name,
                day: formatDate(next.showtime.date, 'EEEE', lang),
              })}
            </Text>
            <Button
              component={Link}
              href={buildUrl(NavigationRoutes.Seat, {
                paths: { showtimeId: next.showtime.id },
              })}
              mt={12}
              size="md"
            >
              {t('home.featureCta', { time: next.showtime.time })}
            </Button>
          </>
        ) : (
          <Button
            component={Link}
            href={buildUrl(NavigationRoutes.FilmDetail, {
              paths: { id: film.id },
            })}
            mt={28}
            size="md"
          >
            {t('home.featureFallback')}
          </Button>
        )}
      </div>
    </section>
  );
}
