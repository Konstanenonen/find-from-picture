import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
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
  const [newBestName, setNewBestName] = useState('');

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

  async function updateBestTime(e: any) {
    e.preventDefault();

    await setDoc(doc(firestore, 'high-score', 'bestTime'), {
      name: newBestName,
      time: userTime,
    });
  }

  const newBestTime = userTime < bestTime?.time && gameOver;

  return (
    <div>
      <p>High score</p>
      <p>{bestTime ? `${bestTime.name}: ${bestTime.time}` : 'LOADING...'}</p>
      {newBestTime && (
        <form onSubmit={updateBestTime}>
          <h3>You beat the old best time!</h3>
          <label htmlFor="time">
            New best time:
            <input value={userTime} id="time" type="number" />
          </label>
          <label htmlFor="name">
            Name:
            <input
              value={newBestName}
              onChange={(e: any) => setNewBestName(e.target.value)}
              id="name"
              type="text"
            />
          </label>
          <button type="submit">SAVE</button>
        </form>
      )}
    </div>
  );
}

export default HighScore;
