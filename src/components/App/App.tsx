import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Canvas from '../Canvas/Canvas';
import styles from './App.module.scss';

firebase.initializeApp({
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
