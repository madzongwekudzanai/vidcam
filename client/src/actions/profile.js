import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  PHOTOGRAPHER_ACCOUNT_DELETED,
  GET_POPULAR_PROFILES,
  GET_FOLLOW_STATUS,
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Get follow Status
export const getFollowStatus = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/followStatus/${id}`);

    dispatch({
      type: GET_FOLLOW_STATUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Get popular profiles
export const getPopularProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile/popular");

    dispatch({
      type: GET_POPULAR_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit || edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Follow photographer
export const followPhotographer = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/follow/${id}`);

    dispatch({
      type: FOLLOW_PROFILE,
      payload: res.data,
    });
    dispatch(getFollowStatus(id));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// UnFollow Photographer
export const unFollowPhotographer = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/unFollow/${id}`);

    dispatch({
      type: UNFOLLOW_PROFILE,
      payload: res.data,
    });
    dispatch(getFollowStatus(id));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: PHOTOGRAPHER_ACCOUNT_DELETED,
      });
      dispatch(
        setAlert("Your account has been permanently deleted", "success")
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err, status: err },
      });
    }
  }
};
