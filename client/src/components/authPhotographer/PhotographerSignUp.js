import React, { useState, Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

const PhotographerSignUp = ({
  setAlert,
  authPhotographer: { photographerIsAuthenticated },
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== password2) {
      setLoading(false);
      setAlert("Passwords do not match", "danger", 10000);
    } else {
      try {
        await axios.post("/api/users/photographer", {
          name,
          email,
          password,
        });
        setLoading(false);
        setAlert("Account created, please verify your email", "success", 10000);
        setFormData({
          ...formData,
          name: "",
          email: "",
          password: "",
          password2: "",
        });
      } catch (err) {
        setLoading(false);
        setAlert("Invalid credentials", "danger");
      }
    }
  };
  return (
    <Fragment>
      {photographerIsAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Modal.Dialog className="mt-xl-5 mt-lg-5">
          <Modal.Header>
            <Modal.Title>Want to become a photographer</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="pb-5">
                <div className="form-group">
                  <input
                    disabled={loading ? true : false}
                    required
                    value={name}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter your name..."
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled={loading ? true : false}
                    required
                    value={email}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email..."
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled={loading ? true : false}
                    required
                    value={password}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password..."
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled={loading ? true : false}
                    required
                    value={password2}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    type="password"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm your password"
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
                    <Fragment>Create your account</Fragment>
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
              Already a photographer?{" "}
              <Link
                style={{
                  color: "#3b5998",
                  fontWeight: "bolder",
                }}
                to="/loginPhotographer"
              >
                Sign-in
              </Link>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      )}
    </Fragment>
  );
};

PhotographerSignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  authPhotographer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authPhotographer: state.authPhotographer,
});

export default connect(mapStateToProps, { setAlert })(PhotographerSignUp);
