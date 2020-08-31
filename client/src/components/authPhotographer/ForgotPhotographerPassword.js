import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

const ForgotPhotographerPassword = ({
  setAlert,
  authPhotographer: { photographerIsAuthenticated },
}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/photographer/forgot", {
        email,
      });
      setLoading(false);
      setAlert(
        "Account reset link has been sent to your email",
        "success",
        10000
      );
      setEmail("");
    } catch (err) {
      setLoading(false);
      setAlert("Invalid credentials", "danger");
    }
  };
  return (
    <Fragment>
      {photographerIsAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Modal.Dialog className="mt-xl-5 mt-lg-5">
          <Modal.Header>
            <Modal.Title>Forgot your password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="pb-5">
                <div className="form-group">
                  <input
                    disabled={loading ? true : false}
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    required
                    className="form-control"
                    placeholder="Enter your email..."
                  />
                </div>
              </div>
              <div className="row mb-5">
                <button
                  disabled={loading ? true : false}
                  type={loading ? "button" : "submit"}
                  className="btn mx-3 btn-facebook btn-block"
                >
                  {!loading ? (
                    <Fragment>Reset your account</Fragment>
                  ) : (
                    <Fragment>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>{" "}
                      loading...
                    </Fragment>
                  )}
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal.Dialog>
      )}
    </Fragment>
  );
};

ForgotPhotographerPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  authPhotographer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authPhotographer: state.authPhotographer,
});

export default connect(mapStateToProps, { setAlert })(
  ForgotPhotographerPassword
);
