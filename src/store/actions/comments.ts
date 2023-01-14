import axios from 'axios';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '../reducers/root';

export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';

interface IResponseCommentsData {
  kind: string;
  data: {
    body: string;
    author: string;
    id: string;
    created: number;
    subreddit: string;
    score: number;
    replies?: {
      data: {
        children: IResponseCommentsData[];
      };
    };
  };
}

export interface ICommentsData {
  textComment: string;
  author: string;
  id: string;
  created: number;
  subreddit: string;
  score: number;
  replies?: ICommentsData[];
}

// **** actions types ****

export type TCommentsRequestAction = {
  type: typeof COMMENTS_REQUEST;
};

export type TCommentsRequestSuccessAction = {
  type: typeof COMMENTS_REQUEST_SUCCESS;
  data: {
    postId: string;
    comments: ICommentsData[];
  };
};

export type TCommentsRequestErrorAction = {
  type: typeof COMMENTS_REQUEST_ERROR;
  error: string;
};

// **** actions ****

export const commentsRequest: ActionCreator<TCommentsRequestAction> = () => ({
  type: COMMENTS_REQUEST
});

export const commentsRequestSuccess: ActionCreator<
  TCommentsRequestSuccessAction
> = (data, postId) => ({
  type: COMMENTS_REQUEST_SUCCESS,
  data: {
    comments: data,
    postId
  }
});

export const commentsRequestError: ActionCreator<
  TCommentsRequestErrorAction
> = (error) => ({
  type: COMMENTS_REQUEST_ERROR,
  error
});

function getCommentsData(
  initialData: IResponseCommentsData[]
): ICommentsData[] {
  return initialData
    .filter((comment) => comment.kind !== 'more')
    .map((comment) => {
      return {
        textComment: comment.data.body,
        author: comment.data.author,
        id: comment.data.id,
        created: comment.data.created,
        subreddit: comment.data.subreddit,
        score: comment.data.score,
        replies: comment.data.replies
          ? getCommentsData(comment.data.replies.data.children)
          : undefined
      };
    });
}

type TThunkAction = ThunkAction<void, IRootState, unknown, Action<string>>;

export const commentsRequestData =
  (postId: string, subreddit: string): TThunkAction =>
  (dispatch) => {
    dispatch(commentsRequest());
    axios({
      method: 'get',
      url: `http://api.reddit.com/r/${subreddit}/comments/${postId}`
    })
      .then((res) => {
        const resData: IResponseCommentsData[] = res.data[1].data.children;
        const commentsData = getCommentsData(resData);
        dispatch(commentsRequestSuccess(commentsData, postId));
      })
      .catch((error) => {
        console.log(error);
        dispatch(commentsRequestError(String(error)));
      });
  };
