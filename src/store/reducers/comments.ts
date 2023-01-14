import { COMMENTS_REQUEST } from './../actions/comments';
import { Reducer } from 'redux';
import {
  COMMENTS_REQUEST_ERROR,
  COMMENTS_REQUEST_SUCCESS,
  ICommentsData,
  TCommentsRequestErrorAction,
  TCommentsRequestSuccessAction,
  TCommentsRequestAction
} from '../actions/comments';

export interface ILoadCommentsState {
  loading: boolean;
  error: string;
  data: {
    comments: ICommentsData[];
    postId: string;
  };
}

type TLoadCommentsActions =
  | TCommentsRequestAction
  | TCommentsRequestSuccessAction
  | TCommentsRequestErrorAction;

const initialState: ILoadCommentsState = {
  loading: false,
  error: '',
  data: {
    comments: [],
    postId: ''
  }
};

export const commentsRequestReducer: Reducer<
  ILoadCommentsState,
  TLoadCommentsActions
> = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return { ...state, loading: true };
    case COMMENTS_REQUEST_SUCCESS:
      return { ...state, data: action.data, loading: false };
    case COMMENTS_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};
