import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EColors, Text } from '../Text';
import { MetaData } from '../CardList/Card/TextContent/MetaData';
import { KarmaCounter } from '../CardList/Card/Controls/KarmaCounter';
import { Comment } from './Comment';
import { EIcons, Icon } from '../Icon';
import styles from './post.css';
import { FormComment } from './FormComment';
import { numToString } from '../../utils/js/numToString';
import {
  generateId,
  generateRandomString
} from '../../utils/react/geterateRandomIndex';
import { IRootState } from '../../store/reducers/root';
import {
  commentsRequestData,
  ICommentsData
} from '../../store/actions/comments';
import { useLocation, useNavigate } from 'react-router-dom';
import { IPostData } from '../../store/actions/posts';
import { TDispatch } from '../../App';

const actionsPostDesktop = [
  {
    icon: <Icon name={EIcons.shared} size={14} />,
    text: (
      <Text As="span" size={14} color={EColors.grey99}>
        Поделиться
      </Text>
    ),
    className: 'shared'
  },
  {
    icon: <Icon name={EIcons.hide} size={14} />,
    text: (
      <Text As="span" size={14} color={EColors.grey99}>
        Скрыть
      </Text>
    ),
    className: 'hide'
  },
  {
    icon: <Icon name={EIcons.save} size={14} />,
    text: (
      <Text As="span" size={14} color={EColors.grey99}>
        Сохранить
      </Text>
    ),
    className: 'save'
  },
  {
    icon: <Icon name={EIcons.complaint} size={14} />,
    text: (
      <Text size={14} color={EColors.grey99}>
        Пожаловаться
      </Text>
    ),
    className: 'complaint'
  }
].map(generateId);

type TPost = Omit<IPostData, 'bannerImg' | 'url'>;

export function Post() {
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const node = document.getElementById('modal-root');
  const dispatch = useDispatch<TDispatch<IRootState>>();

  const {
    title,
    modalTextContent,
    author,
    created,
    avatar,
    carmaCount,
    subreddit,
    id: postId,
    commentsCount
  } = location.state as TPost;

  React.useEffect(() => {
    dispatch(commentsRequestData(postId, subreddit));
  }, []);

  const loading = useSelector<IRootState, boolean>(
    (state) => state.loadComments.loading
  );

  const comments = useSelector<IRootState, ICommentsData[]>((state) =>
    state.loadComments.data.postId === postId
      ? state.loadComments.data.comments
      : []
  );

  if (!node) return null;

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !modalRef.current?.contains(event.target)
      ) {
        navigate(-1);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modal} ref={modalRef}>
      <div className={styles.postInfo}>
        <div className={styles.head}>
          <KarmaCounter carmaCount={carmaCount} />
          <div>
            <Text As={'h2'} size={20} mobileSize={16}>
              {title}
            </Text>
            <MetaData author={author} avatar={avatar} created={created} />
          </div>
        </div>
        <button className={styles.closeModal} onClick={() => navigate(-1)}>
          <Icon name={EIcons.close} size={20} />
        </button>
        <div className={styles.content}>
          {modalTextContent ? (
            <Text As={'p'} size={14}>
              {modalTextContent}
            </Text>
          ) : null}
        </div>

        <ul className={styles.postActionsDesktop}>
          {[
            {
              icon: <Icon name={EIcons.comments} size={14} />,
              text: (
                <Text As="span" size={14} color={EColors.grey99}>
                  {`${commentsCount} `}
                  {numToString(commentsCount, [
                    'комментарий',
                    'комментария',
                    'комментариев'
                  ])}
                </Text>
              ),
              id: generateRandomString(),
              className: 'comments'
            },
            ...actionsPostDesktop
          ].map((action) => (
            <li className={styles.postAction} key={action.id}>
              <button className={action.className}>
                {action.icon} {action.text}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.postActionsMobile}>
          <KarmaCounter carmaCount={carmaCount} />
          <button className={styles.commentsMobile}>
            <Icon name={EIcons.comments} size={14} />
            <Text As="span" size={14} color={EColors.greyC4}>
              22
            </Text>
          </button>

          <div className={styles.actionsSend}>
            <button className={styles.sharedMobile}>
              <Icon name={EIcons.sharedMobile} size={20} />
            </button>
            <button className={styles.complaintMobile}>
              <Icon name={EIcons.complaintMobile} size={20} />
            </button>
          </div>
        </div>

        {/* ==== FORM  ==== */}
        <FormComment commentId={postId} />
      </div>

      <div className={styles.commentsList}>
        {loading && !comments.length && (
          <div className={styles.loader}>Loading comments...</div>
        )}
        {comments && comments.length
          ? comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                textComment={comment.textComment}
                created={comment.created}
                author={comment.author}
                replies={comment.replies}
                score={comment.score}
              />
            ))
          : ''}
      </div>
    </div>,
    node
  );
}
