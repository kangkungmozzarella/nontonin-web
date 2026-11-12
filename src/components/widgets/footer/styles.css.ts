import { style, vars } from 'styles/styles.css';

export const footer = style({
  marginTop: 96,
  borderTop: `1px solid ${vars.color.line}`,
  background: vars.color.bgDeep,
  paddingBlock: 48,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 2fr',
  gap: 48,
});

export const links = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  color: vars.color.muted,
  fontSize: 14,
});

export const link = style({
  selectors: { '&:hover': { color: vars.color.text } },
});

export const tmdb = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: vars.color.muted,
  fontSize: 12,
  lineHeight: 1.5,
});

export const bottom = style({
  marginTop: 40,
  paddingTop: 20,
  borderTop: `1px solid ${vars.color.line}`,
  color: vars.color.dim,
  fontSize: 12,
  display: 'flex',
  justifyContent: 'space-between',
  gap: 16,
});
