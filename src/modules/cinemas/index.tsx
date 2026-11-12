import { Badge, Button, Group, Text, Title } from '@mantine/core';
import { MapPin, NavigationArrow } from '@phosphor-icons/react';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDistance, haversineKm } from 'common/helpers/format';
import { buildUrl, NavigationRoutes } from 'common/routes';
import colors from 'common/styles/colors';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import { useCity } from 'hooks/use-city';
import { useUserLocation } from 'hooks/use-user-location';
import { useGetCinemas } from 'api-hooks/cinemas';
import * as styles from './styles.css';

export const mapsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export default function CinemasScreen() {
  const { t } = useTranslation(['layout', 'common']);
  const { city } = useCity();
  const { coords, request, status } = useUserLocation();
  const cinemas = useGetCinemas({ cityId: city.id });

  const items = React.useMemo(() => {
    const list = (cinemas.data ?? []).map((c) => ({
      cinema: c,
      km: coords ? haversineKm(coords, c) : null,
    }));
    if (coords) list.sort((a, b) => a.km! - b.km!);
    return list;
  }, [cinemas.data, coords]);

  return (
    <AppLayout title={t('nav.cinemas')}>
      <Container className={styles.page}>
        <div className={styles.head}>
          <div>
            <Title order={1} fz={40} style={{ letterSpacing: -0.8 }}>
              {t('cinemas.title', { city: city.name })}
            </Title>
            <Text c="dimmed" mt={4}>
              {t('cinemas.subtitle', { count: items.length })}
            </Text>
          </div>
        </div>
        {!coords && status !== 'unsupported' && (
          <div className={styles.hint}>
            <Text size="sm" c="dimmed">
              {t('cinemas.locationHint')}
            </Text>
            <Button
              size="xs"
              variant="light"
              leftSection={<NavigationArrow size={14} weight="fill" />}
              onClick={request}
            >
              {t('cinemas.enable')}
            </Button>
          </div>
        )}
        {cinemas.isLoading || cinemas.error ? (
          <StateView
            loading={cinemas.isLoading}
            error={cinemas.error}
            onRetry={cinemas.refetch}
          />
        ) : (
          <div className={styles.list}>
            {items.map(({ cinema: c, km }) => (
              <article key={c.id} className={styles.card}>
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Title order={2} fz={20}>
                      {c.name}
                    </Title>
                    <Group gap={6} mt={6} wrap="nowrap">
                      <MapPin size={15} color={colors.muted} />
                      <Text size="sm" c="dimmed">
                        {c.address}
                      </Text>
                    </Group>
                  </div>
                  <Badge
                    variant="light"
                    color={c.tier === 'premiere' ? 'orange' : 'gray'}
                  >
                    {t(`common:tier.${c.tier}`)}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  {t('cinemas.studios', { count: c.studios })}
                  {km != null
                    ? ` · ${t('cinemas.away', { distance: formatDistance(km) })}`
                    : ''}
                </Text>
                <Group mt={4}>
                  <Button
                    component={Link}
                    href={buildUrl(NavigationRoutes.CinemaDetail, {
                      paths: { id: c.id },
                    })}
                  >
                    {t('cinemas.schedule')}
                  </Button>
                  <Button
                    component="a"
                    href={mapsUrl(c.lat, c.lng)}
                    target="_blank"
                    rel="noreferrer"
                    variant="default"
                    leftSection={<NavigationArrow size={15} />}
                  >
                    {t('cinemas.directions')}
                  </Button>
                </Group>
              </article>
            ))}
          </div>
        )}
      </Container>
    </AppLayout>
  );
}
