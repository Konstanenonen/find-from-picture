import React from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import Canvas from '../Canvas/Canvas';
import styles from './App.module.scss';

initializeApp({
  // FILL THIS
});

function App() {
  return (
    <div className={styles.container}>
      <Canvas />
    </div>
  );
}

export default App;
