import { HEADER_HEIGHT } from 'common/styles/size';
import { style, vars } from 'styles/styles.css';

export const page = style({
  paddingTop: 40,
  display: 'grid',
  gridTemplateColumns: '1.3fr 1fr',
  gap: 32,
  alignItems: 'start',
});

export const card = style({
  padding: 28,
  borderRadius: 22,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
});

export const summary = style({
  position: 'sticky',
  top: HEADER_HEIGHT + 24,
});

export const methods = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
  marginTop: 16,
});

export const method = style({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: '18px 18px',
  borderRadius: 16,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel2,
  color: vars.color.text,
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'border-color 150ms ease, background 150ms ease',
  selectors: {
    '&:hover': { borderColor: vars.color.lineStrong },
    '&[data-active="true"]': {
      borderColor: vars.color.sel,
      background: vars.color.selSoft,
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
