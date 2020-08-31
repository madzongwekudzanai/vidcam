import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner1 from "../layout/Spinner1";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import TitleHeader from "../layout/TitleHeader";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { getPhotographerPhotos } from "../../actions/photo";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import PhotographerPhotos from "../photo/PhotographerPhotos";
import "./style.css";

const Dashboard = ({
  photo: { photographerPhotos, photographerPhotosLoading },
  authPhotographer: { photographerLoading, photographer },
  getCurrentProfile,
  deleteAccount,
  getPhotographerPhotos,
  profile: { singleProfile, singleProfileLoading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getPhotographerPhotos();
  }, [getCurrentProfile, getPhotographerPhotos]);
  const history = useHistory();
  return (
    <Fragment>
      <TitleHeader title="Dashboard" pageTitle="Dashboard" />
      {photographerLoading || singleProfileLoading ? (
        <Spinner1 />
      ) : !photographerLoading && photographer === null ? (
        <Redirect to="/registerPhotographer" />
      ) : !singleProfileLoading && singleProfile === null ? (
        <Redirect to="/createProfile" />
      ) : (
        <Fragment>
          <Container className="mt-2">
            <Row className="col-sm-offset-3 col-lg-offset-2 col-md-offset-2">
              <Col sm={2} xs={3} lg={2}>
                <Image
                  roundedCircle
                  src={
                    singleProfile.profileImage !== null
                      ? singleProfile.profileImage.split("&#x2F;").join("/")
                      : singleProfile.avatar
                  }
                  alt={singleProfile.name}
                />
              </Col>
              <Col sm={10} xs={9} lg={10}>
                <Row>
                  <h2 className="mr-4">{singleProfile.name}</h2>
                  <span>
                    <Button
                      onClick={() => {
                        history.push("/editProfile");
                      }}
                      className="mr-2 profBtn"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        deleteAccount();
                        history.push("/");
                      }}
                      variant="danger"
                      size="sm profBtn"
                    >
                      Delete
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
                    <strong>{photographerPhotos.length}</strong>{" "}
                    <small>
                      {photographerPhotos.length === 1
                        ? "Photo"
                        : photographerPhotos.length === 0
                        ? "Photos"
                        : "Photos"}
                    </small>
                  </span>
                </Row>
              </Col>
            </Row>
          </Container>
          <PhotographerPhotos
            photos={photographerPhotos}
            loading={photographerPhotosLoading}
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
  photo: state.photo,
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPhotographerPhotos: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  authPhotographer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getPhotographerPhotos,
})(Dashboard);
