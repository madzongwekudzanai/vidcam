import axios from "axios";
import {
  ADMIN_USER_LOADED,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT
} from "./types";
import { setAdminAuthToken } from "../utils/setAuthToken";

// Load Admin
export const loadAdmin = () => async dispatch => {
  if (localStorage.token) {
    setAdminAuthToken(localStorage.adminToken);
  }

  try {
    const res = await axios.get("/api/auth/admin");

    dispatch({
      type: ADMIN_USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADMIN_AUTH_ERROR
    });
  }
};

// Authenticate Admin
export const authenticateAdmin = token => async dispatch => {
  setAdminAuthToken(token);
  dispatch(loadAdmin());
};

// Login Admin
export const loginAdmin = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/admin", body, config);

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadAdmin());
  } catch (err) {
    dispatch({
      type: ADMIN_LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: ADMIN_LOGOUT });
};
