import { doc, Firestore, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

interface BestTime {
  name: string;
  time: number;
}

interface HighScoreProps {
  firestore: Firestore;
  gameOver: boolean;
  userTime: number;
}

function HighScore({ firestore, gameOver, userTime }: HighScoreProps) {
  const [bestTime, setBestTime] = useState<any>(null);

  useEffect(() => {
    async function getCorrectLocations() {
      const docRef = doc(firestore, 'high-score', 'bestTime');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const firestoreBestTime = docSnap.data() as BestTime;
        setBestTime(firestoreBestTime);
      }
    }
    getCorrectLocations();
  }, []);

  const newBestTime = userTime < bestTime?.time && gameOver;

  return (
    <div>
      <p>High score</p>
      <p>{bestTime ? `${bestTime.name}: ${bestTime.time}` : 'LOADING...'}</p>
      {newBestTime && (
        <form>
          <h3>New fastest time!</h3>
          <label htmlFor="name">
            Name:
            <input id="name" type="text" />
          </label>
          <label htmlFor="time">
            Time:
            <input id="time" type="number" />
          </label>
        </form>
      )}
    </div>
  );
}

export default HighScore;
