import React from 'react';
import styles from './WrongSelectionPopup.module.scss';

function WrongSelectionPopup() {
  return (
    <div className={styles.container}>
      <p>Wrong location, try again!</p>
    </div>
  );
}

export default WrongSelectionPopup;
