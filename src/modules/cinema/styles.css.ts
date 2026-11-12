import breakpoints from 'common/styles/breakpoint';
import { style, vars } from 'styles/styles.css';

export const page = style({ paddingTop: 40 });

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: 24,
  paddingBottom: 28,
  borderBottom: `1px solid ${vars.color.line}`,
  marginBottom: 28,
  flexWrap: 'wrap',
});

export const films = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  marginTop: 28,
});

export const filmRow = style({
  display: 'grid',
  gridTemplateColumns: '84px minmax(0, 280px) minmax(0, 1fr)',
  gap: 24,
  alignItems: 'center',
  padding: 16,
  borderRadius: vars.radius.md,
  '@media': {
    [breakpoints.screenMaxLg]: {
      gridTemplateColumns: '64px minmax(0, 1fr)',
      gap: 16,
    },
  },
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
});

export const filmPoster = style({
  borderRadius: 8,
  objectFit: 'cover',
  width: '100%',
  height: 'auto',
  gridRow: 'span 2',
});
