import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../../../Post';
import styles from './title.css';

interface ITitle {
  title: string;
  author: string;
  created: number;
  subreddit: string;
  id: string;
  carmaCount: number;
  commentsCount: number;
  modalTextContent?: string;
  avatar?: string;
}

export function Title({
  title,
  modalTextContent,
  author,
  created,
  avatar,
  carmaCount,
  subreddit,
  id,
  commentsCount
}: ITitle) {
  return (
    <h2 className={styles.title}>
      <Link
        to={`/posts/${id}`}
        className={styles.postLink}
        state={{
          title,
          modalTextContent,
          author,
          created,
          avatar,
          carmaCount,
          subreddit,
          id,
          commentsCount
        }}>
        {title}
      </Link>
    </h2>
  );
}
