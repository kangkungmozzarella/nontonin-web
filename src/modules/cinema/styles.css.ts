import { style, vars } from 'styles/styles.css';

export const page = style({ paddingTop: 48 });

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: 24,
  paddingBottom: 28,
  borderBottom: `1px solid ${vars.color.line}`,
  marginBottom: 28,
});

export const films = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  marginTop: 28,
});

export const filmRow = style({
  display: 'grid',
  gridTemplateColumns: '84px 280px 1fr',
  gap: 24,
  alignItems: 'center',
  padding: 16,
  borderRadius: 18,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
});
