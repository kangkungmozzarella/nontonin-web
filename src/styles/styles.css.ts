import { createGlobalTheme } from '@vanilla-extract/css';
import colors from 'common/styles/colors';
import { radius, space } from 'common/styles/size';

export {
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from '@vanilla-extract/css';
export { recipe } from '@vanilla-extract/recipes';
export type { RecipeVariants } from '@vanilla-extract/recipes';

const px = <T extends Record<string, number>>(o: T) =>
  Object.fromEntries(
    Object.entries(o).map(([k, v]) => [k, `${v}px`]),
  ) as Record<keyof T, string>;

export const vars = createGlobalTheme(':root', {
  color: colors,
  space: px(space),
  radius: px(radius),
  font: {
    body: 'var(--font-jakarta), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
});
