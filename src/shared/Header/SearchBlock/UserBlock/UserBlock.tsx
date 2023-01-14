import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store/reducers/root';
import { EIcons, Icon } from '../../../Icon';
import { EColors, Text } from '../../../Text';
import styles from './userblock.css';

interface IUserBlockProps {
  avatarSrc?: string;
  username?: string;
}

const CLIENT_ID = process.env.ClIENT_ID;

export function UserBlock({ avatarSrc, username }: IUserBlockProps) {
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.me.loading
  );
  return (
    <a
      className={styles.userBox}
      href={`https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read submit identity`}>
      <div className={styles.avatarBox}>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="user avatar"
            className={styles.avatarImage}
          />
        ) : (
          <Icon name={EIcons.anon} size={50} />
        )}
      </div>

      <div className={styles.username}>
        {isLoading ? (
          <Text size={20} color={username ? EColors.black : EColors.grey99}>
            Loading...
          </Text>
        ) : (
          <Text size={20} color={username ? EColors.black : EColors.grey99}>
            {username || 'Аноним'}
          </Text>
        )}
      </div>
    </a>
  );
}
