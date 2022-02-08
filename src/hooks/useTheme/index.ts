import { Theme } from '@/store/enums';

import colorPalette from '@/assets/theme.json';

type ColorPalette = typeof colorPalette;

function useTheme(theme: Theme) {
  const palette: ColorPalette = colorPalette;
  let mode: Theme.DARK | Theme.LIGHT;

  if (theme === Theme.AUTO) {
    mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
  } else {
    mode = theme;
  }

  return {
    themeMode: mode,
    layout: palette[mode],
  };
}

export default useTheme;
