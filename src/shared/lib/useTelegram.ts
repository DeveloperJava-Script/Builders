export const useTelegram = () => {
  const tg = window.Telegram?.WebApp;
  // Инициализируем TMA
  tg.ready();

  // Расширяем на весь экран
  tg.expand();

  return tg;
};
