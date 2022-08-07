import React from 'react';
import styles from './TargetingMenu.module.scss';

interface TargetingMenuProps {
  top: number;
  left: number;
  handleWaldo: () => void;
  handleWizard: () => void;
}

function TargetingMenu({
  top,
  left,
  handleWaldo,
  handleWizard,
}: TargetingMenuProps) {
  return (
    <div className={styles.container} style={{ top, left }}>
      <div className={styles.box} />
      <div className={styles.buttons}>
        <button type="button" className={styles.button} onClick={handleWaldo}>
          Waldo
        </button>
        <button type="button" className={styles.button}>
          Wilma
        </button>
        <button type="button" className={styles.button} onClick={handleWizard}>
          Wizard
        </button>
      </div>
    </div>
  );
}

export default TargetingMenu;
