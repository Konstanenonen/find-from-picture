/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import waldo from '../../images/waldo.jpg';
import CorrectLocation from '../CorrectLocation/CorrectLocation';
import TargetingMenu from '../TargetingMenu/TargetingMenu';
import styles from './Canvas.module.scss';

function Canvas() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div onClick={() => setMenuOpen((m) => !m)} className={styles.container}>
      <img src={waldo} alt="Where is waldo" className={styles.img} />
      <CorrectLocation top={215} left={515} />
      {menuOpen && <TargetingMenu />}
    </div>
  );
}

export default Canvas;
