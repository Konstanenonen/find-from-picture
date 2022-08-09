import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Canvas from '../Canvas/Canvas';
import styles from './App.module.scss';

const app = initializeApp({
  // FILL THIS
});

// eslint-disable-next-line no-unused-vars
const db = getFirestore(app);

function App() {
  return (
    <div className={styles.container}>
      <Canvas />
    </div>
  );
}

export default App;
