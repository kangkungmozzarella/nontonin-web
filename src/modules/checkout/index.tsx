import {
  ActionIcon,
  Button,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  ArrowLeft,
  Bank,
  CheckCircle,
  CreditCard,
  Icon,
  LockSimple,
  QrCode,
  Wallet,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ApiError } from 'common/api/mock/server';
import { formatDate, formatIDR } from 'common/helpers/format';
import { orderTotals } from 'common/helpers/pricing';
import { buildUrl, NavigationRoutes, RouterQueryType } from 'common/routes';
import colors from 'common/styles/colors';
import { seatById } from 'common/theater/layout';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import { useBookings } from 'hooks/use-bookings';
import useLanguage from 'hooks/use-language';
import useNontoninNavigation from 'hooks/use-nontonin-navigation';
import { PaymentMethod, useCreateBooking } from 'api-hooks/bookings';
import { useGetCinema } from 'api-hooks/cinemas';
import { useGetFilm } from 'api-hooks/films';
import { useGetSeatMap } from 'api-hooks/seats';
import { useGetShowtime } from 'api-hooks/showtimes';
import * as styles from './styles.css';

const METHODS: { id: PaymentMethod; icon: Icon }[] = [
  { id: 'ewallet', icon: Wallet },
  { id: 'qris', icon: QrCode },
  { id: 'va', icon: Bank },
  { id: 'card', icon: CreditCard },
];

function Line({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className={styles.line}>
      <Text c={bold ? undefined : 'dimmed'} fw={bold ? 600 : 400}>
        {label}
      </Text>
      <Text
        fw={bold ? 800 : 500}
        fz={bold ? 22 : undefined}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </Text>
    </div>
  );
}

export default function CheckoutScreen() {
  const { t } = useTranslation(['layout', 'booking', 'common']);
  const { lang } = useLanguage();
  const navigation = useNontoninNavigation();
  const query = useRouter().query as RouterQueryType<NavigationRoutes.Checkout>;
  const seats = React.useMemo(
    () => (query.seats ?? '').split(',').filter((s) => !!seatById(s)),
    [query.seats],
  );
  const [method, setMethod] = React.useState<PaymentMethod>('ewallet');

  const showtime = useGetShowtime({ id: query.showtimeId });
  const film = useGetFilm({ id: showtime.data?.filmId });
  const cinema = useGetCinema({ id: showtime.data?.cinemaId });
  const seatMap = useGetSeatMap({ showtimeId: query.showtimeId });
  const create = useCreateBooking();
  const { add } = useBookings();

  if (!showtime.data || !film.data || !cinema.data || !seatMap.data) {
    const error = showtime.error || film.error || cinema.error || seatMap.error;
    return (
      <AppLayout title={t('checkout.title')}>
        <Container>
          {error ? (
            <StateView
              error={error}
              onRetry={() => showtime.refetch()}
              minHeight={480}
            />
          ) : (
            <Skeleton h={420} mt={40} radius="md" />
          )}
        </Container>
      </AppLayout>
    );
  }

  const st = showtime.data;
  const totals = orderTotals(seats, seatMap.data);
  const seatUrl = buildUrl(NavigationRoutes.Seat, {
    paths: { showtimeId: st.id },
  });

  const pay = () =>
    create.mutate(
      {
        showtimeId: st.id,
        seats,
        payment: method,
        film: {
          title: film.data.title,
          poster: film.data.poster,
          backdrop: film.data.backdrop,
        },
      },
      {
        onSuccess(booking) {
          add(booking);
          navigation.replace(NavigationRoutes.TicketDetail, {
            paths: { id: booking.id },
            query: { new: '1' },
          });
        },
        onError(e) {
          if (e instanceof ApiError && e.code === 'seat_taken') {
            notifications.show({
              color: 'red',
              message: t('booking:seat.taken', { seats: seats.join(', ') }),
            });
            navigation.replace(NavigationRoutes.Seat, {
              paths: { showtimeId: st.id },
            });
          } else
            notifications.show({
              color: 'red',
              message: t('common:errorTitle'),
            });
        },
      },
    );

  return (
    <AppLayout title={t('checkout.title')}>
      <Container>
        <Group mt={32} gap={14} wrap="nowrap">
          <ActionIcon
            component={Link}
            href={seatUrl}
            variant="default"
            size={40}
            radius="sm"
            aria-label={t('checkout.backToSeats')}
          >
            <ArrowLeft size={18} />
          </ActionIcon>
          <Title order={1} fz={32} style={{ letterSpacing: -0.6 }}>
            {t('checkout.title')}
          </Title>
        </Group>
        <div className={styles.page}>
          <section className={styles.card}>
            <Title order={2} fz={20}>
              {t('booking:checkout.payment')}
            </Title>
            <div className={styles.methods} role="radiogroup">
              {METHODS.map(({ id, icon: I }) => {
                const active = id === method;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={styles.method}
                    data-active={active}
                    onClick={() => setMethod(id)}
                  >
                    <I size={24} color={active ? colors.text : colors.muted} />
                    <Text fw={600} style={{ flex: 1 }}>
                      {t(`booking:checkout.method.${id}`)}
                    </Text>
                    {active && (
                      <CheckCircle
                        size={20}
                        weight="fill"
                        color={colors.text}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <Group gap={8} mt={24}>
              <LockSimple size={16} color={colors.muted} />
              <Text size="sm" c="dimmed">
                {t('checkout.secure')}
              </Text>
            </Group>
          </section>

          <aside className={`${styles.card} ${styles.summary}`}>
            <div className={styles.filmRow}>
              <Image
                src={film.data.poster}
                alt=""
                width={84}
                height={126}
                style={{ borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
              />
              <Stack gap={4}>
                <Text fw={700} fz={18}>
                  {film.data.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {cinema.data.name}, {t('common:studio', { n: st.studio })}
                </Text>
                <Text size="sm">
                  {formatDate(st.date, 'EEEE, d MMMM yyyy', lang)}, {st.time}
                </Text>
                <Text size="sm" fw={700}>
                  {t('booking:checkout.seats')}: {seats.join(', ')}
                </Text>
              </Stack>
            </div>
            <div style={{ marginTop: 14 }}>
              <Line
                label={t('booking:checkout.tickets', { count: seats.length })}
                value={formatIDR(totals.subtotal)}
              />
              {totals.discount > 0 && (
                <Line
                  label={t('booking:checkout.discount', {
                    pct: seatMap.data.discountPercent,
                  })}
                  value={`−${formatIDR(totals.discount)}`}
                />
              )}
              <Line
                label={t('booking:checkout.fee')}
                value={formatIDR(totals.fee)}
              />
              <div className={styles.divider} />
              <Line
                label={t('booking:checkout.total')}
                value={formatIDR(totals.total)}
                bold
              />
            </div>
            <Button
              fullWidth
              size="lg"
              mt={20}
              loading={create.isLoading}
              disabled={!seats.length}
              onClick={pay}
            >
              {t('booking:checkout.pay', { amount: formatIDR(totals.total) })}
            </Button>
            <Text size="xs" c="dimmed" ta="center" mt={10}>
              {t('booking:checkout.demo')}
            </Text>
          </aside>
        </div>
      </Container>
    </AppLayout>
  );
}
