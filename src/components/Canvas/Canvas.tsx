import React from 'react';
import waldo from '../../images/waldo.jpg';
import styles from './Canvas.module.scss';

function Canvas() {
  return (
    <div>
      <img src={waldo} alt="Where is waldo" className={styles.img} />
    </div>
  );
}

export default Canvas;
