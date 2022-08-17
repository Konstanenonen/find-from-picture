/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, Firestore, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import waldo from '../../images/waldo.jpg';
import CorrectLocationGroup from '../CorrectLocationGroup/CorrectLocationGroup';
import Navbar from '../Navbar/Navbar';
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
    <>
      <Navbar>
        <h1 className={styles.text}>Find From Picture</h1>
        <Timer gameOver={gameOver} />
      </Navbar>
      <div onClick={handleClick} className={styles.container}>
        <img
          ref={imageEl}
          src={waldo}
          alt="Where is waldo"
          className={styles.img}
        />
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
        <CorrectLocationGroup
          waldoLocation={waldoLocation}
          wizardLocation={wizardLocation}
          odlawLocation={odlawLocation}
          correctLocations={correctLocations}
        />
      </div>
    </>
  );
}

export default Canvas;
