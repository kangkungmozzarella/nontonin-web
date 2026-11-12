import { Badge, Button, Group, Skeleton, Text, Title } from '@mantine/core';
import { Cube, Star, Ticket } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { buildUrl, NavigationRoutes } from 'common/routes';
import colors from 'common/styles/colors';
import Container from 'components/widgets/layout/container';
import type { FilmModel } from 'api-hooks/films/model';
import * as styles from '../styles.css';

const ROTATE_MS = 8000;

export default function HeroCarousel({ films }: { films?: FilmModel[] }) {
  const { t } = useTranslation(['layout', 'home']);
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

  if (!films) return <Skeleton className={styles.hero} radius={0} />;
  const film = list[index];
  if (!film) return null;
  const href = buildUrl(NavigationRoutes.FilmDetail, {
    paths: { id: film.id },
  });

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={film.id} className={styles.heroSlide}>
        <Image
          src={film.backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.heroShade} />
      <Container style={{ position: 'relative', height: '100%' }}>
        <div className={styles.heroContent} key={`c-${film.id}`}>
          <Badge variant="light" size="lg" radius="sm" w="fit-content">
            {t('hero.nowPlaying')}
          </Badge>
          <Title order={1} fz={56} lh={1.02} style={{ letterSpacing: -1.2 }}>
            {film.title}
          </Title>
          <Group gap={12}>
            {film.score != null && (
              <Group gap={5}>
                <Star size={16} weight="fill" color={colors.warm} />
                <Text fw={600}>{film.score.toFixed(1)}</Text>
              </Group>
            )}
            <Text c="dimmed">{film.genres.slice(0, 3).join(' · ')}</Text>
          </Group>
          <Text c="#C9C7CF" size="lg" lineClamp={3} maw={520}>
            {film.synopsis}
          </Text>
          <Group mt={8}>
            <Button
              component={Link}
              href={href}
              size="lg"
              leftSection={<Ticket size={18} weight="fill" />}
            >
              {t('hero.buy')}
            </Button>
            <Button
              component={Link}
              href={href}
              size="lg"
              variant="default"
              leftSection={<Cube size={18} />}
            >
              {t('home:promo.feature.title')}
            </Button>
          </Group>
        </div>
        <div className={styles.heroThumbs}>
          {list.map((f, i) => (
            <button
              key={f.id}
              type="button"
              className={styles.heroThumb}
              data-active={i === index}
              onClick={() => setIndex(i)}
              aria-label={f.title}
            >
              <Image
                src={f.backdrop}
                alt=""
                fill
                sizes="132px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
