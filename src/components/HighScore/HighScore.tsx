import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styles from './HighScore.module.scss';

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

    window.location.reload();
  }

  const newBestTime = userTime < bestTime?.time;

  return (
    <div>
      <p>High score</p>
      <p>{bestTime ? `${bestTime.name}: ${bestTime.time}` : 'LOADING...'}</p>
      {gameOver &&
        (newBestTime ? (
          <form onSubmit={updateBestTime} className={styles.container}>
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
        ) : (
          <div>
            <p>No new best time this time!</p>
            <button type="button" onClick={() => window.location.reload()}>
              PLAY AGAIN
            </button>
          </div>
        ))}
    </div>
  );
}

export default HighScore;
