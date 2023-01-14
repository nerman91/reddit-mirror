import React from 'react';
import { EIcons, Icon } from '../../../../Icon';
import styles from './commentsbutton.css';

interface ICommentsProps {
  commentsCount: number;
}

export function CommentsButton({ commentsCount }: ICommentsProps) {
  return (
    <button className={styles.commentsButton}>
      <Icon name={EIcons.comments} size={14} />
      <span className={styles.commentsNumber}>{commentsCount}</span>
    </button>
  );
}
