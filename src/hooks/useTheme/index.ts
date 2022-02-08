import { Theme } from '@/store/enums';

import colorPalette from '@/assets/theme.json';
import { useCallback, useEffect, useState } from 'react';

type ColorPalette = typeof colorPalette;

function useTheme(theme: Theme) {
  const [palette] = useState<ColorPalette>(colorPalette);
  // eslint-disable-next-line max-len
  const [mode, setMode] = useState<Theme.DARK | Theme.LIGHT>(theme !== Theme.AUTO ? theme : Theme.DARK);

  const handleChangeTheme = useCallback(() => {
    setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT);
  }, []);

  useEffect(() => {
    if (theme === Theme.AUTO) {
      handleChangeTheme();
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChangeTheme);
    } else {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChangeTheme);
      setMode(theme);
    }

    document
      .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute('content', palette[mode].backgroud);
    document
      .querySelector('meta[name="theme-color"]').setAttribute('content', palette[mode].backgroud);
  }, [mode, palette, handleChangeTheme, theme]);

  return {
    themeMode: mode,
    layout: palette[mode],
  };
}

export default useTheme;
