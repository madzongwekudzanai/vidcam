import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import imageBg from "../layout/background/image-bg-01.jpg";

const PhotoSign = ({
  authPhotographer: {
    photographerIsAuthenticated,
    photographerLoading,
    photographer,
  },
}) => {
  return (
    <div
      className="image-bg-wrapper image-bg-promo"
      style={{ backgroundImage: `url(${imageBg})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-7">
            {!photographerLoading && photographer !== null ? (
              <Fragment>
                {photographerIsAuthenticated ? (
                  <Fragment>
                    <h1>Welcome {photographer.name}! Start sharing photos</h1>
                    <p>
                      Residence certainly elsewhere something she preferred
                      cordially law. Age his surprise formerly mrs perceive few
                      stanhill moderate. Of in power match on truth worse voice
                      would.
                    </p>
                    <Link to="/dashboard" className="btn btn-dark">
                      Go to dashboard
                    </Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h1>Are you photographer? Join to earn money</h1>
                    <p>
                      Residence certainly elsewhere something she preferred
                      cordially law. Age his surprise formerly mrs perceive few
                      stanhill moderate. Of in power match on truth worse voice
                      would.
                    </p>
                    <Link to="/registerPhotographer" className="btn btn-dark">
                      Sign-up for free
                    </Link>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <h1>Are you photographer? Join to earn money</h1>
                <p>
                  Residence certainly elsewhere something she preferred
                  cordially law. Age his surprise formerly mrs perceive few
                  stanhill moderate. Of in power match on truth worse voice
                  would.
                </p>
                <Link to="/registerPhotographer" className="btn btn-dark">
                  Sign-up for free
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authPhotographer: state.authPhotographer,
});

PhotoSign.propTypes = {
  authPhotographer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(PhotoSign);
