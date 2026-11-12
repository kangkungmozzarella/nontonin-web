import { style, vars } from 'styles/styles.css';

export const page = style({ paddingTop: 40 });

export const head = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 24,
  marginBottom: 28,
});

export const list = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))',
  gap: 16,
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 24,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
});

export const hint = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  padding: '14px 18px',
  borderRadius: vars.radius.sm,
  flexWrap: 'wrap',
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  marginBottom: 20,
});

export const tier = style({
  flexShrink: 0,
  height: 26,
  paddingInline: 10,
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 6,
  border: `1px solid ${vars.color.lineStrong}`,
  fontSize: 12,
  fontWeight: 600,
  color: vars.color.muted,
});
