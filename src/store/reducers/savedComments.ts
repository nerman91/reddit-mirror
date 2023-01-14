import { Reducer } from 'redux';
import {
  REMOVE_COMMENT,
  SET_COMMENT,
  TRemoveComment,
  TSetComment
} from '../actions/savedComments';

interface IStateComent {
  id: string;
  value: string;
}

export type TSavedCommentState = IStateComent[] | [];
type TSavedCommentsActions = TSetComment | TRemoveComment;

const initialState: TSavedCommentState = [];

export const savedCommentReducer: Reducer<
  TSavedCommentState,
  TSavedCommentsActions
> = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      return [...state, { value: action.text, id: action.id }];
    case REMOVE_COMMENT:
      return [...state.filter((comment) => comment.id !== action.id)];
    default:
      return state;
  }
};
