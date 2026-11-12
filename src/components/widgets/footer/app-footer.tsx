import { Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { catalog } from 'common/api/catalog';
import { APP_NAME, DESIGN_CREDIT } from 'common/constants/app';
import { AssetPaths } from 'common/constants/assets';
import { NavigationRoutes } from 'common/routes';
import Container from 'components/widgets/layout/container';
import * as styles from './styles.css';

export default function AppFooter() {
  const { t } = useTranslation(['layout', 'account']);
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <Group gap={10}>
              <Image src={AssetPaths.BrandMark} alt="" width={30} height={30} />
              <Text fw={800} size="lg">
                {APP_NAME}
              </Text>
            </Group>
            <Text size="sm" c="dimmed" mt="sm" maw={340}>
              {t('footer.tagline')}
            </Text>
          </div>
          <div>
            <Text
              size="xs"
              fw={700}
              tt="uppercase"
              c="dimmed"
              mb="sm"
              style={{ letterSpacing: 1 }}
            >
              {t('footer.explore')}
            </Text>
            <div className={styles.links}>
              <Link className={styles.link} href={NavigationRoutes.Films}>
                {t('nav.films')}
              </Link>
              <Link className={styles.link} href={NavigationRoutes.Cinemas}>
                {t('nav.cinemas')}
              </Link>
              <Link className={styles.link} href={NavigationRoutes.Tickets}>
                {t('nav.tickets')}
              </Link>
              <Link className={styles.link} href={NavigationRoutes.About}>
                {t('nav.about')}
              </Link>
            </div>
          </div>
          <div>
            <Text size="sm" c="dimmed">
              {t('footer.credit', {
                concept: DESIGN_CREDIT.concept,
                designer: DESIGN_CREDIT.designer,
              })}
            </Text>
            {catalog.usesTmdb && (
              <a
                className={styles.tmdb}
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noreferrer"
                style={{ marginTop: 16 }}
              >
                <Text
                  fw={800}
                  c="#01B4E4"
                  size="sm"
                  style={{ letterSpacing: 1 }}
                >
                  TMDB
                </Text>
                <span>{t('account:about.tmdb')}</span>
              </a>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
          <span>{t('footer.demo')}</span>
        </div>
      </Container>
    </footer>
  );
}
