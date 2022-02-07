import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import config from './config';

const reducerRoot = combineReducers({
  config,
});

const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, reducerRoot);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
