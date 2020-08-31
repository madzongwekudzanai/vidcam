import {
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_POPULAR_PROFILES,
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
  GET_FOLLOW_STATUS,
} from "../actions/types";

const initialState = {
  profiles: [],
  popularProfiles: [],
  followStatus: [],
  singleProfile: null,
  loading: true,
  followStatusLoading: true,
  popularProfilesLoading: true,
  singleProfileLoading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        singleProfile: payload,
        singleProfileLoading: false,
      };
    case GET_POPULAR_PROFILES:
      return {
        ...state,
        popularProfiles: payload,
        popularProfilesLoading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_FOLLOW_STATUS:
      return {
        ...state,
        followStatus: payload,
        followStatusLoading: false,
      };
    case FOLLOW_PROFILE:
      return {
        ...state,
        singleProfile: { ...state.singleProfile, followers: payload },
        singleProfileLoading: false,
      };
    case UNFOLLOW_PROFILE:
      return {
        ...state,
        singleProfile: { ...state.singleProfile, followers: payload },
        singleProfileLoading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        singleProfileLoading: false,
        singleProfile: null,
        followStatusLoading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        singleProfile: null,
        singleProfileLoading: false,
      };
    default:
      return state;
  }
}
