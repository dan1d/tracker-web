import {
  SET_CURRENT_USER,
  LOGIN_STARTED,
  LOGIN_STARTED_SUCCESS,
  LOGIN_STARTED_ERROR,
  FETCH_USERS_STARTED,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
} from "../actionTypes";
import { saveToken } from '../../services/user';

const initialState = {
  current_user: {},
  users: [],
  token: '',
  requesting: false,
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      const { user } = action.payload;
      const token = user.token;
      saveToken(token);
      return {
        ...state,
        current_user: user,
        token: token
      };
    }

    case LOGIN_STARTED: {
      return {
        ...state,
        requesting: true
      };
    }

    case LOGIN_STARTED_SUCCESS: {
      return {
        ...state,
        requesting: false
      };
    }

    case LOGIN_STARTED_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        requesting: false,
        error: error
      };
    }

    case FETCH_USERS_STARTED: {
      return {
        ...state,
        requesting: true
      };
    }

    case FETCH_USERS_SUCCESS: {
      const { users } = action.payload
      console.log("USERS", users)
      return {
        ...state,
        users: users,
        requesting: false
      };
    }

    case FETCH_USERS_ERROR: {
      return {
        ...state,
        users: [],
        requesting: false
      };
    }



    default:
      return state;
  }
}
