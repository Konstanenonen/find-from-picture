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

  function handleClick(e: any) {
    const x = Number(e.clientX);
    const y = Number(e.clientY);
    setMenuX(x - 40);
    setMenuY(y - 40);
    setMenuOpen((m) => !m);
  }

  return (
    <div onClick={handleClick} className={styles.container}>
      <img src={waldo} alt="Where is waldo" className={styles.img} />
      <CorrectLocation top={215} left={515} />
      {menuOpen && <TargetingMenu top={menuY} left={menuX} />}
    </div>
  );
}

export default Canvas;
