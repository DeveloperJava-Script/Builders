export const useTelegram = () => {
  const tg = window.Telegram?.WebApp;
  return tg;
};

export const isMobile = () => {
  const tg = window.Telegram.WebApp;
  return tg.platform === 'ios' || tg.platform === 'android';
};
