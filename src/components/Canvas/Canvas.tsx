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
  const [correctLocation, setCorrectLocation] = useState(false);

  function handleClick(e: any) {
    const x = Number(e.clientX - 40);
    const y = Number(e.clientY - 40);
    setMenuY(y);
    setMenuX(x);
    setMenuOpen((m) => !m);
  }

  return (
    <div onClick={handleClick} className={styles.container}>
      <img src={waldo} alt="Where is waldo" className={styles.img} />
      {correctLocation && <CorrectLocation top={220} left={695} />}
      {menuOpen && (
        <TargetingMenu
          handleClick={() => setCorrectLocation((c) => !c)}
          top={menuY}
          left={menuX}
        />
      )}
    </div>
  );
}

export default Canvas;
