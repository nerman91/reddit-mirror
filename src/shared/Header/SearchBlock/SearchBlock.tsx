import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store/reducers/root';
import { IUserData } from '../../../store/actions/me';
import styles from './searchblock.css';
import { UserBlock } from './UserBlock';

export function SearchBlock() {
  const { iconImg, name } = useSelector<IRootState, IUserData>(
    (state) => state.me.data
  );

  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={iconImg} username={name} />
    </div>
  );
}
