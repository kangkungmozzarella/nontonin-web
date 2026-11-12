import { globalStyle, style, vars } from 'styles/styles.css';

export const map = style({
  // A row is 18.5 seats wide (seats, gaps and aisles) plus the two row labels
  // Seats never shrink below 22px; on narrow screens the map scrolls sideways instead
  ['--s' as string]: 'clamp(22px, calc((100cqw - 56px) / 18.5), 32px)',
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  userSelect: 'none',
});

// Only the seat rows scroll sideways on narrow screens; the legend stays put
export const scroller = style({
  alignSelf: 'stretch',
  overflowX: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'safe center',
  gap: 8,
  paddingBottom: 4,
});

export const screen = style({
  width: 'calc(var(--s) * 17)',
  maxWidth: '100%',
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
  flexShrink: 0,
  width: 22,
  textAlign: 'center',
  fontSize: 12,
  fontWeight: 600,
  color: vars.color.dim,
});

export const aisle = style({ width: 'calc(var(--s) * 0.75)' });

export const seat = style({
  position: 'relative',
  width: 'var(--s)',
  height: 'calc(var(--s) * 0.86)',
  borderRadius:
    'calc(var(--s) * 0.3) calc(var(--s) * 0.3) calc(var(--s) * 0.16) calc(var(--s) * 0.16)',
  border: `1.5px solid ${vars.color.seatLine}`,
  background: vars.color.seatFill,
  color: 'transparent',
  fontFamily: 'inherit',
  fontSize: 10,
  fontWeight: 700,
  padding: 0,
  cursor: 'pointer',
  transition: 'background 120ms ease, border-color 120ms ease',
  selectors: {
    '&[data-kind="rec"]': {
      borderColor: vars.color.recl,
      background: vars.color.reclFill,
    },
    '&:hover:not([data-state="taken"]):not([data-state="selected"]):not(:disabled)':
      {
        background: vars.color.seatHover,
        borderColor: vars.color.text,
        color: vars.color.text,
      },
    // Taken: filled block with a cross, so it differs by shape and not only by colour
    '&[data-state="taken"]': {
      background: vars.color.takenFill,
      borderColor: vars.color.takenFill,
      cursor: 'not-allowed',
    },
    '&[data-state="taken"]::before, &[data-state="taken"]::after': {
      content: '""',
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '52%',
      height: 1.5,
      borderRadius: 1,
      background: vars.color.takenMark,
    },
    '&[data-state="taken"]::before': {
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },
    '&[data-state="taken"]::after': {
      transform: 'translate(-50%, -50%) rotate(-45deg)',
    },
    '&[data-state="selected"], &[data-state="selected"]:hover': {
      background: vars.color.accent,
      borderColor: vars.color.accent,
      color: vars.color.onAccent,
    },
    '&[data-previewing="true"]': {
      outline: `2px solid ${vars.color.text}`,
      outlineOffset: 2,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.text}`,
      outlineOffset: 2,
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
  position: 'relative',
  width: 18,
  height: 15,
  borderRadius: '5px 5px 3px 3px',
});

// Same cross as a taken seat
globalStyle(
  `${legendSwatch}[data-taken="true"]::before, ${legendSwatch}[data-taken="true"]::after`,
  {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '55%',
    height: 1.5,
    background: vars.color.takenMark,
    transform: 'translate(-50%, -50%) rotate(45deg)',
  },
);

globalStyle(`${legendSwatch}[data-taken="true"]::after`, {
  transform: 'translate(-50%, -50%) rotate(-45deg)',
});
