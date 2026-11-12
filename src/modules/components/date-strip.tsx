import { Text } from '@mantine/core';
import { addDays, format } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'common/helpers/format';
import useLanguage from 'hooks/use-language';
import * as styles from './styles.css';

export const DAYS_AHEAD = 7;

export function upcomingDays(n = DAYS_AHEAD) {
  const today = new Date();
  return Array.from({ length: n }, (_, i) =>
    format(addDays(today, i), 'yyyy-MM-dd'),
  );
}

export default function DateStrip({
  value,
  onChange,
}: {
  value: string;
  onChange: (d: string) => void;
}) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const days = React.useMemo(() => upcomingDays(), []);
  return (
    <div className={styles.dateStrip} role="tablist">
      {days.map((d, i) => {
        const top =
          i === 0
            ? t('today')
            : i === 1
              ? t('tomorrow')
              : formatDate(d, 'EEE', lang);
        return (
          <button
            key={d}
            type="button"
            role="tab"
            aria-selected={d === value}
            aria-label={formatDate(d, 'EEEE d MMMM', lang)}
            className={styles.dateChip}
            data-active={d === value}
            onClick={() => onChange(d)}
          >
            <Text size="xs" fw={500} c="inherit" opacity={0.75}>
              {top}
            </Text>
            <Text fz={22} fw={700} c="inherit" lh={1.1}>
              {formatDate(d, 'd', lang)}
            </Text>
            <Text size="xs" c="inherit" opacity={0.75}>
              {formatDate(d, 'MMM', lang)}
            </Text>
          </button>
        );
      })}
    </div>
  );
}
