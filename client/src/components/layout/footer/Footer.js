import React, { useState, Fragment } from "react";
import LatestNews from "./LatestNews";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { logout } from "../../../actions/auth";
import { setAlert } from "../../../actions/alert";
import { logoutPhotographer } from "../../../actions/authPhotographer";
import { Link } from "react-router-dom";

const Footer = ({
  setAlert,
  logout,
  logoutPhotographer,
  auth: { isAuthenticated, loading, user },
  authPhotographer: {
    photographerIsAuthenticated,
    photographerLoading,
    photographer,
  },
}) => {
  const [loadingButton, setLoadingButton] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
    try {
      await axios.post("/api/contact/newsletter", {
        email,
      });
      setLoadingButton(false);
      setAlert("Thank you, your email has been sent", "success", 10000);
      setEmail("");
    } catch (error) {
      setLoadingButton(false);
      setAlert("Sorry, something went wrong", "danger");
    }
  };
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className="footer-wrapper scrollspy-footer">
      <footer className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-sm-4 col-lg-3 mb-30-xs">
              <ul className="menu-footer">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/upload">Upload Photos</Link>
                </li>
                <li>
                  <Link to="/photos">Explore</Link>
                </li>
                <li>
                  <Link to="/blog">News & Updates</Link>
                </li>
                <li>
                  <Link to="/photos">View Photos</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-12 col-sm-8 col-lg-9">
              <div className="row">
                <LatestNews />
                <div className="col-xs-12 col-sm-12 col-lg-6 mt-30-sm">
                  <h4 className="footer-title">Subscribe For Special Update</h4>
                  <form
                    onSubmit={(e) => onSubmit(e)}
                    className="newsletter-footer"
                  >
                    <div className="input-group">
                      <input
                        name="email"
                        required
                        disabled={loadingButton ? true : false}
                        value={email}
                        onChange={(e) => onChange(e)}
                        type="email"
                        placeholder="Email Address"
                        className="form-control"
                      />
                      <div className="input-group-btn">
                        <button
                          disabled={loadingButton ? true : false}
                          type={loadingButton ? "button" : "submit"}
                          className="btn btn-primary"
                        >
                          {!loadingButton ? (
                            <Fragment>Submit</Fragment>
                          ) : (
                            <Fragment>
                              <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>{" "}
                              Sending...
                            </Fragment>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="clear mb-30"></div>
                  <h5 className="footer-title">Want to ask a question?</h5>
                  <p className="footer-phone-number">1-222-33658</p>
                  <p className="footer-email uppercase">
                    email us at{" "}
                    <a href="mailto:vidcam@gmail.com?Subject=Hello%20again">
                      support@vidcam.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bb mt-40"></div>
          <div className="mb-40"></div>
          <div className="social-footer clearfix">
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="/">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="/">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </footer>
      <footer className="secondary-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <p className="copy-right">© Copyright {getYear()} VIDCAM</p>
            </div>
            <div className="col-sm-6">
              <ul className="secondary-footer-menu clearfix">
                {(!loading && user !== null) ||
                (!photographerLoading && photographer !== null) ? (
                  <Fragment>
                    {isAuthenticated ? (
                      <Fragment>
                        <li>
                          <a>{user.name}</a>
                        </li>
                        <li
                          className="curs"
                          onClick={() => {
                            logout();
                          }}
                        >
                          <a>Log-out</a>
                        </li>
                        <li>
                          <Link to="/upload">Upload</Link>
                        </li>
                      </Fragment>
                    ) : photographerIsAuthenticated ? (
                      <Fragment>
                        <li className="curs">
                          <a>{photographer.name}</a>
                        </li>
                        <li
                          onClick={() => {
                            logoutPhotographer();
                          }}
                        >
                          <a>Sign-out</a>
                        </li>
                        <li>
                          <Link to="/upload">Upload</Link>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li>
                          <Link to="/upload">Upload photo</Link>
                        </li>
                        <li>
                          <Link to="/login">Sign-in</Link>
                        </li>
                        <li>
                          <Link to="/register">Sign-up</Link>
                        </li>
                      </Fragment>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>
                      <Link to="/upload">Upload photo</Link>
                    </li>
                    <li>
                      <Link to="/login">Sign-in</Link>
                    </li>
                    <li>
                      <Link to="/register">Sign-up</Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  authPhotographer: state.authPhotographer,
});

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  authPhotographer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  logoutPhotographer: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  logout,
  logoutPhotographer,
  setAlert,
})(Footer);
