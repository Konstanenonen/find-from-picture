/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './TargetingMenu.module.scss';

interface Coordinates {
  x: number;
  y: number;
}

interface CorrectLocations {
  waldo: Coordinates;
  odlaw: Coordinates;
  wizard: Coordinates;
}

interface TargetingMenuProps {
  top: number;
  left: number;
  correctLocations: CorrectLocations;
  setWaldoTrue: () => void;
  setOdlawTrue: () => void;
  setWizardTrue: () => void;
  menuX: number;
  menuY: number;
  setWrongLocationSelected: (bool: boolean) => void;
}

function TargetingMenu({
  top,
  left,
  correctLocations,
  setWaldoTrue,
  setOdlawTrue,
  setWizardTrue,
  menuX,
  menuY,
  setWrongLocationSelected,
}: TargetingMenuProps) {
  function checkIfCorrectLocation(
    correctLocation: Coordinates,
    clickLocation: Coordinates,
    handleCorrect: () => void
  ) {
    const differenceX = correctLocation.x - clickLocation.x;
    const differenceY = correctLocation.y - clickLocation.y;

    if (
      differenceX > 50 ||
      differenceY > 50 ||
      differenceX < -50 ||
      differenceY < -50
    ) {
      setWrongLocationSelected(true);
      return;
    }

    handleCorrect();
    setWrongLocationSelected(false);
  }

  return (
    <div className={styles.container} style={{ top, left }}>
      <div className={styles.box} />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            checkIfCorrectLocation(
              correctLocations.waldo,
              { x: menuX, y: menuY },
              setWaldoTrue
            )
          }
        >
          Waldo
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            checkIfCorrectLocation(
              correctLocations.odlaw,
              { x: menuX, y: menuY },
              setOdlawTrue
            )
          }
        >
          Odlaw
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            checkIfCorrectLocation(
              correctLocations.wizard,
              { x: menuX, y: menuY },
              setWizardTrue
            )
          }
        >
          Wizard
        </button>
      </div>
    </div>
  );
}

export default TargetingMenu;
