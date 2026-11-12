import {
  Button,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Ticket } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { byShowTime, isUpcoming } from 'common/helpers/booking';
import { formatDate } from 'common/helpers/format';
import { buildUrl, NavigationRoutes } from 'common/routes';
import colors from 'common/styles/colors';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import { useBookings } from 'hooks/use-bookings';
import useLanguage from 'hooks/use-language';
import * as styles from './styles.css';

export default function TicketsScreen() {
  const { t } = useTranslation(['account', 'common', 'layout']);
  const { lang } = useLanguage();
  const { bookings, ready } = useBookings();
  const [tab, setTab] = React.useState<'upcoming' | 'past'>('upcoming');

  const list = React.useMemo(() => {
    const up = bookings.filter((b) => isUpcoming(b)).sort(byShowTime);
    const past = bookings
      .filter((b) => !isUpcoming(b))
      .sort(byShowTime)
      .reverse();
    return tab === 'upcoming' ? up : past;
  }, [bookings, tab]);

  return (
    <AppLayout title={t('tickets.title')}>
      <Container className={styles.page}>
        <div className={styles.head}>
          <Title order={1} fz={40} style={{ letterSpacing: -0.8 }}>
            {t('tickets.title')}
          </Title>
          <SegmentedControl
            size="md"
            radius="xl"
            value={tab}
            onChange={(v) => setTab(v as typeof tab)}
            data={[
              { value: 'upcoming', label: t('tickets.upcoming') },
              { value: 'past', label: t('tickets.past') },
            ]}
          />
        </div>
        {!ready ? (
          <StateView loading />
        ) : !list.length ? (
          <StateView
            minHeight={360}
            empty={{
              icon: <Ticket size={44} color={colors.dim} />,
              title: t('tickets.empty'),
              desc: t('tickets.emptyDesc'),
              action:
                tab === 'upcoming' ? (
                  <Button component={Link} href={NavigationRoutes.Films} mt={8}>
                    {t('tickets.browse')}
                  </Button>
                ) : undefined,
            }}
          />
        ) : (
          <div className={styles.grid}>
            {list.map((b) => (
              <Link
                key={b.id}
                href={buildUrl(NavigationRoutes.TicketDetail, {
                  paths: { id: b.id },
                })}
                className={styles.card}
                data-past={tab === 'past'}
              >
                <Image
                  src={b.poster}
                  alt=""
                  width={72}
                  height={108}
                  style={{ borderRadius: 10, objectFit: 'cover' }}
                />
                <Stack gap={4} style={{ minWidth: 0 }}>
                  <Text fw={700} fz={17} lineClamp={1}>
                    {b.filmTitle}
                  </Text>
                  <Text size="sm" c="dimmed" lineClamp={1}>
                    {b.cinemaName} · {t('common:studio', { n: b.studio })}
                  </Text>
                  <Text size="sm">
                    {formatDate(b.date, 'EEE, d MMM yyyy', lang)} · {b.time}
                  </Text>
                  <Group gap={6}>
                    <Text size="sm" fw={700} c="mint">
                      {b.seats.join(', ')}
                    </Text>
                    <Text size="xs" c="dimmed">
                      · {b.code}
                    </Text>
                  </Group>
                </Stack>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </AppLayout>
  );
}
