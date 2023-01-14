import { Reducer } from 'redux';
import { SET_TOKEN } from '../actions/token';

export interface ITokenState {
  token: string;
}

const initialState: ITokenState = { token: '' };

export const tokenReducer: Reducer<ITokenState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token };
    default:
      return state;
  }
};
