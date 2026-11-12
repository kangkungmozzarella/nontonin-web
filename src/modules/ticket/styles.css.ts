import breakpoints from 'common/styles/breakpoint';
import { globalStyle, style, vars } from 'styles/styles.css';

export const page = style({ paddingTop: 40, maxWidth: 920 });

export const success = style({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: '16px 20px',
  borderRadius: vars.radius.md,
  background: vars.color.panel,
  border: `1px solid ${vars.color.lineStrong}`,
  marginBottom: 24,
});

export const ticket = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 300px',
  borderRadius: vars.radius.md,
  '@media': {
    [breakpoints.screenMaxMd]: { gridTemplateColumns: 'minmax(0, 1fr)' },
  },
  overflow: 'hidden',
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
});

export const hero = style({
  position: 'relative',
  height: 200,
});

export const heroShade = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(0deg, ${vars.color.panel} 0%, rgba(20,20,23,0.2) 100%)`,
});

export const details = style({
  position: 'relative',
  padding: '0 28px 28px',
  marginTop: -56,
  '@media': { [breakpoints.screenMaxSm]: { padding: '0 18px 20px' } },
});

export const facts = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  '@media': {
    [breakpoints.screenMaxSm]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
  gap: 12,
  marginTop: 20,
});

export const stub = style({
  borderLeft: `2px dashed ${vars.color.lineStrong}`,
  '@media': {
    [breakpoints.screenMaxMd]: {
      borderLeft: 'none',
      borderTop: `2px dashed ${vars.color.lineStrong}`,
    },
  },
  padding: 28,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 14,
  textAlign: 'center',
});

export const qr = style({
  padding: 14,
  borderRadius: vars.radius.md,
  background: '#fff',
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  marginTop: 24,
});

// Print just the ticket on a light background
globalStyle('body', {
  '@media': {
    print: { background: '#fff' },
  },
});
globalStyle(`header, footer, aside, nav, .${actions}, .${success}`, {
  '@media': { print: { display: 'none !important' } },
});
