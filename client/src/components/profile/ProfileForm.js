import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import TitleHeader from "../layout/TitleHeader";
import { useHistory, Redirect } from "react-router-dom";
import Spinner1 from "../layout/Spinner1";

const ProfileForm = ({
  getCurrentProfile,
  createProfile,
  profile: { singleProfileLoading },
  authPhotographer: { photographerLoading, photographer },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  const history = useHistory();
  const [scale, setScale] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };
  const [formData, setFormData] = useState({
    website: "",
    location: "",
    bio: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });
  const { website, location, twitter, bio, facebook, instagram } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const canvas = document.getElementById("creatProd").childNodes[0];
    const dataURL = canvas.toDataURL();
    let obj = {};
    obj.profileImage = dataURL;
    obj.website = website;
    obj.location = location;
    obj.twitter = twitter;
    obj.bio = bio;
    obj.facebook = facebook;
    obj.instagram = instagram;
    createProfile(obj, history);
  };

  return (
    <Fragment>
      <TitleHeader title="Create Profile" pageTitle="Profile" />
      {photographerLoading || singleProfileLoading ? (
        <Spinner1 />
      ) : !photographerLoading && photographer === null ? (
        <Redirect to="/registerPhotographer" />
      ) : (
        <div className="content-wrapper pt-50 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
                <div className="section-title">
                  <h2>Create your profile</h2>
                </div>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <div className="row">
                <div style={{ margin: "auto" }}>
                  <div id="creatProd" style={{ display: !imageUrl && "none" }}>
                    <AvatarEditor
                      image={imageUrl}
                      width={80}
                      height={80}
                      scale={scale}
                      rotate={0}
                      border={0}
                    />
                  </div>
                  {imageUrl && "enlarge: "}
                  <input
                    style={{ display: !imageUrl && "none" }}
                    onChange={(e) => handleScale(e)}
                    type="range"
                    disabled={singleProfileLoading}
                    min="1"
                    max="2"
                    value={scale}
                    step="0.01"
                  />
                  <br />
                  <div className="form-group">
                    <label htmlFor="image">
                      {imageUrl
                        ? "Drag the image to place the profile photo"
                        : "Profile photo (at least 80x80 pixels)"}
                    </label>
                    <br />
                    <input
                      type="file"
                      required
                      name="image"
                      disabled={singleProfileLoading}
                      accept="image/*"
                      onChange={(e) => {
                        setImageUrl(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
                  <div className="controls">
                    <div className="row">
                      <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                          <label htmlFor="form_name">
                            Instagram Username{" "}
                            <span className="font10 text-danger">
                              (required)
                            </span>
                          </label>
                          <input
                            type="text"
                            name="instagram"
                            value={instagram}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            className="form-control"
                            placeholder="Please enter your instagram username *"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                          <label htmlFor="form_name">
                            Twitter Username{" "}
                            <span className="font10 text-danger">
                              (required)
                            </span>
                          </label>
                          <input
                            type="text"
                            name="twitter"
                            value={twitter}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            className="form-control"
                            placeholder="Please enter your twitter username *"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                          <label htmlFor="form_name">
                            Facebook Username{" "}
                            <span className="font10 text-danger">
                              (required)
                            </span>
                          </label>
                          <input
                            type="text"
                            name="facebook"
                            value={facebook}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            className="form-control"
                            placeholder="Please enter your facebook username *"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                          <label htmlFor="form_name">Your website </label>
                          <input
                            type="text"
                            name="website"
                            value={website}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            className="form-control"
                            placeholder="Leave blank if you don't have a website"
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="form_email">
                            Your Location{" "}
                            <span className="font10 text-danger">
                              (required)
                            </span>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => {
                              onChange(e);
                            }}
                            name="location"
                            value={location}
                            className="form-control"
                            placeholder="Please enter your location *"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="form_message">
                            Bio{" "}
                            <span className="font10 text-danger">
                              (required)
                            </span>
                          </label>
                          <textarea
                            type="text"
                            name="bio"
                            value={bio}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            className="form-control"
                            rows="4"
                            placeholder="Tell us a little bit about yourself *"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 text-center">
                        <input
                          className="btn btn-primary btn-send mt-10"
                          type="submit"
                          value="Create profile"
                        />
                      </div>
                      <div className="col-md-12 text-center">
                        <p
                          className="text-muted font12 mt-20"
                          style={{ lineHeight: "1.2" }}
                        >
                          <span className="font12 text-danger">*</span> These
                          fields are required.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  authPhotographer: state.authPhotographer,
});

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  authPhotographer: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
