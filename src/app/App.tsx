import { useEffect } from 'react';

import { useTelegram } from '../shared/lib/useTelegram';
import { Layout } from '../shared/ui/Layout/Layout.tsx';

function App() {
  const telegram = useTelegram();

  useEffect(() => {
    telegram.expand();
    telegram.disableVerticalSwipes();
    telegram.setBackgroundColor('#000');
    telegram.setHeaderColor('#000');
  }, []);

  return <Layout />;
}

export default App;
