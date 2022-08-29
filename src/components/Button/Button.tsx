import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  isSubmit: boolean;
  handleClick?: () => void;
}

function button({ text, isSubmit, handleClick }: ButtonProps) {
  return (
    <button
      className={styles.container}
      onClick={handleClick}
      type={isSubmit ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
}

export default button;
