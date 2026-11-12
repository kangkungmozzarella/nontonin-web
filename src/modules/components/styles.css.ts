import { style, vars } from 'styles/styles.css';

/* poster card */
export const posterCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  minWidth: 0,
});

export const posterFrame = style({
  position: 'relative',
  aspectRatio: '2 / 3',
  borderRadius: 14,
  overflow: 'hidden',
  background: vars.color.panel2,
  border: `1px solid ${vars.color.line}`,
  transition:
    'transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
  selectors: {
    [`${posterCard}:hover &`]: {
      transform: 'translateY(-4px)',
      borderColor: vars.color.lineStrong,
      boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
    },
  },
});

export const posterImage = style({ objectFit: 'cover' });

export const posterOverlay = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'flex-end',
  padding: 14,
  background:
    'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(6,5,7,0.92) 100%)',
  opacity: 0,
  transition: 'opacity 200ms ease',
  selectors: { [`${posterCard}:hover &`]: { opacity: 1 } },
});

export const ratingBadge = style({
  position: 'absolute',
  top: 10,
  left: 10,
  paddingInline: 7,
  height: 22,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 6,
  background: 'rgba(10,10,12,0.78)',
  border: `1px solid ${vars.color.lineStrong}`,
  fontSize: 11,
  fontWeight: 700,
});

export const posterGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '32px 24px',
});

/* section header */
export const sectionHeader = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 16,
  marginBottom: 24,
});

/* date strip */
export const dateStrip = style({
  display: 'flex',
  gap: 10,
  overflowX: 'auto',
  paddingBottom: 4,
});

export const dateChip = style({
  flex: '0 0 auto',
  width: 76,
  paddingBlock: 10,
  borderRadius: 14,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  color: vars.color.text,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  cursor: 'pointer',
  transition: 'border-color 150ms ease, background 150ms ease',
  selectors: {
    '&:hover': { borderColor: vars.color.lineStrong },
    '&[data-active="true"]': {
      background: vars.color.sel,
      borderColor: vars.color.sel,
      color: vars.color.selInk,
    },
  },
});

/* showtimes */
export const timeGrid = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
});

export const timeChip = style({
  minWidth: 84,
  height: 44,
  paddingInline: 16,
  borderRadius: 12,
  border: `1px solid ${vars.color.lineStrong}`,
  background: vars.color.panel2,
  color: vars.color.text,
  fontSize: 15,
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  display: 'grid',
  placeItems: 'center',
  transition:
    'border-color 150ms ease, background 150ms ease, color 150ms ease',
  selectors: {
    '&:hover': { borderColor: vars.color.sel, color: vars.color.sel },
    '&[data-disabled="true"]': {
      color: vars.color.dim,
      borderColor: vars.color.line,
      background: 'transparent',
      pointerEvents: 'none',
      textDecoration: 'line-through',
    },
  },
});
