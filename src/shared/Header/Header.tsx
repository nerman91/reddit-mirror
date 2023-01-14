import React from 'react';
import styles from './header.css';
import { AppTitle } from './AppTitle';
import { UserBlock } from './UserBlock';

export function Header() {
  return (
    <header className={styles.header}>
      <UserBlock />
      <AppTitle />
    </header>
  );
}
