import React from 'react';
import styles from './HighScore.module.scss';

interface BestTime {
  name: string;
  time: number;
}

interface HighScoreProps {
  bestTime: BestTime;
}

function HighScore({ bestTime }: HighScoreProps) {
  return (
    <div className={styles.container}>
      <p>
        Best time: {bestTime.name} {bestTime.time} s
      </p>
    </div>
  );
}

export default HighScore;
