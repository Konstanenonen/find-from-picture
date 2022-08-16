import React, { useEffect, useState } from 'react';

interface TimerProps {
  gameOver: boolean;
}

function Timer({ gameOver }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (gameOver) return;
    const intervalId = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(intervalId);
    };
  }, [gameOver]);

  return <div>{seconds}</div>;
}

export default Timer;
