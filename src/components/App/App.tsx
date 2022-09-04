import React, { ReactNode, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import Canvas from '../Canvas/Canvas';
import styles from './App.module.scss';
import StartMenu from '../StartMenu/StartMenu';
import Footer from '../Footer/Footer';

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
const storage = getStorage(firebaseApp);

interface BestTime {
  name: string;
  time: number;
}

function App() {
  const [start, setStart] = useState(false);
  const [bestTime, setBestTime] = useState<BestTime>({ name: '', time: 0 });
  const [waldo, setWaldo] = useState('');
  const [odlaw, setOdlaw] = useState('');
  const [wizard, setWizard] = useState('');
  const [canvasUrl, setCanvasUrl] = useState('');

  useEffect(() => {
    getDownloadURL(ref(storage, 'waldo/waldo-character.png'))
      .then((url) => {
        // Or inserted into an <img> element
        setWaldo(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
    getDownloadURL(ref(storage, 'waldo/odlaw.jpg'))
      .then((url) => {
        // Or inserted into an <img> element
        setOdlaw(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
    getDownloadURL(ref(storage, 'waldo/wizard.png'))
      .then((url) => {
        // Or inserted into an <img> element
        setWizard(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
    getDownloadURL(ref(storage, 'waldo/waldo.jpg'))
      .then((url) => {
        // Or inserted into an <img> element
        setCanvasUrl(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  }, []);

  useEffect(() => {
    async function getBestTime() {
      const docRef = doc(firestore, 'high-score', 'bestTime');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const firestoreBestTime = docSnap.data() as BestTime;
        setBestTime(firestoreBestTime);
      }
    }
    getBestTime();
  }, [start]);

  let appState: ReactNode = (
    <Canvas
      firestore={firestore}
      bestTime={bestTime}
      playAgain={() => setStart(false)}
      canvasUrl={canvasUrl}
    />
  );

  if (!start) {
    appState = (
      <StartMenu
        firstCharacter={waldo}
        secondCharacter={odlaw}
        thirdCharacter={wizard}
        start={() => setStart(true)}
      />
    );
  }

  return (
    <div className={styles.container}>
      {appState}
      <Footer />
    </div>
  );
}

export default App;
