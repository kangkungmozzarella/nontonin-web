import { Group, Text } from '@mantine/core';
import { Star } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'common/helpers/format';
import { buildUrl, NavigationRoutes } from 'common/routes';
import colors from 'common/styles/colors';
import useLanguage from 'hooks/use-language';
import type { FilmModel } from 'api-hooks/films/model';
import * as styles from './styles.css';

export default function FilmPosterCard({
  film,
  priority,
}: {
  film: FilmModel;
  priority?: boolean;
}) {
  const { t } = useTranslation(['home', 'layout']);
  const { lang } = useLanguage();
  return (
    <Link
      href={buildUrl(NavigationRoutes.FilmDetail, { paths: { id: film.id } })}
      className={styles.posterCard}
    >
      <div className={styles.posterFrame}>
        <Image
          src={film.poster}
          alt={film.title}
          fill
          sizes="(min-width: 1280px) 200px, 30vw"
          className={styles.posterImage}
          priority={priority}
        />
        {film.rating && (
          <span className={styles.ratingBadge}>{film.rating}</span>
        )}
        <div className={styles.posterOverlay}>
          <Text size="sm" fw={700}>
            {film.status === 'now'
              ? t('layout:hero.buy')
              : t('layout:hero.detail')}
          </Text>
        </div>
      </div>
      <div>
        <Text fw={600} lineClamp={1}>
          {film.title}
        </Text>
        {film.status === 'soon' && film.releaseDate ? (
          <Text size="sm" c="dimmed">
            {t('home:releaseOn', {
              date: formatDate(film.releaseDate, 'd MMM yyyy', lang),
            })}
          </Text>
        ) : (
          <Group gap={6} wrap="nowrap">
            {film.score != null && (
              <Group gap={4} wrap="nowrap">
                <Star size={13} weight="fill" color={colors.star} />
                <Text size="sm" fw={500}>
                  {film.score.toFixed(1)}
                </Text>
                <Text size="sm" c="dimmed">
                  ·
                </Text>
              </Group>
            )}
            <Text size="sm" c="dimmed" lineClamp={1}>
              {film.genres.slice(0, 2).join(', ')}
            </Text>
          </Group>
        )}
      </div>
    </Link>
  );
}
