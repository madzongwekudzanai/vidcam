import { combineReducers } from "redux";
import auth from "./auth";
import authPhotographer from "./authPhotographer";
import alert from "./alert";
import post from "./post";
import profile from "./profile";
import photo from "./photo";

export default combineReducers({
  alert,
  auth,
  post,
  authPhotographer,
  profile,
  photo,
});
