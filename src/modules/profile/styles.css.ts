import breakpoints from 'common/styles/breakpoint';
import { HEADER_HEIGHT } from 'common/styles/size';
import { globalStyle, style, vars } from 'styles/styles.css';

export const page = style({ paddingTop: 40 });

// Summary on the left stays in view; settings scroll on the right
export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
  gap: 48,
  alignItems: 'start',
  '@media': {
    [breakpoints.screenMaxLg]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gap: 40,
    },
  },
});

export const summary = style({
  position: 'sticky',
  top: HEADER_HEIGHT + 32,
  '@media': { [breakpoints.screenMaxLg]: { position: 'static' } },
});

export const guest = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const stats = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  marginTop: 28,
  marginBottom: 0,
  borderTop: `1px solid ${vars.color.line}`,
  borderBottom: `1px solid ${vars.color.line}`,
});

export const stat = style({
  paddingBlock: 16,
  paddingRight: 12,
  minWidth: 0,
  selectors: {
    '& + &': {
      paddingLeft: 16,
      borderLeft: `1px solid ${vars.color.line}`,
    },
  },
});

export const statValue = style({
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '@media': { [breakpoints.screenMaxSm]: { fontSize: 17 } },
});

export const nextTicket = style({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: 12,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  transition: 'border-color 150ms ease',
  selectors: { '&:hover': { borderColor: vars.color.muted } },
});

export const nextPoster = style({
  flexShrink: 0,
  borderRadius: 6,
  objectFit: 'cover',
});

export const noNext = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
  padding: 16,
  borderRadius: vars.radius.md,
  border: `1px dashed ${vars.color.lineStrong}`,
});

export const settings = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
});

export const group = style({
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  overflow: 'hidden',
});

// Divider between any two rows of a group, whatever kind of row they are
globalStyle(`${group} > * + *`, {
  borderTop: `1px solid ${vars.color.line}`,
});

const row = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '16px 18px',
} as const;

export const setting = style({
  ...row,
  justifyContent: 'space-between',
  '@media': {
    [breakpoints.screenMaxSm]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
});

export const linkRow = style({
  ...row,
  transition: 'background 150ms ease',
  selectors: {
    '&:hover': { background: vars.color.panel2 },
  },
});

export const methods = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 10,
});

export const method = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: 14,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  color: vars.color.text,
  fontFamily: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'border-color 150ms ease',
  selectors: {
    '&:hover': { borderColor: vars.color.lineStrong },
    '&[data-active="true"]': {
      borderColor: vars.color.accent,
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}`,
    },
  },
});
