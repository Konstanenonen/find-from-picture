import React from 'react';
import styles from './TargetingMenu.module.scss';

function TargetingMenu() {
  return (
    <div className={styles.container}>
      <div className={styles.box} />
      <div className={styles.buttons}>
        <button type="button" className={styles.button}>
          Waldo
        </button>
        <button type="button" className={styles.button}>
          Wilma
        </button>
        <button type="button" className={styles.button}>
          Wizard
        </button>
      </div>
    </div>
  );
}

export default TargetingMenu;
