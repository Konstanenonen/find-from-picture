/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, Firestore, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import CorrectLocationGroup from '../CorrectLocationGroup/CorrectLocationGroup';
import EndPopup from '../EndPopup/EndPopup';
import HighScore from '../HighScore/HighScore';
import Navbar from '../Navbar/Navbar';
import TargetingMenu from '../TargetingMenu/TargetingMenu';
import Timer from '../Timer/Timer';
import WrongSelectionPopup from '../WrongSelectionPopup/WrongSelectionPopup';
import styles from './Canvas.module.scss';

interface BestTime {
  name: string;
  time: number;
}

interface CanvasProps {
  firestore: Firestore;
  bestTime: BestTime;
  playAgain: () => void;
  canvasUrl: string;
}

interface Coordinates {
  x: number;
  y: number;
}

interface CorrectLocations {
  waldo: Coordinates;
  odlaw: Coordinates;
  wizard: Coordinates;
}

function Canvas({ firestore, bestTime, playAgain, canvasUrl }: CanvasProps) {
  const imageEl = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
  const [waldoLocation, setWaldoLocation] = useState(false);
  const [wizardLocation, setWizardLocation] = useState(false);
  const [odlawLocation, setOdlawLocation] = useState(false);
  const [correctLocations, setCorrectLocations] = useState<CorrectLocations>({
    waldo: { x: 0, y: 0 },
    odlaw: { x: 0, y: 0 },
    wizard: { x: 0, y: 0 },
  });
  const [userTime, setUserTime] = useState(0);
  const [wrongLocationSelected, setWrongLocationSelected] = useState(false);
  const gameOver = waldoLocation && wizardLocation && odlawLocation;

  function handleClick(e: any) {
    const x = Number(e.pageX - 40);
    const y = Number(e.pageY - 40);
    setMenuY(y);
    setMenuX(x);
    setMenuOpen((m) => !m);
  }

  useEffect(() => {
    async function getCorrectLocations() {
      const docRef = doc(firestore, 'correct-locations', 'correctLocations');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const imageOffset = imageEl.current.getBoundingClientRect();
        const locationData = docSnap.data() as CorrectLocations;

        locationData.odlaw.x += imageOffset.x;
        locationData.odlaw.y += imageOffset.y;
        locationData.waldo.x += imageOffset.x;
        locationData.waldo.y += imageOffset.y;
        locationData.wizard.x += imageOffset.x;
        locationData.wizard.y += imageOffset.y;

        setCorrectLocations(locationData);
      }
    }
    getCorrectLocations();
  }, []);

  useEffect(() => {
    if (wrongLocationSelected) {
      setTimeout(() => {
        setWrongLocationSelected(false);
      }, 2000);
    }
  }, [wrongLocationSelected]);

  return (
    <>
      <Navbar>
        <h1 className={styles.text}>Find From Picture</h1>
        <div className={styles.navContent}>
          <HighScore bestTime={bestTime} />
          <Timer
            gameOver={gameOver}
            userTime={userTime}
            setUserTime={() => setUserTime((s) => s + 1)}
          />
        </div>
      </Navbar>
      <div onClick={handleClick} className={styles.container}>
        <img
          ref={imageEl}
          src={canvasUrl}
          alt="Where is waldo"
          className={styles.img}
        />
        {menuOpen && (
          <TargetingMenu
            top={menuY}
            left={menuX}
            correctLocations={correctLocations}
            setWaldoTrue={() => setWaldoLocation(true)}
            setOdlawTrue={() => setOdlawLocation(true)}
            setWizardTrue={() => setWizardLocation(true)}
            menuX={menuX}
            menuY={menuY}
            setWrongLocationSelected={setWrongLocationSelected}
          />
        )}
        <CorrectLocationGroup
          waldoLocation={waldoLocation}
          wizardLocation={wizardLocation}
          odlawLocation={odlawLocation}
          correctLocations={correctLocations}
        />
      </div>
      {wrongLocationSelected && <WrongSelectionPopup />}
      {gameOver && (
        <EndPopup
          userTime={userTime}
          bestTime={bestTime}
          firestore={firestore}
          playAgain={playAgain}
        />
      )}
    </>
  );
}

export default Canvas;
