import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Modal } from "react-bootstrap";

const SignIn = ({ auth: { isAuthenticated }, login }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(email, password);
    setLoading(false);
  };

  return (
    <Fragment>
      {isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Modal.Dialog className="mt-xl-5 mt-lg-5">
          <Modal.Header>
            <Modal.Title>Log in to your account</Modal.Title>
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
                    placeholder="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled={loading ? true : false}
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    placeholder="password"
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row subBtn mb-5">
                <button
                  disabled={loading ? true : false}
                  type={loading ? "button" : "submit"}
                  className="btn mx-3 btn-facebook btn-block"
                >
                  {!loading ? (
                    <Fragment>Sign-in with your Email</Fragment>
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
            <div className="text-left pt-5">
              Forgot your password?{" "}
              <Link
                style={{
                  color: "#3b5998",
                  fontWeight: "bolder",
                }}
                to="/reset"
              >
                Reset
              </Link>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      )}
    </Fragment>
  );
};

SignIn.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(SignIn);
