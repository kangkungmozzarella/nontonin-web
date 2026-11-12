import breakpoints from 'common/styles/breakpoint';
import { HEADER_HEIGHT } from 'common/styles/size';
import { style, vars } from 'styles/styles.css';

export const page = style({
  paddingTop: 40,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
  gap: 24,
  alignItems: 'start',
  '@media': {
    [breakpoints.screenMaxLg]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      paddingTop: 24,
    },
  },
});

export const card = style({
  padding: 28,
  borderRadius: vars.radius.md,
  '@media': { [breakpoints.screenMaxSm]: { padding: 18 } },
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
});

export const summary = style({
  position: 'sticky',
  top: HEADER_HEIGHT + 24,
  '@media': { [breakpoints.screenMaxLg]: { position: 'static' } },
});

export const methods = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
  marginTop: 16,
  '@media': { [breakpoints.screenMaxSm]: { gridTemplateColumns: '1fr' } },
});

export const method = style({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: 18,
  borderRadius: vars.radius.sm,
  fontFamily: 'inherit',
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel2,
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

export const filmRow = style({
  display: 'flex',
  gap: 16,
  paddingBottom: 20,
  borderBottom: `1px solid ${vars.color.line}`,
});

export const line = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 12,
  paddingBlock: 6,
});

export const divider = style({
  height: 1,
  background: vars.color.line,
  marginBlock: 10,
});
