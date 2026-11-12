import { keyframes, style, vars } from 'styles/styles.css';

const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });

export const hero = style({
  position: 'relative',
  height: 'min(620px, 72vh)',
  minHeight: 480,
  overflow: 'hidden',
  background: vars.color.bgDeep,
});

export const heroSlide = style({
  position: 'absolute',
  inset: 0,
  animation: `${fadeIn} 700ms ease`,
});

export const heroImage = style({
  objectFit: 'cover',
  objectPosition: 'center 25%',
});

export const heroShade = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(90deg, ${vars.color.bg} 0%, rgba(11,10,14,0.88) 30%, rgba(11,10,14,0.2) 65%, rgba(11,10,14,0.35) 100%), linear-gradient(0deg, ${vars.color.bg} 0%, rgba(11,10,14,0) 35%)`,
});

export const heroContent = style({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 16,
  maxWidth: 560,
});

export const heroThumbs = style({
  position: 'absolute',
  right: 0,
  bottom: 40,
  display: 'flex',
  gap: 12,
});

export const heroThumb = style({
  position: 'relative',
  width: 132,
  aspectRatio: '16 / 9',
  borderRadius: 10,
  overflow: 'hidden',
  border: `2px solid transparent`,
  opacity: 0.55,
  cursor: 'pointer',
  padding: 0,
  background: vars.color.panel,
  transition: 'opacity 200ms ease, border-color 200ms ease',
  selectors: {
    '&:hover': { opacity: 0.9 },
    '&[data-active="true"]': { opacity: 1, borderColor: vars.color.sel },
  },
});

export const section = style({ marginTop: 72 });

export const feature = style({
  marginTop: 96,
  display: 'grid',
  gridTemplateColumns: '1fr 1.1fr',
  gap: 56,
  alignItems: 'center',
  padding: 48,
  borderRadius: 28,
  border: `1px solid ${vars.color.line}`,
  background: `radial-gradient(120% 140% at 100% 0%, rgba(124,242,180,0.10) 0%, rgba(11,10,14,0) 55%), ${vars.color.panel}`,
});

export const steps = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  marginTop: 28,
});

export const stepNum = style({
  flex: '0 0 auto',
  width: 28,
  height: 28,
  borderRadius: 999,
  display: 'grid',
  placeItems: 'center',
  background: vars.color.selSoft,
  color: vars.color.sel,
  fontSize: 13,
  fontWeight: 700,
});

/* decorative auditorium in the feature block */
export const stage = style({
  position: 'relative',
  borderRadius: 20,
  padding: '28px 28px 32px',
  background: vars.color.bgDeep,
  border: `1px solid ${vars.color.line}`,
  overflow: 'hidden',
});

export const stageScreen = style({
  position: 'relative',
  height: 120,
  borderRadius: '50% 50% 8px 8px / 18px 18px 8px 8px',
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(242,217,187,0.18)',
});

export const stageRows = style({
  marginTop: 28,
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
  background: vars.color.seat,
  selectors: {
    '&[data-taken="true"]': { background: vars.color.taken },
    '&[data-on="true"]': {
      background: vars.color.sel,
      boxShadow: `0 0 0 4px ${vars.color.selSoft}`,
    },
  },
});

export const cinemaGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: 16,
});

export const cinemaCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: 20,
  borderRadius: 16,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  transition: 'border-color 150ms ease, transform 150ms ease',
  selectors: {
    '&:hover': {
      borderColor: vars.color.lineStrong,
      transform: 'translateY(-2px)',
    },
  },
});
