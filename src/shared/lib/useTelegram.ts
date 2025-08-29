export const useTelegram = () => {
  const tg = window.Telegram?.WebApp;

  if (!tg) {
    console.warn('Telegram WebApp не найден');
    // Возвращаем заглушку для безопасной работы
    return {
      ready: () => {},
      expand: () => {},
      disableVerticalSwipes: () => {},
      backgroundColor: '#001d4a',
      headerColor: '#001d4a',
    };
  }

  // Инициализируем TMA
  tg.ready();

  // Расширяем на весь экран
  tg.expand();

  return tg;
};
