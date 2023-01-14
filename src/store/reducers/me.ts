import {
  TMeRequestAction,
  TMeRequestSuccessAction,
  TMeRequestErrorAction,
  ME_REQUEST,
  ME_REQUEST_SUCCESS,
  ME_REQUEST_ERROR,
  IUserData
} from '../actions/me';
import { Reducer } from 'redux';

export interface IMeState {
  loading: boolean;
  error: string;
  data: IUserData;
}

type TMeActions =
  | TMeRequestAction
  | TMeRequestSuccessAction
  | TMeRequestErrorAction;

const initialState: IMeState = { loading: false, error: '', data: {} };

export const meReducer: Reducer<IMeState, TMeActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ME_REQUEST:
      return { ...state, loading: true };
    case ME_REQUEST_SUCCESS:
      return { ...state, data: action.data, loading: false };
    case ME_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};
