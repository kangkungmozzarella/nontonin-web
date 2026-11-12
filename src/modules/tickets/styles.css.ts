import { style, vars } from 'styles/styles.css';

export const page = style({ paddingTop: 48 });

export const head = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 24,
  marginBottom: 28,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
  gap: 16,
});

export const card = style({
  display: 'flex',
  gap: 16,
  padding: 16,
  borderRadius: 18,
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panel,
  transition: 'border-color 150ms ease, transform 150ms ease',
  selectors: {
    '&:hover': {
      borderColor: vars.color.lineStrong,
      transform: 'translateY(-2px)',
    },
    '&[data-past="true"]': { opacity: 0.6 },
  },
});
