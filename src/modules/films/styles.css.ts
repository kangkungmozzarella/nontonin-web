import breakpoints from 'common/styles/breakpoint';
import { style } from 'styles/styles.css';

export const page = style({ paddingTop: 40 });

export const head = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 24,
  marginBottom: 32,
  flexWrap: 'wrap',
  '@media': { [breakpoints.screenMaxMd]: { alignItems: 'flex-start' } },
});

export const noMatch = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 16,
  paddingBlock: 48,
});
