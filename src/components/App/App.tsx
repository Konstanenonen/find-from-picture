import React, { useEffect, useState } from 'react';
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
  const [firstCharacter, setFirstCharacter] = useState('');
  const [secondCharacter, setSecondCharacter] = useState('');
  const [thirdCharacter, setThirdCharacter] = useState('');
  const [canvasUrl, setCanvasUrl] = useState('');
  const [imageFolder, setImageFolder] = useState('waldo');

  useEffect(() => {
    getDownloadURL(ref(storage, `${imageFolder}/character1.jpg`))
      .then((url) => {
        // Or inserted into an <img> element
        setFirstCharacter(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
    getDownloadURL(ref(storage, `${imageFolder}/character2.jpg`))
      .then((url) => {
        // Or inserted into an <img> element
        setSecondCharacter(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
    getDownloadURL(ref(storage, `${imageFolder}/character3.jpg`))
      .then((url) => {
        // Or inserted into an <img> element
        setThirdCharacter(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
    getDownloadURL(ref(storage, `${imageFolder}/canvas.jpg`))
      .then((url) => {
        // Or inserted into an <img> element
        setCanvasUrl(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  }, [imageFolder]);

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

  return (
    <div className={styles.container}>
      {!start && (
        <div>
          <button type="button" onClick={() => setImageFolder('waldo')}>
            Play Classic
          </button>
          <button type="button" onClick={() => setImageFolder('pokemon')}>
            Play Pokemon
          </button>
          <StartMenu
            firstCharacter={firstCharacter}
            secondCharacter={secondCharacter}
            thirdCharacter={thirdCharacter}
            firstName={imageFolder === 'waldo' ? 'Waldo' : 'Marshtomp'}
            secondName={imageFolder === 'waldo' ? 'Odlaw' : 'Charizard'}
            thirdName={imageFolder === 'waldo' ? 'Wizard' : 'Bulbasaur'}
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
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
