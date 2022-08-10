import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Canvas from '../Canvas/Canvas';
import styles from './App.module.scss';

const firebaseConfig = {
  apiKey: 'AIzaSyBguB1cnwI-okJrHcYqGZnypeV7eLqBeuw',
  authDomain: 'find-from-picture.firebaseapp.com',
  projectId: 'find-from-picture',
  storageBucket: 'find-from-picture.appspot.com',
  messagingSenderId: '613746067832',
  appId: '1:613746067832:web:ace715b8496fa02d54e08d',
};

const firebaseApp = initializeApp(firebaseConfig);

const firestore = getFirestore(firebaseApp);

function App() {
  return (
    <div className={styles.container}>
      <Canvas firestore={firestore} />
    </div>
  );
}

export default App;
