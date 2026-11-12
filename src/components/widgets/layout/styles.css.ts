import {
  BOTTOM_NAV_HEIGHT,
  CONTENT_MAX_WIDTH,
  GUTTER,
  SIDEBAR_WIDTH,
} from 'common/styles/size';
import breakpoints from 'common/styles/breakpoint';
import { style, vars } from 'styles/styles.css';

export const root = style({
  minHeight: '100vh',
  display: 'grid',
  gridTemplateColumns: `${SIDEBAR_WIDTH}px minmax(0, 1fr)`,
  background: vars.color.bg,
  '@media': {
    [breakpoints.shellCompact]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      paddingBottom: BOTTOM_NAV_HEIGHT,
    },
  },
});

export const column = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
});

export const main = style({
  position: 'relative',
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

/* sidebar */
export const sidebar = style({
  position: 'sticky',
  top: 0,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  padding: '24px 16px',
  background: vars.color.bgDeep,
  borderRight: `1px solid ${vars.color.line}`,
  '@media': { [breakpoints.shellCompact]: { display: 'none' } },
});

export const brand = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  paddingInline: 8,
  fontWeight: 800,
  fontSize: 20,
  letterSpacing: -0.3,
});

export const sideNav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const sideLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  height: 44,
  paddingInline: 12,
  borderRadius: vars.radius.sm,
  color: vars.color.muted,
  fontSize: 15,
  fontWeight: 600,
  transition: 'background 150ms ease, color 150ms ease',
  selectors: {
    '&:hover': { color: vars.color.text, background: vars.color.panel },
    '&[data-active="true"], &[data-active="true"]:hover': {
      background: vars.color.accent,
      color: vars.color.onAccent,
    },
  },
});

export const count = style({
  marginLeft: 'auto',
  minWidth: 22,
  height: 22,
  paddingInline: 6,
  borderRadius: 6,
  display: 'grid',
  placeItems: 'center',
  fontSize: 12,
  fontWeight: 700,
  background: vars.color.panel3,
  color: vars.color.text,
  selectors: {
    [`${sideLink}[data-active="true"] &`]: {
      background: 'rgba(0,0,0,0.25)',
    },
  },
});

/* bottom navigation on narrow screens */
export const bottomNav = style({
  display: 'none',
  '@media': {
    [breakpoints.shellCompact]: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 150,
      height: BOTTOM_NAV_HEIGHT,
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      background: vars.color.bgDeep,
      borderTop: `1px solid ${vars.color.line}`,
      paddingBottom: 'env(safe-area-inset-bottom)',
    },
  },
});

export const bottomLink = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 3,
  fontSize: 11,
  fontWeight: 600,
  color: vars.color.muted,
  selectors: {
    '&[data-active="true"]': { color: vars.color.text },
  },
});

export const bottomIcon = style({
  position: 'relative',
  width: 48,
  height: 28,
  display: 'grid',
  placeItems: 'center',
  borderRadius: vars.radius.sm,
  selectors: {
    [`${bottomLink}[data-active="true"] &`]: {
      background: vars.color.accent,
      color: vars.color.onAccent,
    },
  },
});

export const dot = style({
  position: 'absolute',
  top: 2,
  right: 10,
  width: 8,
  height: 8,
  borderRadius: 999,
  background: vars.color.text,
  boxShadow: `0 0 0 2px ${vars.color.bgDeep}`,
});
