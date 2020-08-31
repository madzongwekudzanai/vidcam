import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner1 from "../layout/Spinner1";

const MessagePhotographer = ({
  match,
  setAlert,
  auth: { user, isAuthenticated, loading },
}) => {
  const [data, setData] = useState("");
  useEffect(() => {
    const getEmail = async () => {
      const email = await axios.get(
        `/api/auth/photographer/${match.params.id}`
      );
      setData(email.data);
    };
    getEmail();
  }, [match.params.id]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await axios.post("/api/contact/message", {
        email: data,
        message,
      });
      setBtnLoading(false);
      setAlert(
        `Message was successfully sent to ${user.name}`,
        "success",
        10000
      );
      setMessage("");
    } catch (err) {
      setBtnLoading(false);
      setAlert("Something went wrong", "danger");
    }
  };
  return (
    <Modal.Dialog className="mt-xl-5 mt-lg-5">
      {loading || data === "" ? (
        <Spinner1 />
      ) : !loading && !isAuthenticated ? (
        <Redirect to="/register" />
      ) : (
        <Fragment>
          <Modal.Header>
            <Modal.Title>Send message to {user.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="pb-5">
                <div className="form-group">
                  <textarea
                    disabled={btnLoading ? true : false}
                    name="message"
                    type="message"
                    value={message}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    required
                    rows="6"
                    className="form-control"
                    placeholder={`Send a message to ${user.name}`}
                  ></textarea>
                </div>
              </div>
              <div className="row mb-5">
                <button
                  disabled={btnLoading ? true : false}
                  type={btnLoading ? "button" : "submit"}
                  className="btn mx-3 btn-facebook btn-block"
                >
                  {!btnLoading ? (
                    <Fragment>Send message</Fragment>
                  ) : (
                    <Fragment>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>{" "}
                      sending...
                    </Fragment>
                  )}
                </button>
              </div>
            </form>
          </Modal.Body>
        </Fragment>
      )}
    </Modal.Dialog>
  );
};

MessagePhotographer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(MessagePhotographer);
