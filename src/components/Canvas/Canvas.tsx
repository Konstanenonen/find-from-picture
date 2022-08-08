/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import waldo from '../../images/waldo.jpg';
import CorrectLocation from '../CorrectLocation/CorrectLocation';
import TargetingMenu from '../TargetingMenu/TargetingMenu';
import styles from './Canvas.module.scss';

function Canvas() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
  const [waldoLocation, setWaldoLocation] = useState(false);
  const [wizardLocation, setWizardLocation] = useState(false);

  function handleClick(e: any) {
    const x = Number(e.pageX - 40);
    const y = Number(e.pageY - 40);
    setMenuY(y);
    setMenuX(x);
    setMenuOpen((m) => !m);
  }

  return (
    <div onClick={handleClick} className={styles.container}>
      <img src={waldo} alt="Where is waldo" className={styles.img} />
      {menuOpen && (
        <TargetingMenu
          handleWaldo={() => setWaldoLocation((c) => !c)}
          handleWizard={() => setWizardLocation((w) => !w)}
          top={menuY}
          left={menuX}
        />
      )}
      {waldoLocation && <CorrectLocation top="37%" left="51%" />}
      {wizardLocation && <CorrectLocation top="37%" left="64%" />}
    </div>
  );
}

export default Canvas;
