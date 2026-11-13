import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  Armchair,
  CheckCircle,
  DownloadSimple,
  Ticket,
} from '@phosphor-icons/react';
import { toJpeg } from 'html-to-image';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { formatDate, formatIDR } from 'common/helpers/format';
import { buildUrl, NavigationRoutes, RouterQueryType } from 'common/routes';
import colors from 'common/styles/colors';
import StateView from 'components/common/state-view';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import { useBookings } from 'hooks/use-bookings';
import useLanguage from 'hooks/use-language';
import * as styles from './styles.css';

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Text size="xs" c="dimmed" fw={600}>
        {label}
      </Text>
      <Text fw={700} mt={2}>
        {value}
      </Text>
    </div>
  );
}

export default function TicketScreen() {
  const { t } = useTranslation(['account', 'layout', 'booking', 'common']);
  const { lang } = useLanguage();
  const query = useRouter()
    .query as RouterQueryType<NavigationRoutes.TicketDetail>;
  const { bookings, ready } = useBookings();
  const b = bookings.find((x) => x.id === query.id);
  const ticketRef = React.useRef<HTMLElement>(null);
  const [saving, setSaving] = React.useState(false);

  // Snapshot the ticket card as a JPG, so it can go to the gallery or a chat
  const saveImage = async () => {
    if (!ticketRef.current || !b) return;
    setSaving(true);
    try {
      const url = await toJpeg(ticketRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: colors.panel,
      });
      const a = document.createElement('a');
      a.href = url;
      a.download = `nontonin-${b.code}.jpg`;
      a.click();
    } catch {
      notifications.show({
        message: t('layout:ticket.saveImageFailed'),
        color: 'red',
      });
    } finally {
      setSaving(false);
    }
  };

  if (!b)
    return (
      <AppLayout>
        <StateView
          loading={!ready}
          minHeight={480}
          empty={{
            icon: <Ticket size={44} color={colors.muted} />,
            title: t('layout:notFound.title'),
          }}
        />
      </AppLayout>
    );

  return (
    <AppLayout title={b.filmTitle}>
      <Container className={styles.page}>
        {query.new === '1' && (
          <div className={styles.success} role="status">
            <CheckCircle size={28} weight="fill" color={colors.text} />
            <div>
              <Text fw={700}>{t('layout:ticket.successTitle')}</Text>
              <Text size="sm" c="dimmed">
                {t('layout:ticket.successDesc')}
              </Text>
            </div>
          </div>
        )}

        <article ref={ticketRef} className={styles.ticket}>
          <div>
            <div className={styles.hero}>
              <Image
                src={b.backdrop}
                alt=""
                fill
                sizes="620px"
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className={styles.heroShade} />
            </div>
            <div className={styles.details}>
              <Group gap={18} align="flex-end" wrap="nowrap">
                <Image
                  src={b.poster}
                  alt=""
                  width={96}
                  height={144}
                  style={{
                    borderRadius: 8,
                    objectFit: 'cover',
                    flexShrink: 0,
                    border: `1px solid ${colors.lineStrong}`,
                  }}
                />
                <Stack gap={2}>
                  <Title order={1} fz={28}>
                    {b.filmTitle}
                  </Title>
                  <Text c="dimmed">{b.cinemaName}</Text>
                </Stack>
              </Group>
              <div className={styles.facts}>
                <Fact
                  label={t('tickets.date')}
                  value={formatDate(b.date, 'EEE, d MMM', lang)}
                />
                <Fact label={t('tickets.time')} value={b.time} />
                <Fact
                  label={t('layout:ticket.studio')}
                  value={String(b.studio)}
                />
                <Fact
                  label={t('layout:ticket.seats')}
                  value={b.seats.join(', ')}
                />
              </div>
              <Group justify="space-between" mt={24}>
                <Text size="sm" c="dimmed">
                  {t('tickets.paidWith', {
                    method: t(`booking:checkout.method.${b.payment}`),
                  })}
                </Text>
                <Text fw={800} fz={20}>
                  {t('tickets.total')} {formatIDR(b.total)}
                </Text>
              </Group>
            </div>
          </div>
          <div className={styles.stub}>
            <div className={styles.qr}>
              <QRCodeSVG value={`NONTONIN:${b.code}`} size={180} />
            </div>
            <div>
              <Text size="xs" c="dimmed" fw={600}>
                {t('tickets.code')}
              </Text>
              <Text fw={800} fz={22} style={{ letterSpacing: 1 }}>
                {b.code}
              </Text>
            </div>
            <Text size="sm" c="dimmed">
              {t('tickets.showQr')}
            </Text>
          </div>
        </article>

        <div className={styles.actions}>
          <Button
            component={Link}
            href={buildUrl(NavigationRoutes.Seat, {
              paths: { showtimeId: b.showtimeId },
              query: { view: '1' },
            })}
            leftSection={<Armchair size={18} />}
            size="md"
          >
            {t('tickets.previewSeat')}
          </Button>
          <Button
            variant="default"
            size="md"
            leftSection={<DownloadSimple size={18} />}
            onClick={saveImage}
            loading={saving}
          >
            {t('layout:ticket.saveImage')}
          </Button>
          <Button
            component={Link}
            href={NavigationRoutes.Tickets}
            variant="subtle"
            size="md"
            color="gray"
          >
            {t('layout:ticket.allTickets')}
          </Button>
        </div>
      </Container>
    </AppLayout>
  );
}
