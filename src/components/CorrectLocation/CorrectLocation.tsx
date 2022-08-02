/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import styles from './CorrectLocation.module.scss';

interface CorrectLocationLocationProps {
  top: number;
  left: number;
}

function CorrectLocation({ top, left }: CorrectLocationLocationProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      style={{
        top,
        left,
      }}
      onClick={() => setClicked(true)}
      className={clicked ? `${styles.box} ${styles.show}` : styles.box}
    />
  );
}

export default CorrectLocation;
