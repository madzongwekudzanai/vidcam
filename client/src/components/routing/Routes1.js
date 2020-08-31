import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Blog from "../blog/Blog";
import CategoryBlog from "../blog/CategoryBlog";
import BlogDetail from "../blog/BlogDetail";
import SearchBlog from "../blog/SearchBlog";
import Section from "../photo/upload/Section";
import Contact from "../contact/Contact";
import SignIn from "../auth/SignIn";
import NotFound from "../layout/NotFound";
import Success from "../auth/Success";
import PhotographerSuccess from "../authPhotographer/PhotographerSuccess";
import SignUp from "../auth/SignUp";
import ForgotPassword from "../auth/ForgotPassword";
import ForgotPhotographerPassword from "../authPhotographer/ForgotPhotographerPassword";
import PhotographerSignIn from "../authPhotographer/PhotographerSignIn";
import PhotographerSignUp from "../authPhotographer/PhotographerSignUp";
import ProfileForm from "../profile/ProfileForm";
import UpdateProfile from "../profile/UpdateProfile";
import Profile from "../profile/Profile";
import MessagePhotographer from "../profile/MessagePhotographer";
import Dashboard from "../profile/Dashboard";

const Routes1 = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact component={Blog} path="/blog" />
        <Route
          exact
          component={CategoryBlog}
          path="/blog/categories/:category"
        />
        <Route exact component={BlogDetail} path="/blog/:id" />
        <Route
          exact
          component={SearchBlog}
          path="/blog/searchResults/:content"
        />
        <Route exact component={Section} path="/upload" />
        <Route exact component={Success} path="/auth-user/:token" />
        <Route
          exact
          component={PhotographerSuccess}
          path="/auth-photographer/:token"
        />
        <Route exact component={Contact} path="/contact" />
        <Route exact component={SignIn} path="/login" />
        <Route exact component={SignUp} path="/register" />
        <Route exact component={ForgotPassword} path="/reset" />
        <Route exact component={ProfileForm} path="/createProfile" />
        <Route exact component={MessagePhotographer} path="/message/:id" />
        <Route exact component={UpdateProfile} path="/editProfile" />
        <Route exact component={Profile} path="/profiles/:id" />
        <Route exact component={Dashboard} path="/dashboard" />
        <Route
          exact
          component={ForgotPhotographerPassword}
          path="/photographerReset"
        />
        <Route exact component={PhotographerSignIn} path="/loginPhotographer" />
        <Route
          exact
          component={PhotographerSignUp}
          path="/registerPhotographer"
        />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes1;
