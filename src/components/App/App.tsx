import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import Canvas from '../Canvas/Canvas';
import styles from './App.module.scss';
import StartMenu from '../StartMenu/StartMenu';
import Footer from '../Footer/Footer';

//  Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBguB1cnwI-okJrHcYqGZnypeV7eLqBeuw',
  authDomain: 'find-from-picture.firebaseapp.com',
  projectId: 'find-from-picture',
  storageBucket: 'find-from-picture.appspot.com',
  messagingSenderId: '613746067832',
  appId: '1:613746067832:web:ace715b8496fa02d54e08d',
};

// Initializing Firebase
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
  const [firstCharacter, setFirstCharacter] = useState('');
  const [secondCharacter, setSecondCharacter] = useState('');
  const [thirdCharacter, setThirdCharacter] = useState('');
  const [canvasUrl, setCanvasUrl] = useState('');
  const [gameTheme, setGameTheme] = useState('waldo');

  // Fetching images from the firebase
  useEffect(() => {
    getDownloadURL(ref(storage, `${gameTheme}/character1.jpg`))
      .then((url) => {
        setFirstCharacter(url);
      })
      .catch((error) => {
        console.log(error);
      });
    getDownloadURL(ref(storage, `${gameTheme}/character2.jpg`))
      .then((url) => {
        setSecondCharacter(url);
      })
      .catch((error) => {
        console.log(error);
      });
    getDownloadURL(ref(storage, `${gameTheme}/character3.jpg`))
      .then((url) => {
        setThirdCharacter(url);
      })
      .catch((error) => {
        console.log(error);
      });
    getDownloadURL(ref(storage, `${gameTheme}/canvas.jpg`))
      .then((url) => {
        setCanvasUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gameTheme]);

  useEffect(() => {
    async function getBestTime() {
      const docRef = doc(firestore, 'high-score', gameTheme);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const firestoreBestTime = docSnap.data() as BestTime;
        setBestTime(firestoreBestTime);
      }
    }
    getBestTime();
  }, [start]);

  return (
    <div className={styles.container}>
      {!start && (
        <div>
          <StartMenu
            setGameTheme={setGameTheme}
            firstCharacter={firstCharacter}
            secondCharacter={secondCharacter}
            thirdCharacter={thirdCharacter}
            firstName={gameTheme === 'waldo' ? 'Waldo' : 'Marshtomp'}
            secondName={gameTheme === 'waldo' ? 'Odlaw' : 'Charizard'}
            thirdName={gameTheme === 'waldo' ? 'Wizard' : 'Bulbasaur'}
            start={() => setStart(true)}
          />
        </div>
      )}
      {start && (
        <Canvas
          firestore={firestore}
          bestTime={bestTime}
          playAgain={() => setStart(false)}
          canvasUrl={canvasUrl}
          gameTheme={gameTheme}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
