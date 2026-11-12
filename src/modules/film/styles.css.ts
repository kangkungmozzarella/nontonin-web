import breakpoints from 'common/styles/breakpoint';
import { style, vars } from 'styles/styles.css';

// Key art fades in behind the top of the page, as in the reference layout
export const backdrop = style({
  position: 'absolute',
  insetInline: 0,
  height: 520,
  overflow: 'hidden',
  pointerEvents: 'none',
});

export const backdropImage = style({
  objectFit: 'cover',
  objectPosition: 'center 20%',
  opacity: 0.35,
});

export const backdropShade = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(0deg, ${vars.color.bg} 0%, rgba(11,10,14,0.6) 50%, rgba(11,10,14,0.4) 100%), linear-gradient(90deg, ${vars.color.bg} 0%, rgba(11,10,14,0) 60%)`,
});

export const page = style({ position: 'relative', paddingTop: 40 });

export const top = style({
  display: 'grid',
  gridTemplateColumns: '260px minmax(0, 1fr)',
  gap: 48,
  alignItems: 'start',
  '@media': {
    [breakpoints.screenMaxMd]: {
      gridTemplateColumns: '120px minmax(0, 1fr)',
      gap: 20,
    },
  },
});

export const poster = style({
  position: 'relative',
  aspectRatio: '2 / 3',
  borderRadius: vars.radius.md,
  overflow: 'hidden',
  outline: `1px solid ${vars.color.lineStrong}`,
  outlineOffset: -1,
  background: vars.color.panel2,
});

export const info = style({ minWidth: 0 });

export const title = style({
  fontSize: 'clamp(30px, 4.4vw, 52px)',
  lineHeight: 1.02,
  letterSpacing: '-0.03em',
});

export const chip = style({
  height: 30,
  paddingInline: 12,
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.lineStrong}`,
  fontSize: 13,
  fontWeight: 600,
});

export const credits = style({
  display: 'grid',
  gridTemplateColumns: '88px 1fr',
  rowGap: 8,
  columnGap: 16,
  maxWidth: 640,
});

export const schedule = style({
  marginTop: 64,
  scrollMarginTop: 96,
});

export const scheduleHead = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
  marginBottom: 20,
});

export const cinemas = style({ marginTop: 24 });

export const cinemaRow = style({
  display: 'grid',
  gridTemplateColumns: '260px minmax(0, 1fr)',
  gap: 24,
  padding: 20,
  marginBottom: 12,
  borderRadius: vars.radius.md,
  background: vars.color.panel,
  border: `1px solid ${vars.color.line}`,
  '@media': {
    [breakpoints.screenMaxMd]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gap: 14,
      padding: 16,
    },
  },
});

export const cinemaName = style({
  fontWeight: 700,
  fontSize: 16,
  selectors: {
    '&:hover': { textDecoration: 'underline', textUnderlineOffset: 3 },
  },
});
