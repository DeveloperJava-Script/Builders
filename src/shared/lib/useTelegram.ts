export const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  if (!tg) {
    console.warn('Telegram WebApp не найден');
    // Возвращаем заглушку для безопасной работы
    return {
      expand: () => {},
      disableVerticalSwipes: () => {},
      setBackgroundColor: () => {},
      setHeaderColor: () => {},
    };
  }

  return tg;
};
