import styles from './index.module.css';
import { useGame } from '@/shared/lib/useGame';
import { isMobile } from '@/shared/lib/useTelegram';
import { Floor } from '@/shared/ui/Floor/Floor';
import { useEffect, useRef, useState } from 'react';

export const Home = () => {
  const { floors, currentFloor, score, gameAreaRef, cameraOffset, buildFloor } = useGame();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(100);
  const [isProgressActive, setIsProgressActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    // Создаем аудио элемент с атрибутами для автовоспроизведения
    const audio = new Audio('/theme.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';

    // Пытаемся запустить автовоспроизведение
    const startAudio = async () => {
      try {
        await audio.play();
      } catch {
        // Добавляем обработчик для запуска при первом клике
        const handleFirstClick = async () => {
          try {
            await audio.play();
            document.removeEventListener('click', handleFirstClick);
            document.removeEventListener('touchstart', handleFirstClick);
          } catch (err) {
            console.log(err);
          }
        };

        document.addEventListener('click', handleFirstClick);
        document.addEventListener('touchstart', handleFirstClick);
      }
    };

    startAudio();
    audioRef.current = audio;

    // Очистка при размонтировании
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Анимация прогресс-бара
  useEffect(() => {
    if (!isProgressActive) return;

    let animationId: number;
    let cycleStartTime: number;

    const animateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - cycleStartTime;
      const duration = 10000; // 10 секунд

      if (elapsed >= duration) {
        // Цикл завершен, добавляем небольшую паузу
        setTimeout(() => {
          cycleStartTime = Date.now();
          setProgress(100);
          setTimeLeft(10);
        }, 200); // Пауза 200мс между циклами
      } else {
        // Обновляем прогресс и время
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        const remainingTime = Math.ceil((duration - elapsed) / 1000);

        setProgress(remaining);
        setTimeLeft(Math.max(0, remainingTime));
      }

      // Продолжаем анимацию
      animationId = requestAnimationFrame(animateProgress);
    };

    // Инициализируем первый цикл
    cycleStartTime = Date.now();
    setProgress(100);
    setTimeLeft(10);

    // Запускаем анимацию
    animationId = requestAnimationFrame(animateProgress);

    // Очистка при размонтировании
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isProgressActive]);

  // Функция для запуска прогресса
  const startProgress = () => {
    setProgress(100);
    setTimeLeft(10);
    setIsProgressActive(true);
  };

  // Автоматически запускаем прогресс при монтировании компонента
  useEffect(() => {
    const timer = setTimeout(() => {
      startProgress();
    }, 1000); // Запускаем через 1 секунду после загрузки

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.game__container}>
        <div className={styles.hook__container}>
          <img src={'/images/hook.png'} alt="hook" className={styles.hook__image} />
        </div>

        <div className={styles.bar} style={{ top: isMobile() ? 100 : 20 }}>
          <div className={styles.bar_referral}>
            <img src={'/icons/referrals.png'} alt="referral" className={styles.bar_referral__image} />
            <div className={styles.bar_referral__text}>Referral</div>
          </div>
          <div className={styles.bar_progress}>
            <div className={styles.progress_star}>
              <img src={'/icons/star.png'} alt="star" className={styles.progress_star__image} />
              <div className={styles.progress_bonus}>+3</div>
            </div>
            <div className={styles.progress_container}>
              <div className={styles.progress_fill} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.progress_time}>{timeLeft} сек</div>
          </div>
          <div className={styles.bar_info}>
            <div className={styles.bar_stars}>
              <div className={styles.bar_stars__text}>{score}</div>
              <img src={'/icons/star.png'} alt="stars" className={styles.bar_stars__image} />
            </div>
            <div className={styles.bar_bag}>
              <img src={'/icons/bag.png'} alt="stars" className={styles.bar_bag__image} />
              <div className={styles.bar_bag__text}>Инвентарь</div>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.gameArea} ref={gameAreaRef}>
            {/* Отображаем размещенные этажи с учетом смещения камеры */}
            {floors.map((floor) => (
              <Floor
                key={floor.id}
                type={floor.type}
                x={floor.x}
                y={floor.y + cameraOffset} // Применяем смещение камеры
                isFalling={floor.isFalling}
                isPlaced={floor.isPlaced}
              />
            ))}

            {/* Отображаем текущий падающий этаж с учетом смещения камеры */}
            {currentFloor && (
              <Floor
                key={currentFloor.id}
                type={currentFloor.type}
                x={currentFloor.x}
                y={currentFloor.y} // Применяем смещение камеры
                isFalling={currentFloor.isFalling}
                isPlaced={currentFloor.isPlaced}
              />
            )}
          </div>

          <div className={styles.bottom__container}>
            <div className={styles.bottom__button}>
              <button
                onClick={buildFloor}
                disabled={!currentFloor}
                className={!currentFloor ? styles.disabled : ''}
              >
                {!currentFloor ? 'Ждем...' : 'Строить'}
              </button>
            </div>
          </div>

          <div className={styles.bg__container} style={{ transform: `translateY(${cameraOffset}px)` }}>
            <img src={'/images/towers.png'} alt="towers" className={styles.towers__image} />
            <img src={'/images/road.png'} alt="road" className={styles.road__image} />
            <div className={styles.bg__bottom} />
          </div>
        </div>
      </div>
    </div>
  );
};
