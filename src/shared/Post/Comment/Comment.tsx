import React from 'react';
import { MetaData } from '../../CardList/Card/TextContent/MetaData';
import { Text } from '../../Text';
import { KarmaCounter } from '../../CardList/Card/Controls/KarmaCounter';
import { FormComment } from '../FormComment';
import styles from './comment.css';
import { CommentActions } from './CommentActions';
import { ICommentsData } from '../../../store/actions/comments';

interface ICommentProps {
  textComment: string;
  author: string;
  created: number;
  id: string;
  score: number;
  replies?: ICommentsData[];
  avatar?: string;
}

export function Comment({
  textComment,
  author,
  created,
  replies,
  id,
  score,
  avatar
}: ICommentProps) {
  const [isOpenForm, setIsOpenForm] = React.useState(false);
  return (
    <div className={styles.сomment}>
      <div className={styles.head}>
        <KarmaCounter carmaCount={0} />
        <MetaData author={author} created={created} />
      </div>

      <div className={styles.commentInfo}>
        <Text As="p" size={14} mobileSize={16}>
          {textComment}
        </Text>

        <CommentActions
          isOpenedForm={isOpenForm}
          score={score}
          onClickAnsver={setIsOpenForm}
        />

        {isOpenForm && <FormComment commentId={id} />}

        {replies && replies.length ? (
          <div className={styles.replies}>
            {replies.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                textComment={comment.textComment}
                created={comment.created}
                author={comment.author}
                replies={comment.replies}
                score={comment.score}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
