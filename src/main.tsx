import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Providers } from './app/providers/providers.tsx';
import { AppRouter } from './app/routers/AppRouter.tsx';

import '@/app/styles/App.css';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <RouterProvider router={AppRouter} />
  </Providers>
);
