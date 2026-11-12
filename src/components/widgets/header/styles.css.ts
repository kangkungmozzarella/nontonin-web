import { HEADER_HEIGHT } from 'common/styles/size';
import breakpoints from 'common/styles/breakpoint';
import { style, vars } from 'styles/styles.css';

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  height: HEADER_HEIGHT,
  background: vars.color.glass,
  backdropFilter: 'saturate(140%) blur(14px)',
  borderBottom: `1px solid ${vars.color.line}`,
});

export const inner = style({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 40,
});

export const brand = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontWeight: 800,
  fontSize: 20,
  letterSpacing: 0.5,
});

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  height: '100%',
  '@media': { [breakpoints.screenMaxMd]: { display: 'none' } },
});

export const navLink = style({
  position: 'relative',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingInline: 14,
  fontSize: 15,
  fontWeight: 500,
  color: vars.color.muted,
  transition: 'color 150ms ease',
  selectors: {
    '&:hover': { color: vars.color.text },
    '&[data-active="true"]': { color: vars.color.text },
    '&[data-active="true"]::after': {
      content: '""',
      position: 'absolute',
      left: 14,
      right: 14,
      bottom: -1,
      height: 2,
      borderRadius: 2,
      background: vars.color.sel,
    },
  },
});

export const actions = style({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const cityButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  height: 40,
  paddingInline: 14,
  borderRadius: 999,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  color: vars.color.text,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'border-color 150ms ease',
  selectors: { '&:hover': { borderColor: vars.color.lineStrong } },
});

export const ticketLink = style({
  position: 'relative',
  width: 40,
  height: 40,
  borderRadius: 999,
  display: 'grid',
  placeItems: 'center',
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  transition: 'border-color 150ms ease',
  selectors: { '&:hover': { borderColor: vars.color.lineStrong } },
});

export const badge = style({
  position: 'absolute',
  top: -4,
  right: -4,
  minWidth: 18,
  height: 18,
  paddingInline: 5,
  borderRadius: 999,
  background: vars.color.sel,
  color: vars.color.selInk,
  fontSize: 11,
  fontWeight: 700,
  display: 'grid',
  placeItems: 'center',
});
