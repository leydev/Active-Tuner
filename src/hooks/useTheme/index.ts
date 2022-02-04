import { Theme } from '@/types';

import layout from '@/assets/theme.json';

function useTheme(theme: Theme) {
  return {
    layout: layout[theme],
  };
}

export default useTheme;
