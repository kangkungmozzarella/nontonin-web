import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { ArrowSquareOut, Sparkle } from '@phosphor-icons/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { catalog } from 'common/api/catalog';
import { APP_NAME, APP_VERSION, DESIGN_CREDIT } from 'common/constants/app';
import { AssetPaths } from 'common/constants/assets';
import colors from 'common/styles/colors';
import AppLayout from 'components/widgets/layout/app-layout';
import Container from 'components/widgets/layout/container';

export default function AboutScreen() {
  const { t } = useTranslation('account');
  return (
    <AppLayout title={t('about.title')}>
      <Container style={{ maxWidth: 760, paddingTop: 64 }}>
        <Stack gap={28}>
          <Group gap={18}>
            <Image
              src={AssetPaths.AppIcon}
              alt=""
              width={84}
              height={84}
              style={{ borderRadius: 22 }}
            />
            <div>
              <Title order={1} fz={40} style={{ letterSpacing: 1 }}>
                {APP_NAME}
              </Title>
              <Text c="dimmed">{t('profile.version', { v: APP_VERSION })}</Text>
            </div>
          </Group>
          <Text fz={18} c="#C9C7CF" lh={1.7}>
            {t('about.desc')}
          </Text>
          <Stack
            gap={10}
            p={24}
            style={{
              borderRadius: 20,
              background: colors.selSoft,
              border: '1px solid rgba(124,242,180,0.25)',
            }}
          >
            <Group gap={8}>
              <Sparkle size={18} weight="fill" color={colors.sel} />
              <Text fw={700} c="mint">
                {t('about.creditTitle')}
              </Text>
            </Group>
            <Text>
              {t('about.credit', {
                concept: DESIGN_CREDIT.concept,
                designer: DESIGN_CREDIT.designer,
              })}
            </Text>
            {!!DESIGN_CREDIT.url && (
              <Button
                component="a"
                href={DESIGN_CREDIT.url}
                target="_blank"
                rel="noreferrer"
                variant="default"
                size="xs"
                w="fit-content"
                rightSection={<ArrowSquareOut size={14} />}
              >
                {t('about.openOriginal')}
              </Button>
            )}
          </Stack>
          {catalog.usesTmdb && (
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noreferrer"
            >
              <Group
                gap={16}
                p={18}
                wrap="nowrap"
                style={{ borderRadius: 16, border: `1px solid ${colors.line}` }}
              >
                <Text fw={800} c="#01B4E4" style={{ letterSpacing: 1 }}>
                  TMDB
                </Text>
                <Text size="sm" c="dimmed">
                  {t('about.tmdb')}
                </Text>
              </Group>
            </a>
          )}
          <Stack gap={4}>
            <Text size="sm" c="dimmed">
              {catalog.usesTmdb
                ? t('about.disclaimerTmdb')
                : t('about.disclaimer')}
            </Text>
            <Text size="sm" c="dimmed">
              {t('about.builtWith')}
            </Text>
          </Stack>
        </Stack>
      </Container>
    </AppLayout>
  );
}
