import styles from './index.module.css';
import { useGame } from '@/shared/lib/useGame';
import { Floor } from '@/shared/ui/Floor/Floor';

export const Home = () => {
  const { floors, currentFloor, isGameStarted, score, gameAreaRef, cameraOffset, startGame, buildFloor } =
    useGame();

  return (
    <div className={styles.wrapper}>
      <div className={styles.hook__container}>
        <img src={'/images/hook.png'} alt="hook" className={styles.hook__image} />
      </div>

      {/* Игровая информация */}
      {isGameStarted && (
        <div className={styles.gameInfo}>
          <div className={styles.score}>Счет: {score + 2}</div>
        </div>
      )}

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
            {!isGameStarted ? (
              <button onClick={startGame}>Начать игру</button>
            ) : (
              <button
                onClick={buildFloor}
                disabled={!currentFloor}
                className={!currentFloor ? styles.disabled : ''}
              >
                {!currentFloor ? 'Ждем...' : 'Строить'}
              </button>
            )}
          </div>
        </div>

        <div className={styles.bg__container} style={{ transform: `translateY(${cameraOffset}px)` }}>
          <img src={'/images/towers.png'} alt="towers" className={styles.towers__image} />
          <img src={'/images/road.png'} alt="road" className={styles.road__image} />
          <div className={styles.bg__bottom} />
        </div>
      </div>
    </div>
  );
};
