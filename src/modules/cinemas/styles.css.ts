import { style, vars } from 'styles/styles.css';

export const page = style({ paddingTop: 48 });

export const head = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 24,
  marginBottom: 28,
});

export const list = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
  gap: 16,
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 24,
  borderRadius: 20,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
});

export const hint = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  padding: '14px 18px',
  borderRadius: 14,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  marginBottom: 20,
});
