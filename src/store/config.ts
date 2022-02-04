import { Store, Theme, ActionConfig } from '@/types.d';

const initState: Store.ConfigState = {
  theme: Theme.LIGHT,
};

function reducer(state: Store.ConfigState = initState, action: Store.Action<ActionConfig>) {
  switch (action.type) {
    case ActionConfig.SET_THEME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
