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
  setFirstVisibility: () => void;
  setSecondsVisibility: () => void;
  setThirdVisibility: () => void;
  menuX: number;
  menuY: number;
  setWrongLocationSelected: (bool: boolean) => void;
  gameTheme: string;
}

function TargetingMenu({
  top,
  left,
  correctLocations,
  setFirstVisibility,
  setSecondsVisibility,
  setThirdVisibility,
  menuX,
  menuY,
  setWrongLocationSelected,
  gameTheme,
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

  const classicMode = gameTheme === 'waldo';

  return (
    <div className={styles.container} style={{ top, left }}>
      <div className={styles.box} />
      <div className={styles.buttons}>
        <Button
          text={classicMode ? 'Waldo' : 'Marshtomp'}
          isSubmit={false}
          handleClick={() =>
            checkIfCorrectLocation(
              correctLocations.firstCharacter,
              { x: menuX, y: menuY },
              setFirstVisibility
            )
          }
        />
        <Button
          text={classicMode ? 'Odlaw' : 'Charizard'}
          isSubmit={false}
          handleClick={() =>
            checkIfCorrectLocation(
              correctLocations.secondCharacter,
              { x: menuX, y: menuY },
              setSecondsVisibility
            )
          }
        />
        <Button
          text={classicMode ? 'Wizard' : 'Bulbasaur'}
          isSubmit={false}
          handleClick={() =>
            checkIfCorrectLocation(
              correctLocations.thirdCharacter,
              { x: menuX, y: menuY },
              setThirdVisibility
            )
          }
        />
      </div>
    </div>
  );
}

export default TargetingMenu;
