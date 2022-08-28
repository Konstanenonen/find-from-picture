import React from 'react';
// import styles from './HighScore.module.scss';

interface BestTime {
  name: string;
  time: number;
}

interface HighScoreProps {
  bestTime: BestTime;
}

function HighScore({ bestTime }: HighScoreProps) {
  return (
    <div>
      <p>High score</p>
      <p>
        {bestTime.name}: {bestTime.time}
      </p>
    </div>
  );
}

export default HighScore;
