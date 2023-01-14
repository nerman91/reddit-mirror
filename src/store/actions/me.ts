import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { IRootState } from '../reducers/root';

export const ME_REQUEST = 'ME_REQUEST';
export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS';
export const ME_REQUEST_ERROR = 'ME_REQUEST_ERROR';

export interface IUserData {
  name?: string;
  iconImg?: string;
}

// **** actions types ****

export type TMeRequestAction = { type: typeof ME_REQUEST };

type TThunkAction = ThunkAction<void, IRootState, unknown, Action<string>>;

export type TMeRequestSuccessAction = {
  type: typeof ME_REQUEST_SUCCESS;
  data: IUserData;
};

export type TMeRequestErrorAction = {
  type: typeof ME_REQUEST_ERROR;
  error: string;
};

// **** actions ****

export const meRequest: ActionCreator<TMeRequestAction> = () => ({
  type: ME_REQUEST
});

export const meRequestSuccess: ActionCreator<TMeRequestSuccessAction> = (
  data: IUserData
) => ({
  type: ME_REQUEST_SUCCESS,
  data
});

export const meRequestError: ActionCreator<TMeRequestErrorAction> = (
  error: string
) => ({
  type: ME_REQUEST_ERROR,
  error
});

export const meRequestData = (): TThunkAction => (dispatch, getState) => {
  const { token } = getState().token;
  if (!token) return;
  dispatch(meRequest());
  axios({
    method: 'get',
    url: 'https://oauth.reddit.com/api/v1/me.json',
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => {
      const userData = res.data;
      dispatch(
        meRequestSuccess({
          name: userData.name,
          iconImg: userData.snoovatar_img
        })
      );
    })
    .catch((error) => {
      console.log(error);
      dispatch(meRequestError(String(error)));
    });
};
