import { createTheme, MantineColorsTuple } from '@mantine/core';

// Mint accent from the mobile app, as a Mantine 10-shade palette
const mint: MantineColorsTuple = [
  '#e8fff3',
  '#d3fbe6',
  '#a7f6cb',
  '#7cf2b4',
  '#57ee9c',
  '#40ec8e',
  '#31eb86',
  '#21d073',
  '#11b965',
  '#009f54',
];

const theme = createTheme({
  primaryColor: 'mint',
  primaryShade: 3,
  colors: { mint },
  // Mint is light, so filled buttons need dark text (as in the mobile app), not white
  autoContrast: true,
  luminanceThreshold: 0.45,
  fontFamily:
    'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: { fontFamily: 'var(--font-inter), sans-serif', fontWeight: '700' },
  defaultRadius: 'md',
  black: '#0B0A0E',
  white: '#F3F2EF',
  cursorType: 'pointer',
  components: {
    Button: { defaultProps: { radius: 'xl' } },
    Modal: {
      defaultProps: {
        centered: true,
        radius: 'lg',
        overlayProps: { backgroundOpacity: 0.7, blur: 6 },
      },
    },
  },
});

export default theme;
