import React from 'react';
import styles from './notfound.css';

export function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        <div className={styles.smile}>😕</div>
        «404 — страница не найдена»
      </h1>
    </div>
  );
}
