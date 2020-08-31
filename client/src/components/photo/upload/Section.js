import React, { useState, useEffect, Fragment } from "react";
import AvatarEditor from "react-avatar-editor";
import PropTypes from "prop-types";
import { useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addPhoto, getPhotosCategory } from "../../../actions/photo";
import { getCurrentProfile } from "../../../actions/profile";
import Spinner1 from "../../layout/Spinner1";
import TitleHeader from "../../layout/TitleHeader";

const Section = ({
  addPhoto,
  getCurrentProfile,
  getPhotosCategory,
  photo: { categories, categoriesLoading },
  profile: { singleProfileLoading, singleProfile },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getPhotosCategory();
    setFormData({
      category: "Nature",
    });
  }, [getPhotosCategory, getCurrentProfile]);
  const history = useHistory();
  const [scale, setScale] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    keywords: "",
  });
  const { title, category, keywords } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const canvas = document.getElementById("creatProd").childNodes[0];
    const dataURL = canvas.toDataURL();
    let obj = {};
    obj.photoImage = dataURL;
    obj.title = title;
    obj.category = category;
    obj.keywords = keywords;
    addPhoto(obj, history);
  };
  return (
    <Fragment>
      <TitleHeader title="Upload Photo" pageTitle="Upload" />
      <div className="content-wrapper">
        <div className="container">
          <div className="section-sm">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                {singleProfileLoading && singleProfile === null ? (
                  <Spinner1 />
                ) : !singleProfileLoading && singleProfile === null ? (
                  <Redirect to="/createProfile" />
                ) : (
                  <Fragment>
                    <div className="section-title mb-10">
                      <h4 className="text-left">Upload Photo</h4>
                    </div>
                    <p>
                      Ignorant saw her her drawings marriage laughter. Case oh
                      an that or away sigh do here upon. Acuteness you exquisite
                      ourselves now end forfeited. Enquire ye without it garrets
                      up himself.
                    </p>
                    <hr />
                    {categoriesLoading ? (
                      <Spinner1 />
                    ) : (
                      <form
                        onSubmit={(e) => {
                          onSubmit(e);
                        }}
                        className="mb-20"
                      >
                        <div className="row">
                          <div style={{ margin: "auto" }}>
                            <div
                              id="creatProd"
                              style={{ display: !imageUrl && "none" }}
                            >
                              <AvatarEditor
                                image={imageUrl}
                                width={1920}
                                height={1440}
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
                              disabled={categoriesLoading}
                              min="1"
                              max="2"
                              value={scale}
                              step="0.01"
                            />
                            <br />
                            <div className="form-group">
                              <label htmlFor="image">
                                {imageUrl
                                  ? "Drag the image to position"
                                  : "Photo (at least 1920x1440 pixels)"}
                              </label>
                              <br />
                              <input
                                type="file"
                                required
                                name="image"
                                disabled={categoriesLoading}
                                accept="image/*"
                                onChange={(e) => {
                                  setImageUrl(e.target.files[0]);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12">
                            <div className="form-group">
                              <label>Title:</label>
                              <input
                                type="text"
                                onChange={(e) => {
                                  onChange(e);
                                }}
                                placeholder="Enter Title..."
                                className="form-control"
                                name="title"
                                value={title}
                              ></input>
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12">
                            <div className="form-group">
                              <select
                                onChange={(e) => {
                                  onChange(e);
                                }}
                                name="category"
                                required
                                value={category}
                              >
                                <option value="" disabled selected>
                                  Select a category
                                </option>
                                {categories.map((cat) => (
                                  <option
                                    className="text-capitalize"
                                    value={cat.category}
                                  >
                                    {cat.category}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12">
                            <div className="form-group">
                              <label>Keyword:</label>
                              <input
                                onChange={(e) => {
                                  onChange(e);
                                }}
                                required
                                maxLength="15"
                                value={keywords}
                                name="keywords"
                                type="text"
                                placeholder="Keyword should be at most 2 words"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <button
                              type="submit"
                              className="btn btn-success btn-md"
                            >
                              Save
                            </button>
                          </div>
                          <div className="col-6">
                            <button
                              onClick={() => {
                                history.goBack();
                              }}
                              className="btn btn-warning btn-md"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    <hr />
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  photo: state.photo,
  profile: state.profile,
});

Section.propTypes = {
  photo: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getPhotosCategory: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getCurrentProfile,
  getPhotosCategory,
  addPhoto,
})(Section);
