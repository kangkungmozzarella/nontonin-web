import breakpoints from 'common/styles/breakpoint';
import { BOTTOM_NAV_HEIGHT, HEADER_HEIGHT } from 'common/styles/size';
import { style, vars } from 'styles/styles.css';

const SUMMARY_BAR = 84;

/* order summary: film, chosen seats, total and the next step in one bar */
export const summaryBar = style({
  position: 'sticky',
  top: HEADER_HEIGHT,
  zIndex: 60,
  background: vars.color.bg,
  borderBottom: `1px solid ${vars.color.line}`,
  '@media': { [breakpoints.shellCompact]: { position: 'static' } },
});

export const summaryInner = style({
  minHeight: SUMMARY_BAR,
  paddingBlock: 12,
  display: 'flex',
  alignItems: 'center',
  gap: 28,
  '@media': {
    [breakpoints.screenMaxLg]: { flexWrap: 'wrap', gap: '12px 20px' },
  },
});

export const summaryFilm = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  '@media': {
    [breakpoints.screenMaxLg]: { flexBasis: '100%' },
  },
});

export const summaryPoster = style({
  flexShrink: 0,
  borderRadius: 6,
  objectFit: 'cover',
  '@media': { [breakpoints.screenMaxSm]: { display: 'none' } },
});

export const summaryField = style({
  minWidth: 0,
  paddingLeft: 28,
  borderLeft: `1px solid ${vars.color.line}`,
  '@media': {
    [breakpoints.screenMaxLg]: { paddingLeft: 0, borderLeft: 'none' },
  },
});

export const summaryValue = style({
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 260,
});

export const summaryButton = style({
  flexShrink: 0,
  '@media': { [breakpoints.screenMaxLg]: { marginLeft: 'auto' } },
});

export const seatTag = style({
  height: 30,
  paddingInline: 10,
  borderRadius: 6,
  border: `1px solid ${vars.color.lineStrong}`,
  background: vars.color.panel,
  color: vars.color.text,
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: 14,
  cursor: 'pointer',
  selectors: {
    '&:hover': { borderColor: vars.color.text },
    '&[data-active="true"]': {
      background: vars.color.accent,
      borderColor: vars.color.accent,
      color: vars.color.onAccent,
    },
  },
});

/* map left, 3D right; stacked below 1100px */
export const workspace = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
  gap: 24,
  paddingBlock: 24,
  '@media': {
    'screen and (max-width: 1099px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const mapPanel = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '28px 20px',
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  containerType: 'inline-size',
  '@media': { [breakpoints.screenMaxSm]: { padding: '20px 8px' } },
});

export const previewPanel = style({
  position: 'sticky',
  top: HEADER_HEIGHT + SUMMARY_BAR + 24,
  alignSelf: 'start',
  height: `calc(100vh - ${HEADER_HEIGHT + SUMMARY_BAR + 48}px)`,
  minHeight: 460,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
  border: `1px solid ${vars.color.line}`,
  background: vars.color.bgDeep,
  '@media': {
    'screen and (max-width: 1099px)': {
      position: 'relative',
      top: 0,
      height: 'auto',
      minHeight: 0,
      aspectRatio: '4 / 3',
      order: -1,
    },
    [breakpoints.shellCompact]: {
      position: 'sticky',
      top: HEADER_HEIGHT,
      zIndex: 40,
      aspectRatio: '16 / 10',
      maxHeight: `calc(50vh - ${BOTTOM_NAV_HEIGHT / 2}px)`,
      width: '100%',
    },
  },
});

export const overlayTop = style({
  position: 'absolute',
  top: 14,
  left: 14,
  right: 14,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 12,
  pointerEvents: 'none',
});

// Solid scrim over the 3D view; the insight bar is the only glass surface on the page
export const chip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  height: 32,
  paddingInline: 12,
  borderRadius: vars.radius.sm,
  background: vars.color.scrim,
  fontSize: 13,
  fontWeight: 600,
});

export const dragChip = style({
  '@media': { [breakpoints.screenMaxSm]: { display: 'none' } },
});

export const insight = style({
  position: 'absolute',
  left: 14,
  right: 14,
  bottom: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
  padding: '12px 14px 12px 16px',
  borderRadius: vars.radius.md,
  background: 'rgba(14,13,17,0.82)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${vars.color.line}`,
  pointerEvents: 'none',
  '@media': { [breakpoints.screenMaxSm]: { padding: 10, gap: 8 } },
});

export const stats = style({
  display: 'flex',
  gap: 6,
  flexShrink: 0,
  '@media': { [breakpoints.screenMaxSm]: { display: 'none' } },
});

export const stat = style({
  padding: '6px 12px',
  borderRadius: vars.radius.sm,
  background: vars.color.panel2,
});

export const description = style({
  marginTop: 20,
  maxWidth: 480,
  minHeight: 44,
  textAlign: 'center',
});

export const emptyHint = style({
  position: 'absolute',
  left: '50%',
  bottom: 20,
  transform: 'translateX(-50%)',
  pointerEvents: 'none',
  maxWidth: 'calc(100% - 28px)',
  whiteSpace: 'normal',
  textAlign: 'center',
  height: 'auto',
  paddingBlock: 8,
});
