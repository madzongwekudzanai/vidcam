import React, { useEffect, Fragment } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addLike,
  removeLike,
  viewPhoto,
  getViewStatus,
  getLikeStatus,
  getPhoto,
  deletePhoto,
} from "../../actions/photo";
import { getCurrentProfile } from "../../actions/profile";
import Moment from "react-moment";
import Spinner1 from "../layout/Spinner1";
import { Link, useHistory } from "react-router-dom";
import ClearFix from "../layout/ClearFix";

const PhotoDetail = ({
  auth: { isAuthenticated, loading },
  match,
  addLike,
  removeLike,
  deletePhoto,
  getCurrentProfile,
  getViewStatus,
  getLikeStatus,
  viewPhoto,
  getPhoto,
  photo: { singlePhoto, viewStatusLoading, likeStatus, likeStatusLoading },
  profile: { singleProfile, singleProfileLoading },
}) => {
  const history = useHistory();
  useEffect(() => {
    getCurrentProfile();
    getPhoto(match.params.id);
    getViewStatus(match.params.id);
    getLikeStatus(match.params.id);
    viewPhoto(match.params.id);
  }, [
    likeStatusLoading,
    viewStatusLoading,
    match.params.id,
    getViewStatus,
    getLikeStatus,
    getCurrentProfile,
    getPhoto,
    viewPhoto,
  ]);

  if (singlePhoto === null) {
    return <Spinner1 />;
  }

  return (
    <Fragment>
      <ClearFix />
      {singleProfileLoading || loading || singlePhoto === null ? (
        <Spinner1 />
      ) : (
        <div className="content-wrapper">
          <div className="detail-wrapper">
            <div className="container">
              <div className="section-sm">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-lg-3">
                    <div className="row gap-20">
                      <div className="col-xs-12 col-sm-6 col-lg-12 mb-30-sm">
                        <h3 className="detail-title one-trunk">
                          Photo: {singlePhoto.photo.title}
                        </h3>
                        <p className="detail-meta">
                          / Photo ID: {singlePhoto.photo._id}{" "}
                        </p>
                        <p className="detail-meta">
                          / Uploaded date:{" "}
                          <Moment format="MMMM DD, YYYY">
                            {singlePhoto.photo.date}
                          </Moment>{" "}
                        </p>
                        <div className="detail-person clearfix">
                          <div className="image">
                            <img
                              src={singlePhoto.photo.avatar}
                              alt={singlePhoto.photo.name}
                              className="img-circle"
                            />
                          </div>
                          <div className="content">
                            Photo by:
                            <Link
                              to={`/profiles/${singlePhoto.photo.user}`}
                              className="block"
                            >
                              {singlePhoto.photo.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-lg-12 mb-30-sm">
                        <div className="detail-sm-section">
                          <h4>Categories:</h4>
                          {singlePhoto.photo.category !== null && (
                            <Fragment>
                              <Link
                                to={`/photos/categories/${singlePhoto.photo.category}`}
                                className="detail-collection"
                              >
                                {singlePhoto.photo.category}
                              </Link>{" "}
                            </Fragment>
                          )}
                        </div>
                        <div className="detail-sm-section">
                          <h4>Keywords:</h4>
                          <Link
                            to={`/photos/searchResults/${singlePhoto.photo.keywords}`}
                            className="detail-keyword"
                          >
                            {singlePhoto.photo.keywords}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-lg-9">
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-lg-7 mb-30-sm">
                        <div className="detail-image">
                          <img
                            src={singlePhoto.photo.photoImage
                              .split("&#x2F;")
                              .join("/")}
                            alt={singlePhoto.photo.title}
                          />
                          {singleProfile !== null &&
                          singleProfile.user === singlePhoto.photo.user ? (
                            <Link
                              onClick={() => {
                                deletePhoto(match.params.id, history);
                              }}
                              className="btn btn-danger btn-send btn-md mt-10"
                            >
                              Delete
                            </Link>
                          ) : (
                            <div className="social-share clearfix">
                              {likeStatus.length === 0 ? (
                                <a
                                  onClick={() => {
                                    if (!isAuthenticated) {
                                      history.push("/register");
                                    }
                                    addLike(match.params.id);
                                  }}
                                >
                                  <span className="block">
                                    <i className="fas fa-thumbs-up"></i>
                                  </span>
                                  like this photo
                                </a>
                              ) : (
                                likeStatus.length > 0 && (
                                  <a
                                    onClick={() => {
                                      if (!isAuthenticated) {
                                        history.push("/register");
                                      }
                                      removeLike(match.params.id);
                                    }}
                                  >
                                    <span className="block">
                                      <i className="fas fa-thumbs-down"></i>
                                    </span>
                                    unlike this photo
                                  </a>
                                )
                              )}
                              <a
                                target="_blank"
                                rel="external nofollow noopener noreferrer"
                                href={`https://facebook.com/${singlePhoto.profile.social.facebook}`}
                                className="social-facebook"
                              >
                                <span className="block">
                                  <i className="fab fa-facebook-square"></i>
                                </span>
                                follow on facebook
                              </a>
                              <a
                                target="_blank"
                                rel="external nofollow noopener noreferrer"
                                href={`https://facebook.com/${singlePhoto.profile.social.facebook}`}
                                className="social-twitter"
                              >
                                <span className="block">
                                  <i className="fab fa-twitter"></i>
                                </span>
                                follow on twitter
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-lg-5">
                        <div className="detail-tab">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="active" role="presentation">
                              <a href="/">Sizes</a>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div
                              role="tabpanel"
                              id="detail-tab-3"
                              className="tab-pane fade active in"
                            >
                              <p className="mb-10">
                                Download a single image based on size
                              </p>
                              <div className="detail-radio-wrapper mb-30">
                                <div className="radio-block">
                                  <input
                                    type="radio"
                                    id="radio_size-1"
                                    name="radio_size"
                                    className="radio"
                                    value="First Choice"
                                    checked
                                  />
                                  <label htmlFor="radio_size-1">
                                    <span className="detail-price-sm">
                                      <span className="block uppercase">
                                        Small
                                      </span>
                                      640 x 427 px | 8.0" x 5.9" @ 72 Dpi image
                                      <span className="price">FREE</span>
                                    </span>
                                  </label>
                                </div>
                                <div className="radio-block">
                                  <input
                                    type="radio"
                                    id="radio_size-1"
                                    name="radio_size"
                                    className="radio"
                                    value="First Choice"
                                  />
                                  <label htmlFor="radio_size-1">
                                    <span className="detail-price-sm">
                                      <span className="block uppercase">
                                        Medium
                                      </span>
                                      640 x 427 px | 8.0" x 5.9" @ 72 Dpi image
                                      <span className="price">FREE</span>
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <PayPalButton
                                amount="0.01"
                                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                onSuccess={(details, data) => {
                                  alert(
                                    "Transaction completed by " +
                                      details.payer.name.given_name
                                  );
                                }}
                                options={{
                                  clientId: "sb",
                                }}
                              />
                              <p className="mb-0 mt-15">
                                Includes our <Link>our standard license</Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  photo: state.photo,
  auth: state.auth,
  profile: state.profile,
});

PhotoDetail.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  viewPhoto: PropTypes.func.isRequired,
  getViewStatus: PropTypes.func.isRequired,
  getLikeStatus: PropTypes.func.isRequired,
  getPhoto: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePhoto,
  viewPhoto,
  getPhoto,
  getCurrentProfile,
  getViewStatus,
  getLikeStatus,
})(PhotoDetail);
