import { style, vars } from 'styles/styles.css';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 10,
  marginTop: 16,
});

export const city = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2,
  padding: '12px 14px',
  borderRadius: 12,
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
