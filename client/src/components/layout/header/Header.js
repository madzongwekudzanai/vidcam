import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { logoutPhotographer } from "../../../actions/authPhotographer";

import "./style.css";

const Header = ({
  history,
  logout,
  logoutPhotographer,
  auth: { isAuthenticated, loading },
  authPhotographer: { photographerIsAuthenticated, photographerLoading },
}) => {
  const [expandNav, setExpandNav] = useState(false);
  const toggleNavbar = () => {
    setExpandNav(!expandNav);
  };
  const [expandDrop, setExpandDrop] = useState(false);
  const toggleDrop = () => {
    setExpandDrop(!expandDrop);
  };
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  useEffect(() => {
    history.listen((location, action) => {
      // location is an object like window.location
      setActiveLink(`${location.pathname}`);
    });
  }, [activeLink, history]);
  return (
    <header id="header">
      <nav className="navbar navbar-default navbar-fixed-top navbar-sticky">
        <div className="navbar-header pilleft">
          <Link to="/" className="navbar-brand">
            <i className="fa fa-camera-retro"></i> Vidcam
          </Link>
        </div>
        <div className="hidex">
          <ul className="nav navbar-nav" id="responsive-menu">
            <li className={activeLink === "/" ? "active" : null}>
              <Link to="/">Home</Link>
            </li>
            <li className={activeLink === "/photos" ? "active" : null}>
              <Link to="/photos">View Photos</Link>
            </li>
            <li
              className={
                activeLink === "/blog" || activeLink === "/blog/"
                  ? "active"
                  : null
              }
            >
              <Link to="/blog">Blog</Link>
            </li>
            <li className={activeLink === "/contact" ? "active" : null}>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="pilright pull-right">
          <div className="navbar-mini">
            <ul className="clearfix">
              <li className="dropdown hidden-xs">
                <Link to="/upload">
                  <i className="fas fa-upload"></i> Upload
                </Link>
              </li>
              <li className="dropdown hidden-xs">
                {!photographerLoading && photographerIsAuthenticated ? (
                  <Link to="/dashboard">
                    <i className="fas fa-user"></i> Profile
                  </Link>
                ) : (
                  <Link to="/photos">
                    <i className="fas fa-photo-video"></i> Explore
                  </Link>
                )}
              </li>
              <li
                className={`dropdown visible-xs ${expandDrop ? "open" : null}`}
              >
                <Link
                  onClick={toggleDrop}
                  id="currncy-language-dropdown"
                  className="dropdown-toggle"
                  role="button"
                >
                  <i className="fa fa-cog"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li onClick={toggleDrop}>
                    <Link to="/upload">
                      <i className="fas fa-upload"></i> Upload
                    </Link>
                  </li>
                  <li className="divider"></li>
                  <li onClick={toggleDrop}>
                    {!photographerLoading && photographerIsAuthenticated ? (
                      <Link to="/dashboard">
                        <i className="fas fa-user"></i> Profile
                      </Link>
                    ) : (
                      <Link to="/photos">
                        <i className="fas fa-photo-video"></i> Explore
                      </Link>
                    )}
                  </li>
                </ul>
              </li>
              {(!loading || !photographerLoading) && (
                <Fragment>
                  {isAuthenticated ? (
                    <li onClick={logout} className="user-action">
                      <a className="btn">Sign out</a>
                    </li>
                  ) : photographerIsAuthenticated ? (
                    <li onClick={logoutPhotographer} className="user-action">
                      <a className="btn">Sign out</a>
                    </li>
                  ) : (
                    <li className="user-action">
                      <Link to="/register" className="btn">
                        Sign up/in
                      </Link>
                    </li>
                  )}
                </Fragment>
              )}
            </ul>
          </div>
        </div>
        <a
          onClick={toggleNavbar}
          className={`slicknav_btn ${
            expandNav ? "slicknav_open" : "slicknav_collapsed"
          }`}
          tabIndex="0"
        >
          <span className="slicknav_menutxt"></span>
          <span className="slicknav_icon slicknav_no-text">
            <span className="slicknav_icon-bar"></span>
            <span className="slicknav_icon-bar"></span>
            <span className="slicknav_icon-bar"></span>
          </span>
        </a>
        <div id="slicknav-mobile">
          <div className="slicknav_menu">
            <ul
              className="slicknav_nav"
              style={{ display: expandNav ? "block" : "none" }}
              role="menu"
            >
              <li
                onClick={toggleNavbar}
                className={activeLink === "/" ? "active" : null}
              >
                <Link to="/" role="menuitem" tabIndex="0">
                  Home
                </Link>
              </li>
              <li
                onClick={toggleNavbar}
                className={activeLink === "/photos" ? "active" : null}
              >
                <Link to="/photos" role="menuitem" tabIndex="0">
                  View Photos
                </Link>
              </li>
              <li
                onClick={toggleNavbar}
                className={activeLink === "/blog" ? "active" : null}
              >
                <Link to="/blog" role="menuitem" tabIndex="0">
                  Blog
                </Link>
              </li>
              <li
                onClick={toggleNavbar}
                className={activeLink === "/contact" ? "active" : null}
              >
                <Link to="/contact" role="menuitem" tabIndex="0">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  authPhotographer: state.authPhotographer,
});

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  authPhotographer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  logoutPhotographer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout, logoutPhotographer })(
  withRouter(Header)
);
