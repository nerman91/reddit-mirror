import React from 'react';
import styles from './card.css';
import { Controls } from './Controls';
import { MenuCard } from './MenuCard';
import { Preview } from './Preview';
import { TextContent } from './TextContent';

interface ICardProps {
  author: string;
  title: string;
  created: number;
  id: string;
  commentsCount: number;
  subreddit: string;
  carmaCount: number;
  modalTextContent?: string;
  bannerImg?: string;
  avatar?: string;
}

export function Card({
  author,
  title,
  created,
  bannerImg,
  avatar,
  id,
  commentsCount,
  subreddit,
  modalTextContent,
  carmaCount
}: ICardProps) {
  return (
    <li className={styles.card} id={id}>
      <TextContent
        author={author}
        title={title}
        avatar={avatar}
        created={created}
        modalTextContent={modalTextContent}
        carmaCount={carmaCount}
        id={id}
        subreddit={subreddit}
        commentsCount={commentsCount}
      />
      <Preview bannerImg={bannerImg} />
      <MenuCard postId={id} />
      <Controls commentsCount={commentsCount} carmaCount={carmaCount} />
    </li>
  );
}
