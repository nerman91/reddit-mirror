import axios from 'axios';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '../reducers/root';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

export interface IPostData {
  author: string;
  id: string;
  title: string;
  url: string;
  created: number;
  commentsCount: number;
  subreddit: string;
  carmaCount: number;
  bannerImg?: string;
  avatar?: string;
  modalTextContent?: string;
}

export interface IStatePosts {
  error: string;
  after: string;
  data: IPostData[];
  loading: boolean;
}

export type TPostsRequestAction = {
  type: typeof POSTS_REQUEST;
};

export type TPostsRequestSuccessAction = {
  type: typeof POSTS_REQUEST_SUCCESS;
  data: IPostData[];
  after: string;
};

export type TPostsRequestError = {
  type: typeof POSTS_REQUEST_ERROR;
  error: string;
};

export const postRequest: ActionCreator<TPostsRequestAction> = () => ({
  type: POSTS_REQUEST
});

export const postsRequestSuccess: ActionCreator<TPostsRequestSuccessAction> = (
  data: IPostData[],
  after: string
) => ({
  type: POSTS_REQUEST_SUCCESS,
  data,
  after
});

export const postsRequestError: ActionCreator<TPostsRequestError> = (
  error: string
) => ({
  type: POSTS_REQUEST_ERROR,
  error
});

type TThunkAction = ThunkAction<void, IRootState, unknown, Action<string>>;

interface IResponseData {
  data: {
    id: string;
    author: string;
    title: string;
    url: string;
    created: number;
    num_comments: number;
    subreddit: string;
    selftext: string;
    score: number;
    sr_detail: {
      banner_img?: string;
      icon_img?: string;
    };
  };
}

export const postsRequestData =
  (after: string): TThunkAction =>
  (dispatch, getState) => {
    const { token } = getState().token;
    dispatch(postRequest());
    axios({
      method: 'get',
      url: 'https://oauth.reddit.com/best.json?sr_detail=true',
      headers: { Authorization: `Bearer ${token}` },
      params: {
        limit: 10,
        after
      }
    })
      .then((res) => {
        const resData: IResponseData[] = res.data.data.children;
        const after: string = res.data.data.after;
        const data = resData.map((post) => {
          return {
            id: post.data.id,
            author: post.data.author,
            title: post.data.title,
            url: post.data.url,
            created: post.data.created,
            bannerImg: post.data.sr_detail.banner_img,
            avatar: post.data.sr_detail.icon_img,
            commentsCount: post.data.num_comments,
            subreddit: post.data.subreddit,
            modalTextContent: post.data.selftext,
            carmaCount: post.data.score
          };
        });

        dispatch(postsRequestSuccess(data, after));
      })
      .catch(console.log);
  };
