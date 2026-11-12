import breakpoints from 'common/styles/breakpoint';
import { keyframes, style, vars } from 'styles/styles.css';

const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });

export const page = style({ paddingTop: 24 });

/* hero: key art panel, title bottom-left */
export const hero = style({
  position: 'relative',
  height: 'min(520px, 64vh)',
  minHeight: 400,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
  background: vars.color.bgDeep,
  display: 'flex',
  alignItems: 'flex-end',
});

export const heroSlide = style({
  position: 'absolute',
  inset: 0,
  animation: `${fadeIn} 600ms ease`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
});

export const heroImage = style({
  objectFit: 'cover',
  objectPosition: 'center 25%',
});

// Scrim keeps the text area at full contrast whatever the key art looks like
export const heroShade = style({
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(90deg, rgba(11,10,14,0.94) 0%, rgba(11,10,14,0.8) 35%, rgba(11,10,14,0.1) 70%), linear-gradient(0deg, rgba(11,10,14,0.9) 0%, rgba(11,10,14,0) 50%)',
});

export const heroContent = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  maxWidth: 560,
  padding: 48,
  '@media': {
    [breakpoints.screenMaxMd]: { padding: 24, paddingBottom: 88 },
  },
});

export const heroTitle = style({
  fontSize: 'clamp(34px, 5vw, 60px)',
  lineHeight: 1,
  letterSpacing: '-0.03em',
});

export const heroThumbs = style({
  position: 'absolute',
  right: 32,
  bottom: 32,
  display: 'flex',
  gap: 10,
  '@media': {
    [breakpoints.screenMaxMd]: { right: 24, left: 24, bottom: 24 },
  },
});

export const heroThumb = style({
  position: 'relative',
  width: 120,
  aspectRatio: '16 / 9',
  borderRadius: vars.radius.sm,
  overflow: 'hidden',
  border: '2px solid transparent',
  opacity: 0.5,
  cursor: 'pointer',
  padding: 0,
  background: vars.color.panel,
  transition: 'opacity 150ms ease, border-color 150ms ease',
  selectors: {
    '&:hover': { opacity: 0.85 },
    '&[data-active="true"]': { opacity: 1, borderColor: vars.color.text },
  },
  '@media': {
    [breakpoints.screenMaxMd]: {
      width: 'auto',
      flex: 1,
      height: 6,
      aspectRatio: 'auto',
      borderRadius: 3,
      border: 'none',
    },
  },
});

export const section = style({ marginTop: 64 });

/* now showing rail */
export const rail = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: 'minmax(160px, 188px)',
  gap: 20,
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  paddingBottom: 8,
  scrollbarWidth: 'thin',
});

export const railItem = style({ scrollSnapAlign: 'start' });

/* seat preview band: picture left, text right, opposite of the hero */
export const feature = style({
  marginTop: 80,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
  gap: 48,
  alignItems: 'center',
  '@media': {
    [breakpoints.screenMaxLg]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gap: 28,
    },
  },
});

export const featureText = style({ maxWidth: 440 });

export const featureTitle = style({
  fontSize: 'clamp(28px, 3.2vw, 40px)',
  lineHeight: 1.08,
  letterSpacing: '-0.025em',
});

export const stage = style({
  borderRadius: vars.radius.md,
  padding: '32px 28px 36px',
  background: vars.color.bgDeep,
  border: `1px solid ${vars.color.line}`,
  overflow: 'hidden',
});

export const stageScreen = style({
  position: 'relative',
  height: 150,
  borderRadius: '50% 50% 6px 6px / 18px 18px 6px 6px',
  overflow: 'hidden',
  boxShadow: '0 24px 70px rgba(242,217,187,0.16)',
});

export const stageRows = style({
  marginTop: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
  alignItems: 'center',
});

export const stageRow = style({ display: 'flex', gap: 6 });

export const stageSeat = style({
  width: 18,
  height: 15,
  borderRadius: '5px 5px 3px 3px',
  border: `1.5px solid ${vars.color.seatLine}`,
  background: vars.color.seatFill,
  selectors: {
    '&[data-taken="true"]': {
      background: vars.color.takenFill,
      borderColor: vars.color.takenFill,
    },
    '&[data-on="true"]': {
      background: vars.color.accent,
      borderColor: vars.color.accent,
    },
  },
  '@media': {
    [breakpoints.screenMaxSm]: { width: 12, height: 10, borderWidth: 1 },
  },
});

/* coming soon */
export const upcomingGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 24,
});

export const upcomingCard = style({ display: 'block', minWidth: 0 });

export const upcomingImage = style({
  position: 'relative',
  aspectRatio: '16 / 9',
  borderRadius: vars.radius.md,
  overflow: 'hidden',
  background: vars.color.panel2,
  outline: `1px solid ${vars.color.line}`,
  outlineOffset: -1,
  transition: 'outline-color 150ms ease',
  selectors: {
    [`${upcomingCard}:hover &`]: { outlineColor: vars.color.muted },
  },
});

/* cinemas: a plain list, the least visual block on the page */
export const cinemaSection = style({ marginTop: 64, maxWidth: 820 });

export const cinemaList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  borderTop: `1px solid ${vars.color.line}`,
});

export const cinemaRow = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto 16px',
  alignItems: 'center',
  gap: 20,
  paddingBlock: 16,
  paddingInline: 4,
  borderBottom: `1px solid ${vars.color.line}`,
  transition: 'background 150ms ease',
  selectors: { '&:hover': { background: vars.color.panel } },
  '@media': {
    [breakpoints.screenMaxSm]: { gridTemplateColumns: 'minmax(0, 1fr) 16px' },
  },
});

export const cinemaMeta = style({
  whiteSpace: 'nowrap',
  '@media': { [breakpoints.screenMaxSm]: { display: 'none' } },
});

export const cinemaCaret = style({ color: vars.color.muted });
