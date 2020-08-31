import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authenticatePhotographer } from "../../actions/authPhotographer";

const PhotographerSuccess = ({
  authPhotographer: { photographerLoading, photographer },
  authenticatePhotographer,
  match,
}) => {
  useEffect(() => {
    authenticatePhotographer(match.params.token);
    localStorage.setItem("photographerToken", match.params.token);
  }, [authenticatePhotographer, match.params.token]);
  return (
    <Fragment>
      {photographerLoading ? (
        <div className="text-center">
          <span className="spinner-grow" role="status"></span> Loading...
        </div>
      ) : (
        !photographerLoading && photographer !== null && <Redirect to="/" />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  authPhotographer: state.authPhotographer,
});

PhotographerSuccess.propTypes = {
  authPhotographer: PropTypes.object.isRequired,
  authenticatePhotographer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  authenticatePhotographer,
})(PhotographerSuccess);
