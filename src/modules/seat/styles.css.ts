import { HEADER_HEIGHT } from 'common/styles/size';
import { keyframes, style, vars } from 'styles/styles.css';

const ORDER_BAR = 88;
const TOP_BAR = 77;

export const topBar = style({
  borderBottom: `1px solid ${vars.color.line}`,
  background: vars.color.bg,
});

export const topInner = style({
  height: 76,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const workspace = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(560px, 1fr) minmax(520px, 1.15fr)',
  gap: 24,
  paddingBlock: 24,
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${TOP_BAR}px - ${ORDER_BAR}px)`,
});

export const mapPanel = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '28px 24px',
  borderRadius: 24,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  containerType: 'inline-size',
});

export const previewPanel = style({
  position: 'sticky',
  top: HEADER_HEIGHT + 24,
  alignSelf: 'start',
  height: `calc(100vh - ${HEADER_HEIGHT}px - ${TOP_BAR}px - 48px - ${ORDER_BAR}px)`,
  minHeight: 460,
  borderRadius: 24,
  overflow: 'hidden',
  border: `1px solid ${vars.color.line}`,
  background: vars.color.bgDeep,
});

export const overlayTop = style({
  position: 'absolute',
  top: 16,
  left: 16,
  right: 16,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 12,
  pointerEvents: 'none',
});

export const chip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  height: 34,
  paddingInline: 14,
  borderRadius: 999,
  background: 'rgba(14,13,17,0.78)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${vars.color.line}`,
  fontSize: 13,
  fontWeight: 600,
});

export const insight = style({
  position: 'absolute',
  left: 16,
  right: 16,
  bottom: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  padding: '12px 14px 12px 18px',
  borderRadius: 16,
  background: 'rgba(14,13,17,0.86)',
  backdropFilter: 'blur(14px)',
  border: `1px solid ${vars.color.line}`,
  pointerEvents: 'none',
});

export const stats = style({
  display: 'flex',
  gap: 6,
  flexShrink: 0,
});

export const stat = style({
  padding: '6px 12px',
  borderRadius: 10,
  background: vars.color.panel2,
});

export const description = style({
  marginTop: 20,
  maxWidth: 480,
  minHeight: 44,
  textAlign: 'center',
});

const pulse = keyframes({
  '0%': { opacity: 0.55 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0.55 },
});

export const emptyHint = style({
  position: 'absolute',
  left: '50%',
  bottom: 28,
  transform: 'translateX(-50%)',
  animation: `${pulse} 2.4s ease-in-out infinite`,
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
});

export const orderBar = style({
  position: 'sticky',
  bottom: 0,
  zIndex: 50,
  height: ORDER_BAR,
  borderTop: `1px solid ${vars.color.line}`,
  background: vars.color.glass,
  backdropFilter: 'saturate(140%) blur(14px)',
});

export const orderInner = style({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 24,
});

export const seatPill = style({
  height: 30,
  paddingInline: 12,
  borderRadius: 8,
  display: 'inline-grid',
  placeItems: 'center',
  background: vars.color.selSoft,
  color: vars.color.sel,
  fontWeight: 700,
  fontSize: 14,
});
