import { Button, Group, Text, Title } from '@mantine/core';
import { ArrowRight } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { hashString, mulberry } from 'common/theater/layout';
import type { FilmModel } from 'api-hooks/films/model';
import * as styles from '../styles.css';

const ROWS = [10, 12, 12, 14, 14, 14];

// Decorative auditorium: a glowing screen and a seat grid with one seat picked
export default function SeatPreviewFeature({ film }: { film?: FilmModel }) {
  const { t } = useTranslation('layout');
  const rnd = mulberry(hashString('feature'));
  const href = film ? `/films/${film.id}` : '/films';

  return (
    <section className={styles.feature}>
      <div>
        <Text
          c="mint"
          fw={700}
          size="sm"
          tt="uppercase"
          style={{ letterSpacing: 1.5 }}
        >
          {t('home.featureEyebrow')}
        </Text>
        <Title
          order={2}
          fz={38}
          lh={1.1}
          mt={10}
          style={{ letterSpacing: -0.8 }}
        >
          {t('home.featureTitle')}
        </Title>
        <Text c="dimmed" size="lg" mt={14}>
          {t('home.featureDesc')}
        </Text>
        <div className={styles.steps}>
          {(['film', 'seat', 'pay'] as const).map((k, i) => (
            <Group key={k} gap={12} wrap="nowrap">
              <span className={styles.stepNum}>{i + 1}</span>
              <Text>{t(`home.steps.${k}`)}</Text>
            </Group>
          ))}
        </div>
        <Button
          component={Link}
          href={href}
          mt={32}
          size="md"
          rightSection={<ArrowRight size={16} />}
        >
          {t('home.featureCta')}
        </Button>
      </div>
      <div className={styles.stage} aria-hidden>
        <div className={styles.stageScreen}>
          {film && (
            <Image
              src={film.backdrop}
              alt=""
              fill
              sizes="560px"
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
    </section>
  );
}
