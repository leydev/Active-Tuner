/* eslint-disable import/prefer-default-export */
import { Theme, ActionConfig } from '@/store/enums';

export function setTheme(theme: Theme): Store.Action<ActionConfig.SET_THEME, Record<'theme', Theme>> {
  return {
    type: ActionConfig.SET_THEME,
    payload: {
      theme,
    },
  };
}

export function setFirstTime(firstTime: boolean): Store.Action<ActionConfig.SET_THEME, Record<'firstTime', boolean>> {
  return {
    type: ActionConfig.SET_THEME,
    payload: {
      firstTime,
    },
  };
}
