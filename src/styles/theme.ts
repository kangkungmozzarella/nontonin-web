import { createTheme, MantineColorsTuple } from '@mantine/core';

// Red curtain accent (DESIGN.md). Shade 6 is the accent itself.
const curtain: MantineColorsTuple = [
  '#ffe9ec',
  '#fed3d8',
  '#f6a5af',
  '#ef7483',
  '#e94a5e',
  '#e52f47',
  '#c8102e',
  '#a80d26',
  '#8f0a20',
  '#75061a',
];

const FONT =
  'var(--font-jakarta), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const theme = createTheme({
  primaryColor: 'curtain',
  primaryShade: 6,
  colors: { curtain },
  fontFamily: FONT,
  headings: { fontFamily: FONT, fontWeight: '800' },
  // Radius is a hierarchy tool: pills for buttons, 8px for controls, 12px for cards
  defaultRadius: 'sm',
  radius: { sm: '8px', md: '12px', lg: '16px' },
  black: '#0B0A0E',
  white: '#F3F2EF',
  cursorType: 'pointer',
  components: {
    Button: { defaultProps: { radius: 'xl' } },
    Modal: {
      defaultProps: {
        centered: true,
        radius: 'md',
        overlayProps: { backgroundOpacity: 0.75 },
      },
    },
  },
});

export default theme;
