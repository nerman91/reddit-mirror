import React from 'react';
import { getDateCreated } from '../../../../../utils/js/getTime';
import styles from './metadata.css';

interface IMetaDataProps {
  created: number;
  author: string;
  avatar?: string;
}

export function MetaData({ author, avatar, created }: IMetaDataProps) {
  return (
    <div className={styles.metaData}>
      <div className={styles.userLink}>
        {avatar ? (
          <img className={styles.avatar} src={avatar} alt="avatar" />
        ) : (
          <img
            className={styles.avatar}
            src="https://ks-yanao.ru/image/png/avatar.png"
            alt="avatar"
          />
        )}

        <a href="#user-url" className={styles.username}>
          {author}
        </a>
      </div>

      <span className={styles.createdAt}>
        <span className={styles.publishedLabel}>опубликовано </span>
        {getDateCreated(created)}
      </span>
    </div>
  );
}
