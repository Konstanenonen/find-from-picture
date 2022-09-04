import React from 'react';
import styles from './StartMenu.module.scss';
import Navbar from '../Navbar/Navbar';
import Button from '../Button/Button';

interface StartMenuProps {
  start: () => void;
  firstCharacter: string;
  secondCharacter: string;
  thirdCharacter: string;
}

function StartMenu({
  start,
  firstCharacter,
  secondCharacter,
  thirdCharacter,
}: StartMenuProps) {
  return (
    <div className={styles.container}>
      <Navbar>
        <h1 className={styles.title}>Find From Picture</h1>
        <p className={styles.subtitle}>
          Find these characters as fast as possible from the picture
        </p>
      </Navbar>
      <div className={styles.characters}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={firstCharacter}
            alt="Happy Waldo"
          />
          <p className={styles.characterText}>Waldo</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={secondCharacter}
            alt="Happy Odlaw"
          />
          <p className={styles.characterText}>Odlaw</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={thirdCharacter}
            alt="Happy Wizard"
          />
          <p className={styles.characterText}>Wizard</p>
        </div>
      </div>
      <Button
        text="START"
        handleClick={start}
        isSubmit={false}
        fontSize={1.5}
      />
    </div>
  );
}

export default StartMenu;
