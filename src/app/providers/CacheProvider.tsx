import { type ReactNode, useEffect } from 'react';

// Массив картинок для предварительной загрузки
const imagesArray = [
  '/icons/bag.png',
  '/icons/star.png',
  '/icons/referrals.png',
  '/images/hook.png',
  '/images/towers.png',
  '/images/road.png',
  '/images/floors/blue.png',
  '/images/floors/green.png',
  '/images/floors/orange.png',
  '/images/floors/purple.png',
  '/images/floors/yellow.png',
  '/images/floors/eye.png',
  '/images/floors/star.png',
  '/images/floors/f.png',
  '/images/floors/frog.png',
  '/images/floors/cap.png',
  '/images/floors/first.png',
];

function preloadImages(imageArray: string[]): Promise<void> {
  const promises: Promise<void>[] = imageArray.map((src) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = src;

      if (img.complete) {
        resolve();
        return;
      }

      img.onload = () => {
        resolve();
      };
      img.onerror = () => {
        reject(new Error(`Ошибка загрузки изображения: ${src}`));
      };
    });
  });

  return Promise.all(promises).then(() => {});
}

export const CacheProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const loadImages = async () => {
      await preloadImages(imagesArray);
    };

    loadImages();
  }, []);

  return <>{children}</>;
};
