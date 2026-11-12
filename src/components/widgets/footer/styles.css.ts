import breakpoints from 'common/styles/breakpoint';
import { style, vars } from 'styles/styles.css';

export const footer = style({
  marginTop: 80,
  borderTop: `1px solid ${vars.color.line}`,
  paddingBlock: 32,
});

export const inner = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr) auto',
  alignItems: 'start',
  gap: 32,
  '@media': {
    [breakpoints.screenMaxLg]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gap: 20,
    },
  },
});

export const notes = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export const tmdb = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: vars.color.muted,
  fontSize: 12,
  lineHeight: 1.5,
  selectors: { '&:hover': { color: vars.color.text } },
});

export const tmdbMark = style({
  fontWeight: 800,
  fontSize: 14,
  color: '#01B4E4',
});

export const rights = style({
  color: vars.color.dim,
  fontSize: 12,
});
