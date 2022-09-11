/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, Firestore, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import CorrectLocationGroup from '../CorrectLocationGroup/CorrectLocationGroup';
import EndPopup from '../EndPopup/EndPopup';
import HighScore from '../HighScore/HighScore';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
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
  gameTheme: string;
}

interface Coordinates {
  x: number;
  y: number;
}

interface CorrectLocations {
  firstCharacter: Coordinates;
  secondCharacter: Coordinates;
  thirdCharacter: Coordinates;
}

function Canvas({
  firestore,
  bestTime,
  playAgain,
  canvasUrl,
  gameTheme,
}: CanvasProps) {
  const imageEl = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
  const [firstVisibility, setFirstVisibility] = useState(false);
  const [secondVisibility, setSecondVisibility] = useState(false);
  const [thirdVisibility, setThirdVisibility] = useState(false);
  const [correctLocations, setCorrectLocations] = useState<CorrectLocations>({
    firstCharacter: { x: 0, y: 0 },
    secondCharacter: { x: 0, y: 0 },
    thirdCharacter: { x: 0, y: 0 },
  });
  const [userTime, setUserTime] = useState(0);
  const [wrongLocationSelected, setWrongLocationSelected] = useState(false);
  const gameOver = firstVisibility && secondVisibility && thirdVisibility;
  const loading = correctLocations.firstCharacter.x === 0;

  function handleClick(e: any) {
    const x = Number(e.pageX - 40);
    const y = Number(e.pageY - 40);
    setMenuY(y);
    setMenuX(x);
    setMenuOpen((m) => !m);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getCorrectLocations() {
      const docRef = doc(firestore, 'correct-locations', gameTheme);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const imageOffset = imageEl.current.getBoundingClientRect();
        const locationData = docSnap.data() as CorrectLocations;

        locationData.firstCharacter.x += imageOffset.x;
        locationData.firstCharacter.y += imageOffset.y;
        locationData.secondCharacter.x += imageOffset.x;
        locationData.secondCharacter.y += imageOffset.y;
        locationData.thirdCharacter.x += imageOffset.x;
        locationData.thirdCharacter.y += imageOffset.y;

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

  console.log(correctLocations);

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
        {loading && <LoadingSpinner />}
        {menuOpen && (
          <TargetingMenu
            top={menuY}
            left={menuX}
            correctLocations={correctLocations}
            setFirstVisibility={() => setFirstVisibility(true)}
            setSecondsVisibility={() => setSecondVisibility(true)}
            setThirdVisibility={() => setThirdVisibility(true)}
            menuX={menuX}
            menuY={menuY}
            setWrongLocationSelected={setWrongLocationSelected}
            gameTheme={gameTheme}
          />
        )}
        <CorrectLocationGroup
          waldoLocation={firstVisibility}
          odlawLocation={secondVisibility}
          wizardLocation={thirdVisibility}
          correctLocations={correctLocations}
        />
      </div>
      {wrongLocationSelected && <WrongSelectionPopup />}
      {gameOver && (
        <EndPopup
          userTime={userTime}
          gameTheme={gameTheme}
          bestTime={bestTime}
          firestore={firestore}
          playAgain={playAgain}
        />
      )}
    </>
  );
}

export default Canvas;
