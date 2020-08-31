import {
  ADMIN_USER_LOADED,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_ACCOUNT_DELETED
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("adminToken"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("adminToken", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ADMIN_AUTH_ERROR:
    case ADMIN_LOGIN_FAIL:
    case ADMIN_LOGOUT:
    case ADMIN_ACCOUNT_DELETED:
      localStorage.removeItem("adminToken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
