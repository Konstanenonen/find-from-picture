import React, { useEffect, useState } from 'react';

interface TimerProps {
  gameOver: boolean;
}

function Timer({ gameOver }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameOver) return;
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameOver]);

  return <div>{seconds}</div>;
}

export default Timer;
