import {
  Button,
  Group,
  Modal,
  SegmentedControl,
  Text,
  Title,
} from '@mantine/core';
import { CaretRight, Info, Trash, UserCircle } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { APP_NAME, APP_VERSION } from 'common/constants/app';
import { byShowTime, isUpcoming } from 'common/helpers/booking';
import { formatDate, formatIDR } from 'common/helpers/format';
import { browserStorage } from 'common/repositories/browser-storage';
import { buildUrl, NavigationRoutes } from 'common/routes';
import colors from 'common/styles/colors';
import CityPickerModal from 'components/widgets/city-picker/city-picker-modal';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';
import { useBookings } from 'hooks/use-bookings';
import { useCity } from 'hooks/use-city';
import useLanguage from 'hooks/use-language';
import usePaymentPreference, {
  PAYMENT_METHODS,
} from 'hooks/use-payment-preference';
import type { Lang } from 'common/api/model';
import * as styles from './styles.css';

function Setting({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.setting}>
      <div style={{ minWidth: 0 }}>
        <Text fw={600}>{title}</Text>
        <Text size="sm" c="dimmed">
          {desc}
        </Text>
      </div>
      {children}
    </div>
  );
}

export default function ProfileScreen() {
  const { t } = useTranslation(['account', 'layout', 'booking']);
  const { lang, setLanguage } = useLanguage();
  const { city } = useCity();
  const { bookings, ready } = useBookings();
  const payment = usePaymentPreference();
  const [cityOpen, setCityOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const upcoming = bookings.filter((b) => isUpcoming(b)).sort(byShowTime);
  const watched = bookings.length - upcoming.length;
  const spent = bookings.reduce((sum, b) => sum + b.total, 0);
  const next = upcoming[0];

  // A full reload also resets the in-memory mock server (seats taken by my bookings)
  const clearAll = () => {
    browserStorage.clearAll();
    window.location.assign(NavigationRoutes.Home);
  };

  return (
    <AppLayout title={t('profile.title')}>
      <Container className={styles.page}>
        <div className={styles.grid}>
          <section className={styles.summary}>
            <div className={styles.guest}>
              <UserCircle size={56} weight="fill" color={colors.muted} />
              <div style={{ minWidth: 0 }}>
                <Title order={1} fz={30} style={{ letterSpacing: -0.6 }}>
                  {t('profile.guest')}
                </Title>
                <Text size="sm" c="dimmed" mt={4}>
                  {t('profile.guestDesc')}
                </Text>
              </div>
            </div>

            <dl className={styles.stats}>
              {[
                [t('profile.upcoming'), String(upcoming.length)],
                [t('profile.watched'), String(watched)],
                [t('profile.spent'), formatIDR(spent)],
              ].map(([label, value]) => (
                <div key={label} className={styles.stat}>
                  <dt>
                    <Text size="sm" c="dimmed">
                      {label}
                    </Text>
                  </dt>
                  <dd>
                    <Text fw={800} fz={22} className={styles.statValue}>
                      {ready ? value : '–'}
                    </Text>
                  </dd>
                </div>
              ))}
            </dl>

            <Text fw={700} mt={28} mb={10}>
              {t('profile.next')}
            </Text>
            {next ? (
              <Link
                href={buildUrl(NavigationRoutes.TicketDetail, {
                  paths: { id: next.id },
                })}
                className={styles.nextTicket}
              >
                <Image
                  src={next.poster}
                  alt=""
                  width={52}
                  height={78}
                  className={styles.nextPoster}
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <Text fw={700} lineClamp={1}>
                    {next.filmTitle}
                  </Text>
                  <Text size="sm" c="dimmed" lineClamp={1}>
                    {next.cinemaName}
                  </Text>
                  <Text size="sm" mt={2}>
                    {formatDate(next.date, 'EEE, d MMM', lang)}, {next.time},{' '}
                    {next.seats.join(', ')}
                  </Text>
                </div>
                <CaretRight size={16} color={colors.muted} aria-hidden />
              </Link>
            ) : (
              <div className={styles.noNext}>
                <Text size="sm" c="dimmed">
                  {t('profile.noNext')}
                </Text>
                <Button
                  component={Link}
                  href={NavigationRoutes.Films}
                  variant="default"
                  size="xs"
                >
                  {t('tickets.browse')}
                </Button>
              </div>
            )}
          </section>

          <div className={styles.settings}>
            <section>
              <Title order={2} fz={20} mb={12}>
                {t('profile.preferences')}
              </Title>
              <div className={styles.group}>
                <Setting title={t('profile.city')} desc={t('profile.cityDesc')}>
                  <Button variant="default" onClick={() => setCityOpen(true)}>
                    {city.name}
                  </Button>
                </Setting>
                <Setting
                  title={t('profile.language')}
                  desc={t('profile.languageDesc')}
                >
                  <SegmentedControl
                    value={lang}
                    onChange={(v) => setLanguage(v as Lang)}
                    data={[
                      { value: 'id', label: 'Indonesia' },
                      { value: 'en', label: 'English' },
                    ]}
                    aria-label={t('profile.language')}
                  />
                </Setting>
              </div>
            </section>

            <section>
              <Title order={2} fz={20}>
                {t('profile.payment')}
              </Title>
              <Text size="sm" c="dimmed" mt={4} mb={12}>
                {t('profile.paymentDesc')}
              </Text>
              <div className={styles.methods} role="radiogroup">
                {PAYMENT_METHODS.map(({ id, icon: I }) => {
                  const active = id === payment.method;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={styles.method}
                      data-active={active}
                      onClick={() => payment.save(id)}
                    >
                      <I
                        size={22}
                        color={active ? colors.text : colors.muted}
                      />
                      <Text fw={600} size="sm">
                        {t(`booking:checkout.method.${id}`)}
                      </Text>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <Title order={2} fz={20} mb={12}>
                {t('profile.other')}
              </Title>
              <div className={styles.group}>
                <Link href={NavigationRoutes.About} className={styles.linkRow}>
                  <Info size={20} color={colors.muted} aria-hidden />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text fw={600}>{t('profile.about')}</Text>
                    <Text size="sm" c="dimmed">
                      {t('profile.aboutDesc')}
                    </Text>
                  </div>
                  <CaretRight size={16} color={colors.muted} aria-hidden />
                </Link>
                <Setting
                  title={t('profile.clearData')}
                  desc={t('profile.clearDesc')}
                >
                  <Button
                    variant="default"
                    c={colors.danger}
                    leftSection={<Trash size={16} />}
                    onClick={() => setConfirmOpen(true)}
                  >
                    {t('profile.clearYes')}
                  </Button>
                </Setting>
              </div>
              <Text size="xs" c="dimmed" mt={16}>
                {APP_NAME}, {t('profile.version', { v: APP_VERSION })}
              </Text>
            </section>
          </div>
        </div>
      </Container>

      <CityPickerModal opened={cityOpen} onClose={() => setCityOpen(false)} />
      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={t('profile.clearTitle')}
      >
        <Text size="sm" c="dimmed">
          {t('profile.clearConfirm')}
        </Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={() => setConfirmOpen(false)}>
            {t('profile.cancel')}
          </Button>
          <Button color="curtain" onClick={clearAll}>
            {t('profile.clearYes')}
          </Button>
        </Group>
      </Modal>
    </AppLayout>
  );
}
