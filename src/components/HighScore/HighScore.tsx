import { doc, Firestore, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

interface BestTime {
  name: string;
  time: number;
}

interface HighScoreProps {
  firestore: Firestore;
}

function HighScore({ firestore }: HighScoreProps) {
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
  return (
    <div>
      <p>High score</p>
      <p>{bestTime ? `${bestTime.name}: ${bestTime.time}` : 'LOADING...'}</p>
    </div>
  );
}

export default HighScore;
