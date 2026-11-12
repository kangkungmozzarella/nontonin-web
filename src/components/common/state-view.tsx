import { Button, Center, Loader, Stack, Text } from '@mantine/core';
import { WarningCircle } from '@phosphor-icons/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import colors from 'common/styles/colors';

interface StateViewProps {
  loading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  empty?: {
    icon?: React.ReactNode;
    title: string;
    desc?: string;
    action?: React.ReactNode;
  };
  minHeight?: number;
}

// Loading, error and empty states shared by every page (like FetchWrapperComponent)
export default function StateView({
  loading,
  error,
  onRetry,
  empty,
  minHeight = 240,
}: StateViewProps) {
  const { t } = useTranslation();
  if (loading)
    return (
      <Center mih={minHeight}>
        <Loader color="mint" type="dots" />
      </Center>
    );
  if (error)
    return (
      <Center mih={minHeight}>
        <Stack align="center" gap={8}>
          <WarningCircle size={36} color={colors.danger} />
          <Text fw={600}>{t('errorTitle')}</Text>
          <Text size="sm" c="dimmed">
            {t('errorDesc')}
          </Text>
          {onRetry && (
            <Button variant="default" size="xs" mt={6} onClick={onRetry}>
              {t('retry')}
            </Button>
          )}
        </Stack>
      </Center>
    );
  if (empty)
    return (
      <Center mih={minHeight}>
        <Stack align="center" gap={8} maw={360} ta="center">
          {empty.icon}
          <Text fw={600}>{empty.title}</Text>
          {empty.desc && (
            <Text size="sm" c="dimmed">
              {empty.desc}
            </Text>
          )}
          {empty.action}
        </Stack>
      </Center>
    );
  return null;
}
