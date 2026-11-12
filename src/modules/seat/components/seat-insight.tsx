import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { analyze, TAG_COLOR } from 'common/theater/analyze';
import { ROWS, SeatCell } from 'common/theater/layout';
import { formatIDR } from 'common/helpers/format';
import * as styles from '../styles.css';

// Compact bar over the 3D view: label, seat, price and the numbers behind the label
export default function SeatInsight({
  seat,
  price,
}: {
  seat: SeatCell;
  price: number;
}) {
  const { t } = useTranslation('booking');
  const a = analyze(seat);
  return (
    <div className={styles.insight}>
      <div style={{ minWidth: 0 }}>
        <Text size="xs" fw={700} c="dimmed" truncate>
          <Text
            span
            inherit
            tt="uppercase"
            c={TAG_COLOR[a.tag]}
            style={{ letterSpacing: 1.2 }}
          >
            {t(`seat.tag.${a.tag}`)}
          </Text>
          {` · ${t(`seat.kind.${seat.kind}`)} · ${formatIDR(price)}`}
        </Text>
        <Text fz={19} fw={700} lh={1.25} truncate>
          {t('seat.name', { row: ROWS[seat.row], num: seat.num })}
        </Text>
      </div>
      <div className={styles.stats}>
        {[
          [`${Math.round(a.fov)}°`, t('seat.stats.fov')],
          [`${a.dist.toFixed(1).replace('.', ',')} m`, t('seat.stats.dist')],
          [
            a.off < 3
              ? t('seat.stats.centered')
              : t('seat.stats.off', { deg: Math.round(a.off) }),
            t('seat.stats.angle'),
          ],
        ].map(([v, l]) => (
          <div key={l} className={styles.stat}>
            <Text fw={700} size="sm">
              {v}
            </Text>
            <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
              {l}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

// Plain-language explanation shown under the seat map
export function seatDescription(
  seat: SeatCell,
  t: (k: string, o?: Record<string, unknown>) => string,
) {
  const a = analyze(seat);
  return a.tag === 'full' && seat.kind === 'rec'
    ? t('seat.desc.fullRec')
    : t(`seat.desc.${a.tag}`, {
        tilt: Math.round(a.tilt),
        off: Math.round(a.off),
      });
}
