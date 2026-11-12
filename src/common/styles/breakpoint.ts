import { SHELL_BREAKPOINT } from './size';

// Same breakpoints as kurosim-webapp
const sizes = {
  xxs: 360,
  xs: 414,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1366,
};

const breakpoints = {
  ...sizes,
  shellCompact: `screen and (max-width: ${SHELL_BREAKPOINT - 1}px)`,
  screenSm: `screen and (min-width: ${sizes.sm}px)`,
  screenMd: `screen and (min-width: ${sizes.md}px)`,
  screenLg: `screen and (min-width: ${sizes.lg}px)`,
  screenXl: `screen and (min-width: ${sizes.xl}px)`,
  screenMaxSm: `screen and (max-width: ${sizes.sm - 1}px)`,
  screenMaxMd: `screen and (max-width: ${sizes.md - 1}px)`,
  screenMaxLg: `screen and (max-width: ${sizes.lg - 1}px)`,
  screenMaxXl: `screen and (max-width: ${sizes.xl - 1}px)`,
};

export default breakpoints;
