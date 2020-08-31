import axios from "axios";
import {
  PHOTOGRAPHER_LOADED,
  AUTH_PHOTOGRAPHER_ERROR,
  LOGIN_PHOTOGRAPHER_SUCCESS,
  LOGIN_PHOTOGRAPHER_FAIL,
  LOGOUT_PHOTOGRAPHER,
  CLEAR_PROFILE,
} from "./types";
import { setPhotographerAuthToken } from "../utils/setAuthToken";
import { logout } from "./auth";
import { getCurrentProfile } from "./profile";
import { setAlert } from "./alert";

// Load Photographer
export const loadPhotographer = () => async (dispatch) => {
  if (localStorage.photographerToken) {
    setPhotographerAuthToken(localStorage.photographerToken);
  }

  try {
    const res = await axios.get("/api/auth/photographer");

    dispatch({
      type: PHOTOGRAPHER_LOADED,
      payload: res.data,
    });
    dispatch(getCurrentProfile());
  } catch (err) {
    dispatch({
      type: AUTH_PHOTOGRAPHER_ERROR,
    });
  }
};

// Authenticate Photographer
export const authenticatePhotographer = (token) => async (dispatch) => {
  dispatch(logout());
  setPhotographerAuthToken(token);
  dispatch(loadPhotographer());
  dispatch(setAlert("Thank you your email has been verified", "success"));
  dispatch(getCurrentProfile());
};

// Login Photographer
export const loginPhotographer = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/photographer", body, config);

    dispatch({
      type: LOGIN_PHOTOGRAPHER_SUCCESS,
      payload: res.data,
    });
    dispatch(getCurrentProfile());
    dispatch(logout());
    dispatch(setAlert("You're now logged in", "success"));
    dispatch(loadPhotographer());
  } catch (err) {
    dispatch({
      type: LOGIN_PHOTOGRAPHER_FAIL,
    });
    dispatch(setAlert("Invalid Credentials", "danger"));
  }
};

// Logout / Clear Profile
export const logoutPhotographer = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT_PHOTOGRAPHER });
};
