import React, { useState } from "react";
import PropTypes from "prop-types";
import hero from "../background/hero.jpg";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { autoCompletePhotos, searchPhotos } from "../../../actions/photo";

const Hero = ({
  autoCompletePhotos,
  searchPhotos,
  photo: { autocompletePhotos, searchedPhotosLoading },
}) => {
  const history = useHistory();
  const [content, setContent] = useState("");
  return (
    <div style={{ backgroundImage: `url(${hero})` }} className="hero">
      <div className="container">
        <div className="row gap-0">
          <div className="col-md-10 col-md-offset-1">
            <div className="section-title-special">
              <h1>The Best Photos Shared By Talented Photographers</h1>
              <p className="p-title">
                Find everything you need for your creative projects. Download
                instantly.
              </p>
            </div>
          </div>
          <div className="col-md-8 col-md-offset-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchPhotos(content);
                if (!searchedPhotosLoading) {
                  history.push(`/photos/searchResults/${content}`);
                }
                setContent("");
              }}
            >
              <div className="input-group-search-form-wrapper size-lg">
                <div className="input-group bg-change-focus-addclass">
                  <input
                    onChange={(e) => {
                      setContent(e.target.value);
                      autoCompletePhotos(e.target.value);
                    }}
                    type="text"
                    value={content}
                    required
                    className="form-control"
                    placeholder="Search images, footage, vector"
                  />
                  <div className="input-group-btn dropdown-select">
                    <div className="dropdown dropdown-select">
                      <button
                        type="button"
                        id="mainSearchDropdown"
                        className="btn dropdown-toggle"
                      >
                        All Stock
                      </button>
                    </div>
                  </div>
                  <div className="input-group-btn hidden-xss">
                    <button type="submit" className="btn btn-primary">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block bt visible-xss"
                >
                  Search Image
                </button>
              </div>
            </form>
          </div>
          <div
            style={{
              backgroundColor: "white",
              display: `${content !== "" ? "block" : "none"}`,
            }}
            className="col-md-8 col-md-offset-2 hidden-lg hidden-md hidden-sm"
          >
            <div className="container">
              <ul className="autoComplete">
                {autocompletePhotos.map(({ _id, keywords }) => (
                  <li
                    onClick={() => {
                      setContent(keywords);
                      searchPhotos(keywords);
                      if (!searchedPhotosLoading) {
                        history.push(`/photos/searchResults/${keywords}`);
                      }
                    }}
                    key={_id}
                  >
                    <a className="one-trunk">{keywords}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

Hero.propTypes = {
  photo: PropTypes.object.isRequired,
  searchPhotos: PropTypes.func.isRequired,
  autoCompletePhotos: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { searchPhotos, autoCompletePhotos })(
  Hero
);
