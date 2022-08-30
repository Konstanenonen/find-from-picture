import { Firestore, setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import Button from '../Button/Button';
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
          <h3>You made a new record!</h3>
          <p>New best time: {userTime} s</p>
          <label htmlFor="name" className={styles.label}>
            Name:
            <input
              value={newBestName}
              onChange={(e: any) => setNewBestName(e.target.value)}
              id="name"
              type="text"
            />
          </label>
          <Button text="SAVE" isSubmit fontSize={1.1} />
        </form>
      ) : (
        <div className={styles.container}>
          <p>Best time: {bestTime.time} s</p>
          <p>Your time: {userTime} s</p>
          <Button
            text="PLAY AGAIN"
            isSubmit={false}
            fontSize={1.1}
            handleClick={() => playAgain()}
          />
        </div>
      )}
    </div>
  );
}

export default EndPopup;
