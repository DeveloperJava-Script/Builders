import type { FC, JSX } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '../store';
import { CacheProvider } from './CacheProvider';
interface IProviders {
  readonly children: JSX.Element;
}

export const Providers: FC<IProviders> = ({ children }) => {
  return (
    <Provider store={store}>
      <CacheProvider>
        <PersistGate loading={true} persistor={persistor}>
          {children}
        </PersistGate>
      </CacheProvider>
    </Provider>
  );
};
