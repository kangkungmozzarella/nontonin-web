import { Button, Group, Skeleton, Text, Title } from '@mantine/core';
import { Star, Ticket } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { buildUrl, NavigationRoutes } from 'common/routes';
import colors from 'common/styles/colors';
import type { FilmModel } from 'api-hooks/films/model';
import * as styles from '../styles.css';

const ROTATE_MS = 8000;

export default function HeroCarousel({ films }: { films?: FilmModel[] }) {
  const { t } = useTranslation('layout');
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const list = (films ?? []).slice(0, 5);

  React.useEffect(() => {
    if (paused || list.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % list.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [paused, list.length]);

  if (!films) return <Skeleton className={styles.hero} radius="md" />;
  const film = list[index];
  if (!film) return null;

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div key={film.id} className={styles.heroSlide}>
        <Image
          src={film.backdrop}
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 1240px, 100vw"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.heroShade} />
      <div className={styles.heroContent} key={`c-${film.id}`}>
        <Title order={1} className={styles.heroTitle}>
          {film.title}
        </Title>
        <Group gap={12}>
          {film.score != null && (
            <Group gap={5}>
              <Star size={16} weight="fill" color={colors.star} />
              <Text fw={700}>{film.score.toFixed(1)}</Text>
            </Group>
          )}
          <Text c="#C9C7CF">{film.genres.slice(0, 3).join(', ')}</Text>
        </Group>
        <Text c="#C9C7CF" lineClamp={2} maw={480}>
          {film.synopsis}
        </Text>
        <Button
          component={Link}
          href={buildUrl(NavigationRoutes.FilmDetail, {
            paths: { id: film.id },
          })}
          size="md"
          mt={8}
          w="fit-content"
          leftSection={<Ticket size={18} weight="fill" />}
        >
          {t('hero.buy')}
        </Button>
      </div>
      {list.length > 1 && (
        <div className={styles.heroThumbs}>
          {list.map((f, i) => (
            <button
              key={f.id}
              type="button"
              className={styles.heroThumb}
              data-active={i === index}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              aria-label={f.title}
            >
              <Image
                src={f.backdrop}
                alt=""
                fill
                sizes="120px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
