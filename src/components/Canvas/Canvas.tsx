import React from 'react';
import waldo from '../../images/waldo.jpg';
import CorrectLocation from '../CorrectLocation/CorrectLocation';
import styles from './Canvas.module.scss';

function Canvas() {
  return (
    <div className={styles.container}>
      <img src={waldo} alt="Where is waldo" className={styles.img} />
      <CorrectLocation top={215} left={515} />
    </div>
  );
}

export default Canvas;
