import { useEffect } from 'react';

import { isMobile, useTelegram } from '../shared/lib/useTelegram';

import { Layout } from '../shared/ui/Layout/Layout.tsx';

function App() {
  const telegram = useTelegram();

  useEffect(() => {
    telegram.ready();
    telegram.expand();

    // Определяем платформу устройства

    if (isMobile()) {
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
