import breakpoints from 'common/styles/breakpoint';
import { style, vars } from 'styles/styles.css';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 10,
  marginTop: 16,
  '@media': {
    [breakpoints.screenMaxSm]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

export const city = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2,
  padding: '12px 14px',
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel2,
  fontFamily: 'inherit',
  color: vars.color.text,
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'border-color 150ms ease, background 150ms ease',
  selectors: {
    '&:hover': { borderColor: vars.color.lineStrong },
    '&[data-active="true"]': {
      borderColor: vars.color.accent,
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}`,
    },
  },
});
