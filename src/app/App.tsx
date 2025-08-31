import { useEffect } from 'react';

import { useTelegram } from '../shared/lib/useTelegram';

import { Layout } from '../shared/ui/Layout/Layout.tsx';

function App() {
  const telegram = useTelegram();

  useEffect(() => {
    telegram.ready();
    telegram.expand();

    // Определяем платформу устройства
    const platform = telegram.platform;

    if (platform === 'android' || platform === 'ios') {
      telegram.requestFullscreen();
    }

    telegram.disableVerticalSwipes();
    // telegram.setBackgroundColor("#000");
    // telegram.setHeaderColor("#000");
    telegram.enableClosingConfirmation();
    telegram.BackButton.hide();
    telegram.MainButton.hide();
  }, []);

  return <Layout />;
}

export default App;
