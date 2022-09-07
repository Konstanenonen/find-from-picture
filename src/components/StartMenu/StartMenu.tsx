import React, { useEffect } from 'react';
import styles from './StartMenu.module.scss';
import Navbar from '../Navbar/Navbar';
import Button from '../Button/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface StartMenuProps {
  start: () => void;
  firstCharacter: string;
  secondCharacter: string;
  thirdCharacter: string;
  firstName: string;
  secondName: string;
  thirdName: string;
}

function StartMenu({
  start,
  firstCharacter,
  secondCharacter,
  thirdCharacter,
  firstName,
  secondName,
  thirdName,
}: StartMenuProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          {firstCharacter ? (
            <img
              className={styles.image}
              src={firstCharacter}
              alt="Happy Waldo"
            />
          ) : (
            <LoadingSpinner />
          )}
          <p className={styles.characterText}>{firstName}</p>
        </div>
        <div className={styles.imageContainer}>
          {secondCharacter ? (
            <img
              className={styles.image}
              src={secondCharacter}
              alt="Happy Odlaw"
            />
          ) : (
            <LoadingSpinner />
          )}
          <p className={styles.characterText}>{secondName}</p>
        </div>
        <div className={styles.imageContainer}>
          {thirdCharacter ? (
            <img
              className={styles.image}
              src={thirdCharacter}
              alt="Happy Wizard"
            />
          ) : (
            <LoadingSpinner />
          )}
          <p className={styles.characterText}>{thirdName}</p>
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
