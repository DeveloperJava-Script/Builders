import React from 'react';
import styles from './Floor.module.css';

interface FloorProps {
  type: string;
  x: number;
  y: number;
  isFalling: boolean;
  isPlaced: boolean;
}

export const Floor: React.FC<FloorProps> = ({ type, x, y, isFalling, isPlaced }) => {
  const getFloorImage = (floorType: string) => {
    return `/images/floors/${floorType}.png`;
  };

  return (
    <div className={styles.floor__container}>
      <div
        className={`${styles.floor} ${isFalling ? styles.falling : ''} ${isPlaced ? styles.placed : ''}`}
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
      >
        <img src={getFloorImage(type)} alt={`Floor ${type}`} className={styles.floorImage} />
        {isFalling && <div className={styles.shadow} />}
      </div>
    </div>
  );
};
