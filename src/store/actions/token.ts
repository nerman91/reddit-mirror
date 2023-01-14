import { Action, ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '../reducers/root';

export const SET_TOKEN = 'SET_TOKEN';

export const setToken: ActionCreator<AnyAction> = (token) => ({
  type: SET_TOKEN,
  token
});

type TThunkAction = ThunkAction<void, IRootState, unknown, Action<string>>;

export const saveToken = (): TThunkAction => (dispatch) => {
  const token = window.__token__;
  if (token && token.length > 0 && token !== 'undefined') {
    dispatch(setToken(token));
  }
};
