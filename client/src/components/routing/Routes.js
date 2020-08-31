import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import AllPhotos from "../photo/AllPhotos";
import PhotoDetail from "../photo/PhotoDetail";
import Landing from "../../components/layout/Landing";
import CategoryPhoto from "../photo/CategoryPhoto";
import SearchPhoto from "../photo/SearchPhoto";
import Routes1 from "./Routes1";

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact component={PhotoDetail} path="/photos/:id" />
        <Route exact component={AllPhotos} path="/photos" />
        <Route
          exact
          component={CategoryPhoto}
          path="/photos/categories/:category"
        />
        <Route
          exact
          component={SearchPhoto}
          path="/photos/searchResults/:content"
        />
        <Route component={Routes1} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
