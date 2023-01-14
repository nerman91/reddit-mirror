import React from 'react';
import styles from './preview.css';

interface IPreviewProps {
  bannerImg?: string;
}

export function Preview({ bannerImg }: IPreviewProps) {
  return (
    <div className={styles.preview}>
      {bannerImg ? (
        <img className={styles.previewImg} src={bannerImg} />
      ) : (
        <img
          className={styles.previewImg}
          src="https://www.socialmediaexaminer.com/wp-content/uploads/2012/08/bb-reddit.png"
        />
      )}
    </div>
  );
}
