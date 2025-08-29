import { useEffect } from 'react';

import { useTelegram } from '../shared/lib/useTelegram';
import { Layout } from '../shared/ui/Layout/Layout.tsx';

function App() {
  const telegram = useTelegram();

  useEffect(() => {
    telegram.expand();
    telegram.disableVerticalSwipes();
  }, []);

  return <Layout />;
}

export default App;
