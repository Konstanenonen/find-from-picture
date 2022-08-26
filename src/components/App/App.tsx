import React, { ReactNode, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Canvas from '../Canvas/Canvas';
import styles from './App.module.scss';
import StartMenu from '../StartMenu/StartMenu';

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

interface BestTime {
  name: string;
  time: number;
}

function App() {
  const [start, setStart] = useState(false);
  const [bestTime, setBestTime] = useState<BestTime>({ name: '', time: 0 });

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

  let appState: ReactNode = (
    <Canvas firestore={firestore} bestTime={bestTime} />
  );

  if (!start) {
    appState = <StartMenu start={() => setStart(true)} />;
  }

  return <div className={styles.container}>{appState}</div>;
}

export default App;
