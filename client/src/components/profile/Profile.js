import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner1 from "../layout/Spinner1";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import TitleHeader from "../layout/TitleHeader";
import {
  getProfileById,
  getFollowStatus,
  followPhotographer,
  unFollowPhotographer,
} from "../../actions/profile";
import { getPhotosByPhotographer } from "../../actions/photo";
import { loadUser } from "../../actions/auth";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PhotographerPhotos from "../photo/PhotographerPhotos";
import "./style.css";

const Profile = ({
  match,
  photo: { authPhotographerPhotos, authPhotographerPhotosLoading },
  getProfileById,
  getPhotosByPhotographer,
  getFollowStatus,
  loadUser,
  followPhotographer,
  unFollowPhotographer,
  auth: { isAuthenticated, loading },
  profile: {
    singleProfile,
    singleProfileLoading,
    followStatus,
    followStatusLoading,
  },
}) => {
  const paras = match.params.id.split(",");
  const profId = paras[0];
  const userId = paras[1];
  useEffect(() => {
    getProfileById(profId);
    getPhotosByPhotographer(profId);
    loadUser();
    getFollowStatus(userId);
  }, [
    getProfileById,
    getPhotosByPhotographer,
    loadUser,
    getFollowStatus,
    profId,
    userId,
  ]);
  const history = useHistory();

  return (
    <Fragment>
      <TitleHeader title="Profile" pageTitle="Profile" />
      {loading || singleProfileLoading || singleProfile === null ? (
        <Spinner1 />
      ) : (
        <Fragment>
          <Container className="mt-2">
            <Row className="col-sm-offset-3 col-lg-offset-2 col-md-offset-2">
              <Col sm={2} xs={3} lg={2}>
                <Image
                  roundedCircle
                  src={singleProfile.profileImage.split("&#x2F;").join("/")}
                  alt={singleProfile.name}
                />
              </Col>
              <Col sm={10} xs={9} lg={10}>
                <Row>
                  <h2 className="mr-4">{singleProfile.name}</h2>
                  <span>
                    {followStatus.length === 0 ? (
                      <Button
                        disabled={followStatusLoading}
                        onClick={() => {
                          if (!isAuthenticated) {
                            history.push("/register");
                          }
                          followPhotographer(userId);
                          getFollowStatus(userId);
                        }}
                        variant="primary"
                        className="mr-2 profBtn"
                        size="sm"
                      >
                        Follow
                      </Button>
                    ) : (
                      followStatus.length > 0 && (
                        <Button
                          disabled={followStatusLoading}
                          onClick={() => {
                            if (!isAuthenticated) {
                              history.push("/register");
                            }
                            unFollowPhotographer(userId);
                            getFollowStatus(userId);
                          }}
                          variant="primary"
                          className="mr-2 profBtn"
                          size="sm"
                        >
                          Unfollow
                        </Button>
                      )
                    )}

                    <Button
                      disabled={followStatusLoading}
                      onClick={() => {
                        if (!isAuthenticated) {
                          history.push("/register");
                        } else if (isAuthenticated) {
                          history.push(`/message/${profId}`);
                        } else {
                          history.push("/register");
                        }
                      }}
                      variant="info"
                      size="sm profBtn"
                    >
                      Message
                    </Button>
                  </span>
                </Row>
                <Row>
                  <span className="mr-2">
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    {singleProfile.location}
                  </span>
                  <span className="mr-2">
                    <i className="fab fa-instagram"></i>{" "}
                    {singleProfile.social.instagram ? (
                      <Fragment>{singleProfile.social.instagram}</Fragment>
                    ) : null}
                  </span>
                </Row>
                <Row>
                  <span className="mr-2">
                    <strong>{singleProfile.followers.length}</strong>{" "}
                    <small>
                      {singleProfile.followers.length === 1
                        ? "Follower"
                        : singleProfile.followers.length === 0
                        ? "Followers"
                        : "Followers"}
                    </small>
                  </span>
                  <span className="mr-2">
                    <strong>{authPhotographerPhotos.length}</strong>{" "}
                    <small>
                      {authPhotographerPhotos.length === 1
                        ? "Photo"
                        : authPhotographerPhotos.length === 0
                        ? "Photos"
                        : "Photos"}
                    </small>
                  </span>
                </Row>
              </Col>
            </Row>
          </Container>
          <PhotographerPhotos
            photos={authPhotographerPhotos}
            loading={authPhotographerPhotosLoading}
            singleProfile={singleProfile}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  authPhotographer: state.authPhotographer,
  auth: state.auth,
  photo: state.photo,
});

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getPhotosByPhotographer: PropTypes.func.isRequired,
  getFollowStatus: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  followPhotographer: PropTypes.func.isRequired,
  unFollowPhotographer: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  authPhotographer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  getProfileById,
  getPhotosByPhotographer,
  getFollowStatus,
  followPhotographer,
  unFollowPhotographer,
  loadUser,
})(Profile);
