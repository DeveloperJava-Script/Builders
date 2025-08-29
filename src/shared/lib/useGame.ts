import { useState, useCallback, useRef } from 'react';
import { FLOOR_HEIGHT } from '../constants/game';

export interface Floor {
  id: number;
  type: string;
  x: number;
  y: number;
  isFalling: boolean;
  isPlaced: boolean;
}

export const useGame = () => {
  const [floors, setFloors] = useState<Floor[]>([
    {
      id: 1,
      type: 'first',
      x: 0,
      y: window.innerHeight - FLOOR_HEIGHT - 160,
      isFalling: false,
      isPlaced: true,
    },
  ]);
  const [currentFloor, setCurrentFloor] = useState<Floor | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [cameraOffset, setCameraOffset] = useState(0); // Смещение камеры

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const fallAnimationRef = useRef<number>(0);

  const floorTypes = [
    'first',
    'blue',
    'green',
    'orange',
    'purple',
    'yellow',
    'eye',
    'star',
    'f',
    'frog',
    'cap',
  ];

  // Функция для плавного сдвига камеры вверх
  const moveCameraUp = useCallback(() => {
    const targetOffset = cameraOffset + FLOOR_HEIGHT;
    const startOffset = cameraOffset;
    const startTime = Date.now();
    const duration = 500; // 0.5 секунды на сдвиг камеры

    const animateCamera = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Плавная кривая (ease-out)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const newOffset = startOffset + (targetOffset - startOffset) * easeProgress;
      setCameraOffset(newOffset);

      if (progress < 1) {
        requestAnimationFrame(animateCamera);
      }
    };

    animateCamera();
  }, [cameraOffset]);

  const generateNewFloor = useCallback(() => {
    const randomType = floorTypes.filter((type) => type !== 'first')[
      Math.floor(Math.random() * (floorTypes.length - 1))
    ];
    const newFloor: Floor = {
      id: Date.now(),
      type: randomType,
      x: 0,
      y: 140, // Начинаем выше первого этажа, но в видимой области
      isFalling: false,
      isPlaced: false,
    };

    setCurrentFloor(newFloor);
  }, []);

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setScore(0);
    setCameraOffset(0); // Сбрасываем смещение камеры

    // Генерируем следующий этаж
    setTimeout(() => {
      generateNewFloor();
    }, 100);
  }, [generateNewFloor]);

  const placeFloor = useCallback(
    (floor: Floor, x: number, y: number) => {
      console.log('placeFloor вызван:', { floor, x, y });

      // Если у нас больше 1 этажей, сдвигаем камеру вверх ДО размещения этажа
      if (floors.length >= 1) {
        moveCameraUp();
      }

      const placedFloor: Floor = {
        ...floor,
        x: x,
        y: y,
        isFalling: false,
        isPlaced: true,
      };

      setFloors((prev) => [...prev, placedFloor]);
      setCurrentFloor(null);
      setScore((prev) => prev + 100);

      // Генерируем следующий этаж
      setTimeout(() => {
        generateNewFloor();
      }, 500);
    },
    [floors, generateNewFloor, moveCameraUp]
  );

  const animateFloorFall = useCallback(
    (floor: Floor) => {
      console.log('animateFloorFall вызван для этажа:', floor);

      // Находим последний размещенный этаж
      const lastPlacedFloor = floors.filter((f) => f.isPlaced).pop();
      const targetY = lastPlacedFloor
        ? lastPlacedFloor.y - FLOOR_HEIGHT
        : window.innerHeight - FLOOR_HEIGHT - 160;
      const centerX = 0; // Центр экрана

      console.log('Целевая позиция:', { centerX, targetY });

      let currentY = floor.y;
      const startTime = Date.now();
      const fallDuration = 2000; // 2 секунды на падение

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / fallDuration, 1);

        // Плавная кривая падения (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        // Учитываем текущее смещение камеры при анимации
        currentY = floor.y + (targetY + cameraOffset - floor.y) * easeProgress;

        // Добавляем легкое покачивание при падении
        const wobble = Math.sin(progress * Math.PI * 4) * 5 * (1 - progress);

        setCurrentFloor((prev) =>
          prev
            ? {
                ...prev,
                y: currentY,
                x: wobble,
              }
            : null
        );

        if (progress < 1) {
          fallAnimationRef.current = requestAnimationFrame(animate);
        } else {
          // Этаж приземлился
          console.log('Этаж приземлился');
          placeFloor(floor, centerX, targetY);
        }
      };

      animate();
    },
    [floors, placeFloor]
  );

  const buildFloor = useCallback(() => {
    if (!currentFloor) return;

    const newFloor = { ...currentFloor, isFalling: true };
    setCurrentFloor(newFloor);

    // Анимация падения
    animateFloorFall(newFloor);
  }, [currentFloor, animateFloorFall]);

  const resetGame = useCallback(() => {
    console.log('resetGame вызван');
    setFloors([
      {
        id: 1,
        type: 'first',
        x: 0,
        y: window.innerHeight - FLOOR_HEIGHT - 160,
        isFalling: false,
        isPlaced: true,
      },
    ]);
    setCurrentFloor(null);
    setIsGameStarted(false);
    setScore(0);
    setCameraOffset(0); // Сбрасываем смещение камеры

    if (fallAnimationRef.current) {
      cancelAnimationFrame(fallAnimationRef.current);
    }
  }, []);

  return {
    floors,
    currentFloor,
    isGameStarted,
    score,
    gameAreaRef,
    cameraOffset, // Экспортируем смещение камеры
    startGame,
    buildFloor,
    resetGame,
  };
};
