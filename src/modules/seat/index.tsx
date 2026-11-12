import { Alert, Button, Group, Skeleton, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  ArrowLeft,
  ArrowRight,
  Cube,
  HandGrabbing,
  Ticket,
} from '@phosphor-icons/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MAX_SEATS_PER_ORDER } from 'common/constants/app';
import { formatDate, formatIDR } from 'common/helpers/format';
import { orderTotals, seatPrice } from 'common/helpers/pricing';
import { buildUrl, NavigationRoutes, RouterQueryType } from 'common/routes';
import colors from 'common/styles/colors';
import { seatById, SeatCell } from 'common/theater/layout';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import { useBookings } from 'hooks/use-bookings';
import useLanguage from 'hooks/use-language';
import useNontoninNavigation from 'hooks/use-nontonin-navigation';
import { useGetCinema } from 'api-hooks/cinemas';
import { useGetFilm } from 'api-hooks/films';
import { useGetSeatMap } from 'api-hooks/seats';
import { useGetShowtime } from 'api-hooks/showtimes';
import SeatInsight, { seatDescription } from './components/seat-insight';
import SeatMap from './components/seat-map';
import {
  OVERVIEW,
  poseForSeat,
  TheaterController,
} from './theater/camera-controller';
import * as styles from './styles.css';

// WebGL only runs in the browser
const TheaterCanvas = dynamic(() => import('./theater/theater-canvas'), {
  ssr: false,
  loading: () => <Skeleton h="100%" radius={0} />,
});

const HOVER_DELAY = 90;

export default function SeatScreen() {
  const { t } = useTranslation(['layout', 'booking', 'common']);
  const { lang } = useLanguage();
  const navigation = useNontoninNavigation();
  const router = useRouter();
  const query = router.query as RouterQueryType<NavigationRoutes.Seat>;
  const showtimeId = query.showtimeId;
  const readOnly = query.view === '1';

  const showtime = useGetShowtime({ id: showtimeId });
  const film = useGetFilm({ id: showtime.data?.filmId });
  const cinema = useGetCinema({ id: showtime.data?.cinemaId });
  const seatMap = useGetSeatMap({ showtimeId });
  const { bookings } = useBookings();

  const owned = React.useMemo(
    () =>
      new Set(
        bookings
          .filter((b) => b.showtimeId === showtimeId)
          .flatMap((b) => b.seats),
      ),
    [bookings, showtimeId],
  );
  const taken = React.useMemo(() => {
    const s = new Set(seatMap.data?.taken ?? []);
    if (readOnly) owned.forEach((id) => s.delete(id)); // show my own seats as mine, not taken
    return s;
  }, [seatMap.data, readOnly, owned]);

  const [selected, setSelected] = React.useState<Set<string>>(() => new Set());
  const mine = readOnly ? owned : selected;

  const [controller] = React.useState(() => new TheaterController());
  const [preview, setPreview] = React.useState<SeatCell | null>(null);
  const hoverTimer = React.useRef<ReturnType<typeof setTimeout>>();

  const flyTo = React.useCallback(
    (s: SeatCell | null) => {
      setPreview((prev) => {
        if (prev?.id === s?.id) return prev;
        if (s)
          controller.flyTo(
            poseForSeat(s),
            prev ? 850 : 1500,
            prev ? 0.15 : 0.9,
          );
        else controller.flyTo(OVERVIEW, 1200, 0.4);
        return s;
      });
    },
    [controller],
  );

  // Open on the seat from the URL (or my first seat when viewing a ticket)
  React.useEffect(() => {
    if (!seatMap.data) return;
    const first = query.seat ?? (readOnly ? [...owned][0] : undefined);
    const s = first ? seatById(first) : undefined;
    if (s) setTimeout(() => flyTo(s), 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seatMap.data]);

  const onHover = (s: SeatCell | null) => {
    clearTimeout(hoverTimer.current);
    if (!s) return; // keep the last view when the cursor leaves the map
    hoverTimer.current = setTimeout(() => flyTo(s), HOVER_DELAY);
  };

  const onPick = (s: SeatCell) => {
    flyTo(s);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(s.id)) next.delete(s.id);
      else if (next.size >= MAX_SEATS_PER_ORDER) {
        notifications.show({
          message: t('seat.maxReached', { max: MAX_SEATS_PER_ORDER }),
          color: 'yellow',
        });
        return prev;
      } else next.add(s.id);
      return next;
    });
  };

  if (!showtime.data || !seatMap.data) {
    const error = showtime.error || seatMap.error;
    return (
      <AppLayout footer={false}>
        <StateView
          loading={!error}
          error={error}
          onRetry={() => seatMap.refetch()}
          minHeight={520}
        />
      </AppLayout>
    );
  }

  const st = showtime.data;
  const seats = [...selected].sort();
  const totals = orderTotals(seats, seatMap.data);
  const filmTitle = film.data?.title ?? '';

  return (
    <AppLayout title={`${t('seat.title')} · ${filmTitle}`} footer={false}>
      <div className={styles.topBar}>
        <Container className={styles.topInner}>
          <Button
            variant="default"
            radius="xl"
            leftSection={<ArrowLeft size={16} />}
            component={Link}
            href={
              readOnly
                ? NavigationRoutes.Tickets
                : buildUrl(NavigationRoutes.FilmDetail, {
                    paths: { id: st.filmId },
                  })
            }
          >
            {readOnly ? t('seat.backToTicket') : t('seat.change')}
          </Button>
          <div>
            <Title order={1} fz={22} lh={1.2}>
              {readOnly ? t('seat.viewMine') : filmTitle}
            </Title>
            <Text size="sm" c="dimmed">
              {readOnly ? `${filmTitle} · ` : ''}
              {cinema.data?.name} · {formatDate(st.date, 'EEEE, d MMMM', lang)}{' '}
              · {st.time} · {t('common:studio', { n: st.studio })}
            </Text>
          </div>
        </Container>
      </div>

      <Container>
        {st.isPast && !readOnly && (
          <Alert color="yellow" mt={20} variant="light">
            {t('seat.showtimePast')}
          </Alert>
        )}
        <div className={styles.workspace}>
          <section className={styles.mapPanel}>
            <SeatMap
              taken={taken}
              selected={mine}
              previewing={preview?.id}
              disabled={readOnly || st.isPast}
              onHover={onHover}
              onPick={onPick}
            />
            <Text
              size="sm"
              c={preview ? '#C9C7CF' : 'dimmed'}
              className={styles.description}
            >
              {preview
                ? seatDescription(preview, (k, o) => t(`booking:${k}`, o))
                : readOnly
                  ? t('seat.viewMineDesc')
                  : t('seat.hoverHint')}
            </Text>
          </section>

          <section
            className={styles.previewPanel}
            aria-label={t('seat.previewTitle')}
          >
            <TheaterCanvas
              controller={controller}
              filmFrame={film.data?.screenFrame}
              taken={taken}
              mine={mine}
            />
            <div className={styles.overlayTop}>
              <span className={styles.chip}>
                <Cube size={15} color={colors.sel} />
                {preview ? t('seat.previewTitle') : t('seat.overview')}
              </span>
              <span className={styles.chip}>
                <HandGrabbing size={15} />
                {t('seat.dragHint')}
              </span>
            </div>
            {preview ? (
              <SeatInsight
                seat={preview}
                price={seatPrice(preview.id, seatMap.data.price)}
              />
            ) : (
              <span className={`${styles.chip} ${styles.emptyHint}`}>
                {t('seat.previewEmpty')}
              </span>
            )}
          </section>
        </div>
      </Container>

      {!readOnly && (
        <div className={styles.orderBar}>
          <Container className={styles.orderInner}>
            {film.data && (
              <Image
                src={film.data.poster}
                alt=""
                width={40}
                height={60}
                style={{ borderRadius: 6, objectFit: 'cover' }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text
                size="xs"
                c="dimmed"
                fw={600}
                tt="uppercase"
                style={{ letterSpacing: 1 }}
              >
                {t('seat.selected')}
              </Text>
              {seats.length ? (
                <Group gap={6} mt={4}>
                  {seats.map((s) => (
                    <span key={s} className={styles.seatPill}>
                      {s}
                    </span>
                  ))}
                </Group>
              ) : (
                <Text c="dimmed" mt={2}>
                  {t('seat.none')}
                </Text>
              )}
            </div>
            {seats.length > 0 && (
              <div style={{ textAlign: 'right' }}>
                <Text size="xs" c="dimmed">
                  {t('booking:seat.seatsCount', { count: seats.length })}
                  {totals.discount > 0
                    ? ` · −${seatMap.data.discountPercent}%`
                    : ''}
                </Text>
                <Text fz={22} fw={800}>
                  {formatIDR(totals.subtotal - totals.discount)}
                </Text>
              </div>
            )}
            <Button
              size="lg"
              rightSection={<ArrowRight size={18} />}
              disabled={!seats.length || st.isPast}
              onClick={() =>
                navigation.push(NavigationRoutes.Checkout, {
                  paths: { showtimeId: st.id },
                  query: { seats: seats.join(',') },
                })
              }
            >
              {t('seat.continue')}
            </Button>
          </Container>
        </div>
      )}
      {readOnly && (
        <div className={styles.orderBar}>
          <Container className={styles.orderInner}>
            <Ticket size={22} color={colors.sel} />
            <Group gap={6} style={{ flex: 1 }}>
              {[...owned].sort().map((s) => (
                <button
                  key={s}
                  type="button"
                  className={styles.seatPill}
                  style={{ border: 'none', cursor: 'pointer' }}
                  onClick={() => flyTo(seatById(s) ?? null)}
                  aria-label={t('booking:seat.name', {
                    row: s[0],
                    num: s.slice(1),
                  })}
                >
                  {s}
                </button>
              ))}
            </Group>
          </Container>
        </div>
      )}
    </AppLayout>
  );
}
