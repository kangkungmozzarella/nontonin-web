import { Button, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { NavigationRoutes } from 'common/routes';
import AppLayout from 'components/widgets/layout/app-layout';

export default function NotFoundPage() {
  const { t } = useTranslation('layout');
  return (
    <AppLayout title={t('notFound.title')}>
      <Stack align="center" justify="center" mih={480} gap={10} ta="center">
        <Text fz={64} fw={800} c="dimmed">
          404
        </Text>
        <Title order={1} fz={28}>
          {t('notFound.title')}
        </Title>
        <Text c="dimmed">{t('notFound.desc')}</Text>
        <Button component={Link} href={NavigationRoutes.Home} mt={12}>
          {t('notFound.home')}
        </Button>
      </Stack>
    </AppLayout>
  );
}
