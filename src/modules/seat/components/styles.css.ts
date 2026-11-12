import { style, vars } from 'styles/styles.css';

export const map = style({
  // A row is 18.5 seats wide (seats, gaps and aisles) plus the two row labels
  ['--s' as string]: 'min(32px, calc((100cqw - 56px) / 18.5))',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  userSelect: 'none',
});

export const screen = style({
  width: '92%',
  marginBottom: 26,
  textAlign: 'center',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'calc(var(--s) * 0.2)',
  selectors: { '&[data-recliner-start="true"]': { marginTop: 14 } },
});

export const rowLabel = style({
  width: 22,
  textAlign: 'center',
  fontSize: 12,
  fontWeight: 600,
  color: vars.color.dim,
});

export const aisle = style({ width: 'calc(var(--s) * 0.75)' });

export const seat = style({
  width: 'var(--s)',
  height: 'calc(var(--s) * 0.86)',
  borderRadius:
    'calc(var(--s) * 0.3) calc(var(--s) * 0.3) calc(var(--s) * 0.16) calc(var(--s) * 0.16)',
  border: '1.5px solid transparent',
  background: vars.color.seat,
  color: 'transparent',
  fontSize: 10,
  fontWeight: 700,
  padding: 0,
  cursor: 'pointer',
  transition:
    'background 120ms ease, transform 120ms ease, box-shadow 120ms ease',
  selectors: {
    '&[data-kind="rec"]': { background: vars.color.recl },
    '&:hover:not([data-state="taken"])': {
      transform: 'translateY(-2px)',
      background: vars.color.seatHover,
      color: vars.color.text,
    },
    '&[data-kind="rec"]:hover:not([data-state="taken"])': {
      background: vars.color.reclHover,
    },
    '&[data-state="taken"]': {
      background: 'transparent',
      borderColor: vars.color.lineStrong,
      cursor: 'not-allowed',
    },
    '&[data-kind="rec"][data-state="taken"]': {
      borderColor: vars.color.reclTaken,
    },
    '&[data-state="selected"], &[data-state="selected"]:hover': {
      background: vars.color.sel,
      color: vars.color.selInk,
    },
    '&[data-previewing="true"]': {
      boxShadow: `0 0 0 3px ${vars.color.bg}, 0 0 0 5px ${vars.color.sel}`,
    },
    '&:disabled': { cursor: 'default' },
  },
});

export const legend = style({
  display: 'flex',
  gap: 20,
  marginTop: 28,
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const legendSwatch = style({
  width: 14,
  height: 12,
  borderRadius: '4px 4px 2px 2px',
});
