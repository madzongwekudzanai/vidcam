import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./bootstrap.min.css";
import "./animate.css";
import "./main.css";
import "./component.css";
import "./App.css";
import Header from "./components/layout/header/Header";
import Alert from "./components/layout/Alert";
import ScrollToTop from "./components/layout/ScrollToTop";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";
import Footer from "./components/layout/footer/Footer";
import Routes from "./components/routing/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { loadPhotographer } from "./actions/authPhotographer";
import { setAuthToken, setPhotographerAuthToken } from "./utils/setAuthToken";

if (localStorage.token || localStorage.photographerToken) {
  setAuthToken(localStorage.token);
  setPhotographerAuthToken(localStorage.photographerToken);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadPhotographer());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="wrapper container-wrapper">
          <Header />
          <ScrollToTop />
          <Switch>
            <div className="main-wrapper">
              <Route component={Routes} />
            </div>
          </Switch>
          <Footer />
        </div>
        <Alert />
        <ScrollToTopButton />
      </Router>
    </Provider>
  );
};

export default App;
