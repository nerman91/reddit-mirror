import { IStatePosts } from '../actions/posts';
import { IMeState, meReducer } from './me';
import { tokenReducer, ITokenState } from './token';
import { combineReducers } from 'redux';
import { postsReducer } from './posts';
import { commentsRequestReducer, ILoadCommentsState } from './comments';
import { savedCommentReducer, TSavedCommentState } from './savedComments';

export interface IRootState {
  savedComments: TSavedCommentState;
  token: ITokenState;
  me: IMeState;
  posts: IStatePosts;
  loadComments: ILoadCommentsState;
}

export const rootReducer = combineReducers<IRootState>({
  savedComments: savedCommentReducer,
  token: tokenReducer,
  me: meReducer,
  posts: postsReducer,
  loadComments: commentsRequestReducer
});
