import React from 'react';
import waldo from '../../images/waldo-character.png';
import odlaw from '../../images/odlaw.jpg';
import wizard from '../../images/wizard.png';
import styles from './StartMenu.module.scss';
import Navbar from '../Navbar/Navbar';

interface StartMenuProps {
  start: () => void;
}

function StartMenu({ start }: StartMenuProps) {
  return (
    <div className={styles.container}>
      <Navbar>
        <h1 className={styles.title}>Find From Picture</h1>
        <p>Find these characters as fast as possible from the picture</p>
      </Navbar>
      <div className={styles.characters}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={waldo} alt="Happy Waldo" />
          <p className={styles.characterText}>Waldo</p>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={odlaw} alt="Happy Odlaw" />
          <p className={styles.characterText}>Odlaw</p>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={wizard} alt="Happy Wizard" />
          <p className={styles.characterText}>Wizard</p>
        </div>
      </div>
      <button onClick={start} type="button">
        START
      </button>
    </div>
  );
}

export default StartMenu;
