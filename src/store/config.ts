import { ActionConfig, Theme } from './enums';

const initState: Store.ConfigState = {
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT,
  firstTime: true,
};

function reducer(state: Store.ConfigState = initState, action: Store.Action<ActionConfig>) {
  switch (action.type) {
    case ActionConfig.SET_THEME:
      return {
        ...state,
        ...action.payload,
      };
    case ActionConfig.SET_FIRST_TIME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
