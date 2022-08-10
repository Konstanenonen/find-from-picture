/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, Firestore, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import waldo from '../../images/waldo.jpg';
import CorrectLocation from '../CorrectLocation/CorrectLocation';
import TargetingMenu from '../TargetingMenu/TargetingMenu';
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
  ozwald: Coordinates;
  wizard: Coordinates;
}

function Canvas({ firestore }: CanvasProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
  const [waldoLocation, setWaldoLocation] = useState(false);
  const [wizardLocation, setWizardLocation] = useState(false);
  const [odlawLocation, setOdlawLocation] = useState(false);
  const [correctLocations, setCorrectLocations] =
    useState<CorrectLocations | null>(null);

  function handleClick(e: any) {
    console.log(e.pageX, e.pageY);
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

  return (
    <div onClick={handleClick} className={styles.container}>
      <img src={waldo} alt="Where is waldo" className={styles.img} />
      {menuOpen && (
        <TargetingMenu
          handleWaldo={() => setWaldoLocation((c) => !c)}
          handleOdlaw={() => setOdlawLocation((o) => !o)}
          handleWizard={() => setWizardLocation((w) => !w)}
          top={menuY}
          left={menuX}
        />
      )}
      {waldoLocation && <CorrectLocation top="37%" left="51%" />}
      {wizardLocation && <CorrectLocation top="37%" left="64%" />}
      {odlawLocation && <CorrectLocation top="38%" left="14%" />}
      <p>{correctLocations?.waldo.x}</p>
    </div>
  );
}

export default Canvas;
