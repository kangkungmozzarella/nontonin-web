import { SegmentedControl, Skeleton, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { NavigationRoutes, RouterQueryType } from 'common/routes';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import useNontoninNavigation from 'hooks/use-nontonin-navigation';
import { FilmStatus, useGetFilms } from 'api-hooks/films';
import FilmPosterCard from 'modules/components/film-poster-card';
import * as componentStyles from 'modules/components/styles.css';
import * as styles from './styles.css';

export default function FilmsScreen() {
  const { t } = useTranslation('layout');
  const router = useRouter();
  const navigation = useNontoninNavigation();
  const query = router.query as RouterQueryType<NavigationRoutes.Films>;
  const tab: FilmStatus = query.tab === 'soon' ? 'soon' : 'now';
  const films = useGetFilms({ status: tab });

  return (
    <AppLayout title={t('films.title')}>
      <Container className={styles.page}>
        <div className={styles.head}>
          <div>
            <Title order={1} fz={40} style={{ letterSpacing: -0.8 }}>
              {t('films.title')}
            </Title>
            {films.data && (
              <Text c="dimmed" mt={4}>
                {t('films.count', { count: films.data.length })}
              </Text>
            )}
          </div>
          <SegmentedControl
            size="md"
            radius="xl"
            value={tab}
            onChange={(v) =>
              navigation.replace(NavigationRoutes.Films, {
                query: { tab: v as FilmStatus },
              })
            }
            data={[
              { value: 'now', label: t('films.now') },
              { value: 'soon', label: t('films.soon') },
            ]}
          />
        </div>
        {films.isLoading ? (
          <div className={componentStyles.posterGrid}>
            {Array.from({ length: 12 }, (_, i) => (
              <Skeleton key={i} style={{ aspectRatio: '2 / 3' }} radius={14} />
            ))}
          </div>
        ) : films.error ? (
          <StateView error={films.error} onRetry={films.refetch} />
        ) : !films.data?.length ? (
          <StateView empty={{ title: t('films.empty') }} />
        ) : (
          <div className={componentStyles.posterGrid}>
            {films.data.map((f, i) => (
              <FilmPosterCard key={f.id} film={f} priority={i < 6} />
            ))}
          </div>
        )}
      </Container>
    </AppLayout>
  );
}
