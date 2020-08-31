import {
  PHOTOGRAPHER_LOADED,
  AUTH_PHOTOGRAPHER_ERROR,
  LOGIN_PHOTOGRAPHER_SUCCESS,
  LOGIN_PHOTOGRAPHER_FAIL,
  LOGOUT_PHOTOGRAPHER,
  PHOTOGRAPHER_ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("photographerToken"),
  photographerIsAuthenticated: null,
  photographerLoading: true,
  photographer: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PHOTOGRAPHER_LOADED:
      return {
        ...state,
        photographerIsAuthenticated: true,
        photographerLoading: false,
        photographer: payload,
      };
    case LOGIN_PHOTOGRAPHER_SUCCESS:
      localStorage.setItem("photographerToken", payload.token);
      return {
        ...state,
        ...payload,
        photographerIsAuthenticated: true,
        photographerLoading: false,
      };
    case AUTH_PHOTOGRAPHER_ERROR:
    case LOGIN_PHOTOGRAPHER_FAIL:
    case LOGOUT_PHOTOGRAPHER:
    case PHOTOGRAPHER_ACCOUNT_DELETED:
      localStorage.removeItem("photographerToken");
      return {
        ...state,
        token: null,
        photographerIsAuthenticated: false,
        photographerLoading: false,
        photographer: null,
      };
    default:
      return state;
  }
}
