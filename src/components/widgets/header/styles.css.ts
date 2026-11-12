import { GUTTER, HEADER_HEIGHT } from 'common/styles/size';
import breakpoints from 'common/styles/breakpoint';
import { style, vars } from 'styles/styles.css';

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  height: HEADER_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  paddingInline: GUTTER,
  background: vars.color.bg,
  borderBottom: `1px solid ${vars.color.line}`,
  '@media': {
    [breakpoints.screenMaxMd]: { paddingInline: 16, gap: 10 },
  },
});

export const compactBrand = style({
  display: 'none',
  '@media': { [breakpoints.shellCompact]: { display: 'flex' } },
});

export const search = style({
  position: 'relative',
  flex: '0 1 380px',
  minWidth: 0,
});

export const searchIcon = style({
  position: 'absolute',
  left: 14,
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.color.muted,
  pointerEvents: 'none',
});

export const searchInput = style({
  width: '100%',
  height: 42,
  paddingLeft: 42,
  paddingRight: 14,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: 14,
  selectors: {
    '&::placeholder': { color: vars.color.dim },
    '&:hover': { borderColor: vars.color.lineStrong },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.text}`,
      outlineOffset: 2,
    },
  },
});

export const actions = style({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flexShrink: 0,
  '@media': { [breakpoints.screenMaxMd]: { gap: 8 } },
});

export const cityButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  height: 42,
  paddingInline: 14,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'border-color 150ms ease',
  selectors: { '&:hover': { borderColor: vars.color.lineStrong } },
  '@media': {
    [breakpoints.screenMaxSm]: { paddingInline: 10, gap: 6, fontSize: 13 },
  },
});
