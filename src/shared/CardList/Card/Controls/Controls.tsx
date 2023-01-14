import React from 'react';
import styles from './controls.css';
import { Actions } from './Actions';
import { CommentsButton } from './CommentsButton';
import { KarmaCounter } from './KarmaCounter';

interface ICommentsProps {
  commentsCount: number;
  carmaCount: number;
}

export function Controls({ commentsCount, carmaCount }: ICommentsProps) {
  return (
    <div className={styles.controls}>
      <KarmaCounter carmaCount={carmaCount} />
      <CommentsButton commentsCount={commentsCount} />
      <Actions />
    </div>
  );
}
