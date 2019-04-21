import {
  LOAD_USERS,
  RECEIVE_USERS
} from '../actions/types';

const initialState = {
  isFetching: false,
  users: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_USERS:
        return {
          ...state,
          isFetching: true
        };
    case RECEIVE_USERS:
        return {
          ...state,
          isFetching: false,
          users: action.users
        };
    default:
      return state;
  }
}
