import { Button, Group, Modal, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { NavigationArrow } from '@phosphor-icons/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CINEMAS, CITIES } from 'common/api/mock/data';
import { useCity } from 'hooks/use-city';
import { nearestCity, useUserLocation } from 'hooks/use-user-location';
import * as styles from './styles.css';

export default function CityPickerModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation('layout');
  const { city, setCityId } = useCity();
  const { coords, request } = useUserLocation();
  const [locating, setLocating] = React.useState(false);
  const nearest = coords ? nearestCity(coords).id : null;

  const locate = async () => {
    setLocating(true);
    const c = await request();
    setLocating(false);
    if (!c) {
      notifications.show({ message: t('cityPicker.denied'), color: 'red' });
      return;
    }
    const found = nearestCity(c);
    setCityId(found.id);
    notifications.show({
      message: t('cityPicker.detected', { city: found.name }),
    });
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('cityPicker.title')}
      size="lg"
    >
      <Text size="sm" c="dimmed">
        {t('cityPicker.desc')}
      </Text>
      <Group mt="md">
        <Button
          variant="default"
          leftSection={<NavigationArrow size={16} weight="fill" />}
          loading={locating}
          onClick={locate}
        >
          {locating ? t('cityPicker.locating') : t('cityPicker.useLocation')}
        </Button>
      </Group>
      <div className={styles.grid}>
        {CITIES.map((c) => {
          const count = CINEMAS.filter((x) => x.cityId === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              className={styles.city}
              data-active={c.id === city.id}
              onClick={() => {
                setCityId(c.id);
                onClose();
              }}
            >
              <Group gap={6}>
                <Text fw={600}>{c.name}</Text>
                {c.id === nearest && (
                  <Text size="xs" c="dimmed">
                    ({t('cityPicker.nearest').toLocaleLowerCase()})
                  </Text>
                )}
              </Group>
              <Text size="xs" c="dimmed">
                {c.province}, {t('cinemas.subtitle', { count })}
              </Text>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
