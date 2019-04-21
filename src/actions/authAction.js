import {
  FETCH_TOKEN,
  SET_CURRENT_USER,
  AUTH_ERROR
} from './types';
import {
  ADMIN_ID,
  TOKEN
} from '../constants';
import * as utils from '../utils';
import authService from '../services/authService';
import history from '../utils/history';

function fetchToken() {
  return {
    type: FETCH_TOKEN
  };
}

function setCurrentUser(admin) {
  return {
    type: SET_CURRENT_USER,
    admin
  };
}

function authError(error) {
  utils.removeStorage(ADMIN_ID);
  utils.removeStorage(TOKEN);
  return {
		type: AUTH_ERROR,
		payload: error
  };
}

function signin(username, password) {
	return async (dispatch) => {
		try {
			dispatch(fetchToken());

      const res = await authService.post(username, password);
      console.log('res',res);

			if (res.status === 200 && res.data.code === 0) {
				const token = res.data.data.email;
        const adminId = res.data.data.id;
				utils.setStorage(TOKEN, token);
				utils.setStorage(ADMIN_ID, adminId);
				return dispatch(setCurrentUser({
					adminId,
					token
				}));
			} else {
        return dispatch(authError(res.data.message));
      }
		} catch (err) {
      console.log('err', err.response)
			if (err.response === undefined) {
				const errorMessage = '服务器错误，请稍后再试';
				return dispatch(authError(errorMessage));
			}

			if (err.response.status) {
				const errorMessage = err.response.data;
				return dispatch(authError(errorMessage));
			}
		}
	}
}

function signout() {
	return (dispatch) => {
		utils.removeStorage(TOKEN);
		dispatch(setCurrentUser({}));
	}
}

export {
	setCurrentUser,
	authError,
	signin,
	signout
};
