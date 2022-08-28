import { Firestore, setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import styles from './EndPopup.module.scss';

interface BestTime {
  name: string;
  time: number;
}

interface EndPopupProps {
  userTime: number;
  bestTime: BestTime;
  firestore: Firestore;
  playAgain: () => void;
}

function EndPopup({ userTime, bestTime, firestore, playAgain }: EndPopupProps) {
  const [newBestName, setNewBestName] = useState('');

  async function updateBestTime(e: any) {
    e.preventDefault();

    await setDoc(doc(firestore, 'high-score', 'bestTime'), {
      name: newBestName,
      time: userTime,
    });

    playAgain();
  }

  const newBestTime = userTime < bestTime?.time;

  return (
    <div>
      {newBestTime ? (
        <form onSubmit={updateBestTime} className={styles.container}>
          <h3>New fastest time!</h3>
          <p>New fastest time: {userTime}</p>
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
        <div className={styles.container}>
          <p>Best time: {bestTime.time}</p>
          <p>Your time: {userTime}</p>
          <button type="button" onClick={() => playAgain()}>
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}

export default EndPopup;
