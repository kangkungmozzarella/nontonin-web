import { CONTENT_MAX_WIDTH, GUTTER } from 'common/styles/size';
import breakpoints from 'common/styles/breakpoint';
import { style, vars } from 'styles/styles.css';

export const root = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: vars.color.bg,
});

export const main = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const container = style({
  width: '100%',
  maxWidth: CONTENT_MAX_WIDTH + GUTTER * 2,
  marginInline: 'auto',
  paddingInline: GUTTER,
  '@media': {
    [breakpoints.screenMaxMd]: { paddingInline: 16 },
  },
});
