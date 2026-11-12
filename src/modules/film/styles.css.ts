import { style, vars } from 'styles/styles.css';

export const backdrop = style({
  position: 'relative',
  height: 440,
  overflow: 'hidden',
  background: vars.color.bgDeep,
});

export const backdropImage = style({
  objectFit: 'cover',
  objectPosition: 'center 20%',
});

export const backdropShade = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(0deg, ${vars.color.bg} 0%, rgba(11,10,14,0.55) 45%, rgba(11,10,14,0.25) 100%)`,
});

export const top = style({
  position: 'relative',
  marginTop: -260,
  display: 'grid',
  gridTemplateColumns: '260px 1fr',
  gap: 40,
  alignItems: 'end',
});

export const poster = style({
  position: 'relative',
  aspectRatio: '2 / 3',
  borderRadius: 18,
  overflow: 'hidden',
  border: `1px solid ${vars.color.lineStrong}`,
  boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
  background: vars.color.panel2,
});

export const ratingPill = style({
  paddingInline: 8,
  height: 26,
  display: 'inline-grid',
  placeItems: 'center',
  borderRadius: 6,
  border: `1px solid ${vars.color.lineStrong}`,
  fontSize: 13,
  fontWeight: 700,
});

export const body = style({
  marginTop: 48,
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: 48,
  alignItems: 'start',
});

export const info = style({
  position: 'sticky',
  top: 96,
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

export const credits = style({
  display: 'grid',
  gridTemplateColumns: '96px 1fr',
  rowGap: 10,
  columnGap: 16,
  fontSize: 14,
});

export const schedule = style({
  padding: 28,
  borderRadius: 22,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
});

export const cinemaRow = style({
  display: 'grid',
  gridTemplateColumns: '220px 1fr',
  gap: 24,
  paddingBlock: 22,
  borderTop: `1px solid ${vars.color.line}`,
  selectors: { '&:first-child': { borderTop: 'none' } },
});
