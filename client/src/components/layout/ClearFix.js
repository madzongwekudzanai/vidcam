import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { searchPhotos } from "../../actions/photo";

const ClearFix = ({ searchPhotos, photo: { searchedPhotosLoading } }) => {
  const history = useHistory();
  const [content, setContent] = useState("");

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchPhotos(content);
          if (!searchedPhotosLoading) {
            history.push(`/photos/searchResults/${content}`);
          }
          setContent("");
        }}
        className="clearfix headCleafix"
      >
        <div className="breadcrumb-wrapper breadcrumb-form">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mb-20-sm">
                <div className="input-group-search-form-wrapper">
                  <div className="input-group bg-change-focus-addclass">
                    <input
                      type="text"
                      required
                      value={content}
                      name="content"
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      className="form-control"
                      placeholder="Search for photos"
                    />
                    <div className="input-group-btn dropdown-select">
                      <div className="dropdown dropdown-select">
                        <button
                          className="btn dropdown-toggle"
                          type="button"
                          id="mainSearchDropdown"
                        >
                          All Stock
                        </button>
                      </div>
                    </div>
                    <div className="input-group-btn">
                      <button type="submit" className="btn btn-primary">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

ClearFix.propTypes = {
  photo: PropTypes.object.isRequired,
  searchPhotos: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { searchPhotos })(ClearFix);
