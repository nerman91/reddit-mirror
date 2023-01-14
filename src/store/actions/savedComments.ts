import { ActionCreator } from 'redux';

export const SET_COMMENT = 'SET_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export type TSetComment = {
  type: typeof SET_COMMENT;
  text: string;
  id: string;
};

export type TRemoveComment = {
  type: typeof REMOVE_COMMENT;
  id: string;
};

export const setComment: ActionCreator<TSetComment> = (text, id) => ({
  type: SET_COMMENT,
  text,
  id
});

export const removeComment: ActionCreator<TRemoveComment> = (id) => ({
  type: REMOVE_COMMENT,
  id
});
