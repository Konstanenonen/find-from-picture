import React from 'react';
import styles from './Navbar.module.scss';

interface NavbarProps {
  children: React.ReactNode;
}

function Navbar({ children }: NavbarProps) {
  return <nav className={styles.container}>{children}</nav>;
}

export default Navbar;
