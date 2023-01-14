import React from 'react';
import styles from './actionswrapper.css';

interface IActionsWrapperProps {
  children?: React.ReactNode;
}

export function ActionsWrapper({ children }: IActionsWrapperProps) {
  return <div className={styles.actions}>{children}</div>;
}
