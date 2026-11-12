import { Group, Text } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  isAisleAfter,
  PER,
  RECL_FROM,
  ROWS,
  SEAT_CELLS,
  SeatCell,
} from 'common/theater/layout';
import colors from 'common/styles/colors';
import * as styles from './styles.css';

interface SeatMapProps {
  taken: ReadonlySet<string>;
  selected: ReadonlySet<string>;
  previewing?: string | null;
  disabled?: boolean;
  onHover: (s: SeatCell | null) => void;
  onPick: (s: SeatCell) => void;
}

function ScreenArc() {
  const { t } = useTranslation('booking');
  return (
    <div className={styles.screen}>
      <svg viewBox="0 0 600 46" width="100%" height="46" aria-hidden>
        <defs>
          <linearGradient id="arc" x1="0" x2="1">
            <stop offset="0" stopColor={colors.sel} stopOpacity="0" />
            <stop offset="0.5" stopColor={colors.sel} stopOpacity="0.9" />
            <stop offset="1" stopColor={colors.sel} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={colors.sel} stopOpacity="0.16" />
            <stop offset="1" stopColor={colors.sel} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M10 30 Q300 -4 590 30 L590 46 Q300 12 10 46 Z"
          fill="url(#glow)"
        />
        <path
          d="M10 30 Q300 -4 590 30"
          fill="none"
          stroke="url(#arc)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <Text size="xs" fw={600} c="dimmed" style={{ letterSpacing: 6 }}>
        {t('seat.screen')}
      </Text>
    </div>
  );
}

export default function SeatMap({
  taken,
  selected,
  previewing,
  disabled,
  onHover,
  onPick,
}: SeatMapProps) {
  const { t } = useTranslation('booking');
  const rows = React.useMemo(
    () => ROWS.map((_, r) => SEAT_CELLS.slice(r * PER, r * PER + PER)),
    [],
  );

  return (
    <div className={styles.map} onMouseLeave={() => onHover(null)}>
      <ScreenArc />
      {rows.map((cells, r) => (
        <div
          key={ROWS[r]}
          className={styles.row}
          data-recliner-start={r === RECL_FROM}
        >
          <span className={styles.rowLabel}>{ROWS[r]}</span>
          {cells.map((c) => {
            const state = selected.has(c.id)
              ? 'selected'
              : taken.has(c.id)
                ? 'taken'
                : 'open';
            return (
              <React.Fragment key={c.id}>
                <button
                  type="button"
                  className={styles.seat}
                  data-kind={c.kind}
                  data-state={state}
                  data-previewing={previewing === c.id}
                  disabled={disabled || state === 'taken'}
                  aria-pressed={state === 'selected'}
                  aria-label={`${t('seat.name', { row: ROWS[c.row], num: c.num })}${state === 'taken' ? ` (${t('seat.legend.taken')})` : ''}`}
                  onMouseEnter={() => state !== 'taken' && onHover(c)}
                  onFocus={() => state !== 'taken' && onHover(c)}
                  onClick={() => onPick(c)}
                >
                  {c.num}
                </button>
                {isAisleAfter(c.col) && <span className={styles.aisle} />}
              </React.Fragment>
            );
          })}
          <span className={styles.rowLabel}>{ROWS[r]}</span>
        </div>
      ))}
      <div className={styles.legend}>
        {(
          [
            ['available', { background: colors.seat }],
            ['taken', { border: `1.5px solid ${colors.lineStrong}` }],
            ['recliner', { background: colors.recl }],
            ['selected', { background: colors.sel }],
          ] as const
        ).map(([k, style]) => (
          <Group key={k} gap={8}>
            <span className={styles.legendSwatch} style={style} />
            <Text size="sm" c="dimmed">
              {t(`seat.legend.${k}`)}
            </Text>
          </Group>
        ))}
      </div>
    </div>
  );
}
