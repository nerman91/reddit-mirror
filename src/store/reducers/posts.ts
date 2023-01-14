import { Reducer } from 'redux';
import {
  IStatePosts,
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS,
  TPostsRequestAction,
  TPostsRequestError,
  TPostsRequestSuccessAction
} from '../actions/posts';

type TPostsActions =
  | TPostsRequestAction
  | TPostsRequestSuccessAction
  | TPostsRequestError;

const initialState: IStatePosts = {
  error: '',
  after: '',
  data: [],
  loading: false
};

export const postsReducer: Reducer<IStatePosts, TPostsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return { ...state, loading: true };
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        after: action.after,
        data: [...state.data, ...action.data],
        loading: false
      };
    case POSTS_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};
