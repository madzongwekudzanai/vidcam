import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authenticateUser } from "../../actions/auth";

const Success = ({ auth: { loading, user }, authenticateUser, match }) => {
  useEffect(() => {
    authenticateUser(match.params.token);
    localStorage.setItem("token", match.params.token);
  }, [authenticateUser, match.params.token]);
  return (
    <Fragment>
      {loading ? (
        <div className="text-center">
          <span className="spinner-grow" role="status"></span> Loading...
        </div>
      ) : (
        !loading && user !== null && <Redirect to="/" />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Success.propTypes = {
  auth: PropTypes.object.isRequired,
  authenticateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  authenticateUser,
})(Success);
