/* eslint-disable import/prefer-default-export */
import { Theme, Store, ActionConfig } from '@/types.d';

export function setTheme(theme: Theme): Store.Action<ActionConfig.SET_THEME, Record<'theme', Theme>> {
  return {
    type: ActionConfig.SET_THEME,
    payload: {
      theme,
    },
  };
}
