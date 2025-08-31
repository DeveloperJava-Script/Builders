import styles from './index.module.css';
import { useGame } from '@/shared/lib/useGame';
import { Floor } from '@/shared/ui/Floor/Floor';
import { useEffect, useRef } from 'react';

export const Home = () => {
  const { floors, currentFloor, score, gameAreaRef, cameraOffset, buildFloor } = useGame();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Создаем аудио элемент с атрибутами для автовоспроизведения
    const audio = new Audio('/src/shared/assets/theme.mp3');
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.game__container}>
        <div className={styles.hook__container}>
          <img src={'/images/hook.png'} alt="hook" className={styles.hook__image} />
        </div>

        <div className={styles.bar}>
          <div className={styles.bar_referral}>
            <img src={'/icons/referrals.png'} alt="referral" className={styles.bar_referral__image} />
            <div className={styles.bar_referral__text}>Referral</div>
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
