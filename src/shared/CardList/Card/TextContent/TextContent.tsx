import React from 'react';
import styles from './textcontent.css';
import { MetaData } from './MetaData';
import { Title } from './Title';

interface ITextContentProps {
  author: string;
  title: string;
  created: number;
  carmaCount: number;
  id: string;
  subreddit: string;
  commentsCount: number;
  avatar?: string;
  modalTextContent?: string;
}

export function TextContent({
  author,
  title,
  avatar,
  created,
  modalTextContent,
  carmaCount,
  id,
  subreddit,
  commentsCount
}: ITextContentProps) {
  return (
    <div className={styles.textContent}>
      <MetaData author={author} avatar={avatar} created={created} />
      <Title
        title={title}
        modalTextContent={modalTextContent}
        author={author}
        avatar={avatar}
        created={created}
        carmaCount={carmaCount}
        id={id}
        subreddit={subreddit}
        commentsCount={commentsCount}
      />
    </div>
  );
}
