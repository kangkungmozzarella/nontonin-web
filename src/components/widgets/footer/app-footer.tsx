import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { catalog } from 'common/api/catalog';
import { DESIGN_CREDIT } from 'common/constants/app';
import Container from 'components/widgets/layout/container';
import * as styles from './styles.css';

// Navigation lives in the sidebar, so the footer only carries credits and the demo notice
export default function AppFooter() {
  const { t } = useTranslation(['layout', 'account']);
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.notes}>
          <Text size="sm" c="dimmed">
            {t('footer.demo')}
          </Text>
          <Text size="sm" c="dimmed">
            {t('footer.credit', {
              concept: DESIGN_CREDIT.concept,
              designer: DESIGN_CREDIT.designer,
            })}
          </Text>
        </div>
        {catalog.usesTmdb && (
          <a
            className={styles.tmdb}
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.tmdbMark}>TMDB</span>
            <span>{t('account:about.tmdb')}</span>
          </a>
        )}
        <span className={styles.rights}>
          {t('footer.rights', { year: new Date().getFullYear() })}
        </span>
      </Container>
    </footer>
  );
}
