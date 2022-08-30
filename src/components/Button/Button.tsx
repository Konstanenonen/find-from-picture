import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  isSubmit: boolean;
  handleClick?: () => void;
  fontSize?: number;
}

function button({ text, isSubmit, handleClick, fontSize }: ButtonProps) {
  return (
    <button
      style={{ fontSize: `${fontSize}rem` }}
      className={styles.container}
      onClick={handleClick}
      type={isSubmit ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
}

export default button;
