import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.container}>
      <p>Made by Konsta Nenonen</p>
      <a href="https://github.com/Konstanenonen/find-from-picture">
        Link to repo
      </a>
    </div>
  );
}

export default Footer;
