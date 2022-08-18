import React, { useEffect } from 'react';
import styles from './Timer.module.scss';

interface TimerProps {
  gameOver: boolean;
  userTime: number;
  setUserTime: () => void;
}

function Timer({ gameOver, userTime, setUserTime }: TimerProps) {
  useEffect(() => {
    if (gameOver) return;
    const intervalId = setInterval(() => {
      setUserTime();
    }, 1000);
    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(intervalId);
    };
  }, [gameOver]);

  return <p className={styles.text}>Seconds passed: {userTime}</p>;
}

export default Timer;
