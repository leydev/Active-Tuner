import { Theme } from '@/store/enums';

import colorPalette from '@/assets/theme.json';

type ColorPalette = typeof colorPalette;

function useTheme(theme: Theme) {
  const palette: ColorPalette = colorPalette;
  return {
    layout: palette[theme],
  };
}

export default useTheme;
