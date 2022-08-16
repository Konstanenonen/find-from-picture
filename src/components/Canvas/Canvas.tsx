/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, Firestore, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import waldo from '../../images/waldo.jpg';
import CorrectLocation from '../CorrectLocation/CorrectLocation';
import TargetingMenu from '../TargetingMenu/TargetingMenu';
import Timer from '../Timer/Timer';
import styles from './Canvas.module.scss';

interface CanvasProps {
  firestore: Firestore;
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

function Canvas({ firestore }: CanvasProps) {
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

  const gameOver = waldoLocation && wizardLocation && odlawLocation;
  console.log(gameOver);

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
        const locationData = docSnap.data() as CorrectLocations;
        setCorrectLocations(locationData);
      }
    }
    getCorrectLocations();
  }, []);

  function checkIfCorrectLocation(
    correctLocation: Coordinates,
    clickLocation: Coordinates,
    handleCorrect: () => void
  ) {
    const differenceX = correctLocation.x - clickLocation.x;
    const differenceY = correctLocation.y - clickLocation.y;

    if (differenceX > 50 || differenceX < -50) return;
    if (differenceY > 50 || differenceY < -50) return;

    handleCorrect();
  }

  return (
    <div onClick={handleClick} className={styles.container}>
      <img src={waldo} alt="Where is waldo" className={styles.img} />
      {menuOpen && (
        <TargetingMenu
          handleWaldo={() =>
            checkIfCorrectLocation(
              correctLocations.waldo,
              { x: menuX, y: menuY },
              () => setWaldoLocation(true)
            )
          }
          handleOdlaw={() =>
            checkIfCorrectLocation(
              correctLocations.odlaw,
              { x: menuX, y: menuY },
              () => setOdlawLocation(true)
            )
          }
          handleWizard={() =>
            checkIfCorrectLocation(
              correctLocations.wizard,
              { x: menuX, y: menuY },
              () => setWizardLocation(true)
            )
          }
          top={menuY}
          left={menuX}
        />
      )}
      {waldoLocation && (
        <CorrectLocation
          top={correctLocations.waldo.y}
          left={correctLocations.waldo.x}
        />
      )}
      {wizardLocation && (
        <CorrectLocation
          top={correctLocations.wizard.y}
          left={correctLocations.wizard.x}
        />
      )}
      {odlawLocation && (
        <CorrectLocation
          top={correctLocations.odlaw.y}
          left={correctLocations.odlaw.x}
        />
      )}
      <Timer gameOver={gameOver} />
    </div>
  );
}

export default Canvas;
