import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/reducers/root';
import { IStatePosts, postsRequestData } from '../../store/actions/posts';
import { Card } from './Card/Card';
import styles from './cardlist.css';
import { TDispatch } from '../../App';
import { useObserver } from '../../hooks/useObserver';

type TPostsStoreData = Omit<IStatePosts, 'error'>;

export function CardList() {
  const [countLoad, setCountLoad] = React.useState(0);
  const [isVisibleBtn, setIsVisibleBtn] = React.useState(false);
  const dispatch = useDispatch<TDispatch<IRootState>>();
  const listEnd = React.useRef<HTMLDivElement>(null);
  const {
    data: posts,
    loading,
    after
  } = useSelector<IRootState, TPostsStoreData>((state) => state.posts);
  //Observer;
  useObserver(listEnd, loading, () => {
    if (countLoad === 2) {
      setIsVisibleBtn(true);
      return;
    }
    dispatch(postsRequestData(after));
    setCountLoad((countLoad) => countLoad + 1);
  });

  return (
    <>
      <ul className={styles.cardsList}>
        {loading && <li className={styles.loader}>Loading posts...</li>}
        {posts &&
          posts.map((post) => (
            <Card
              author={post.author}
              title={post.title}
              created={post.created}
              bannerImg={post.bannerImg}
              avatar={post.avatar}
              key={post.id}
              id={post.id}
              commentsCount={post.commentsCount}
              subreddit={post.subreddit}
              modalTextContent={post.modalTextContent}
              carmaCount={post.carmaCount}
            />
          ))}
      </ul>
      <div ref={listEnd} className={styles.listEnd}>
        {isVisibleBtn && (
          <button
            className={styles.showMore}
            onClick={() => {
              dispatch(postsRequestData(after));
              setCountLoad(1);
              setIsVisibleBtn(!isVisibleBtn);
            }}>
            Показать еще
          </button>
        )}
      </div>
    </>
  );
}
