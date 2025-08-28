import { useSelector } from 'react-redux';
import createFilter from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import { type TypedUseSelectorHook, useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../entities/userSlice';
import type { TUserSliceState } from '../entities/userSlice/types';

const rootRecucer = combineReducers({
  user: userSlice,
});

const userSubsetFilter = createFilter('user', ['data', 'currency']);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms: [userSubsetFilter],
};

const store = configureStore({
  // @ts-expect-error persistReducer is not typed
  reducer: persistReducer(persistConfig, rootRecucer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;

export interface RootState {
  user: TUserSliceState;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
