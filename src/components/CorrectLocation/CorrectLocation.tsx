/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './CorrectLocation.module.scss';

interface CorrectLocationLocationProps {
  top: number;
  left: number;
}

function CorrectLocation({ top, left }: CorrectLocationLocationProps) {
  return (
    <div
      style={{
        top,
        left,
      }}
      className={styles.box}
    />
  );
}

export default CorrectLocation;
