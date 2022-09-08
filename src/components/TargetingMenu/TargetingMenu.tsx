/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '../Button/Button';
import styles from './TargetingMenu.module.scss';

interface Coordinates {
  x: number;
  y: number;
}

interface CorrectLocations {
  firstCharacter: Coordinates;
  secondCharacter: Coordinates;
  thirdCharacter: Coordinates;
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
        <Button
          text="Waldo"
          isSubmit={false}
          handleClick={() =>
            checkIfCorrectLocation(
              correctLocations.firstCharacter,
              { x: menuX, y: menuY },
              setWaldoTrue
            )
          }
        />
        <Button
          text="Odlaw"
          isSubmit={false}
          handleClick={() =>
            checkIfCorrectLocation(
              correctLocations.secondCharacter,
              { x: menuX, y: menuY },
              setOdlawTrue
            )
          }
        />
        <Button
          text="Wizard"
          isSubmit={false}
          handleClick={() =>
            checkIfCorrectLocation(
              correctLocations.thirdCharacter,
              { x: menuX, y: menuY },
              setWizardTrue
            )
          }
        />
      </div>
    </div>
  );
}

export default TargetingMenu;
