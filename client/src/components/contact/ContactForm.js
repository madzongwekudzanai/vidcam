import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import axios from "axios";

const ContactForm = ({ setAlert }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { name, email, subject, message } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/contact", {
        name,
        email,
        subject,
        message,
      });
      setLoading(false);
      setAlert("Thank you, your email has been sent", "success", 10000);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      setAlert("Sorry, something went wrong", "danger");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <div className="row">
        <div className="col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
          <div className="controls">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="form_name">
                    Your Name{" "}
                    <span className="font10 text-danger">(required)</span>
                  </label>
                  <input
                    onChange={(e) => {
                      onChange(e);
                    }}
                    required
                    disabled={loading ? true : false}
                    value={name}
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Please enter your full name *"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="form_email">
                    Your Email{" "}
                    <span className="font10 text-danger">(required)</span>
                  </label>
                  <input
                    onChange={(e) => {
                      onChange(e);
                    }}
                    required
                    disabled={loading ? true : false}
                    value={email}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Please enter your email *"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12">
                <div className="form-group">
                  <label>
                    Subject{" "}
                    <span className="font10 text-danger">(required)</span>
                  </label>
                  <input
                    onChange={(e) => {
                      onChange(e);
                    }}
                    required
                    disabled={loading ? true : false}
                    value={subject}
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Please enter your Subject *"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="form_message">
                    Message{" "}
                    <span className="font10 text-danger">(required)</span>
                  </label>
                  <textarea
                    onChange={(e) => {
                      onChange(e);
                    }}
                    required
                    disabled={loading ? true : false}
                    value={message}
                    type="text"
                    name="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message for me *"
                  ></textarea>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 text-center">
                {loading ? (
                  <button
                    disabled
                    type="button"
                    className="btn btn-primary btn-send mt-10"
                  >
                    <span class="spinner-border" role="status"></span>{" "}
                    Sending...
                  </button>
                ) : (
                  <input
                    className="btn btn-primary btn-send mt-10"
                    type="submit"
                    value="Send message"
                  />
                )}
              </div>
              <div className="col-md-12 text-center">
                <p
                  classNmae="text-muted font12 mt-20"
                  style={{ lineHeight: "1.2" }}
                >
                  <span className="font12 text-danger">*</span> These fields are
                  required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(ContactForm);
