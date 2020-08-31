import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SectionTitle from "./SectionTitle";
import Spinner1 from "../layout/Spinner1";
import ClearFix from "../layout/ClearFix";
import ItemCaption from "../layout/ItemCaption";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SearchPhoto = ({
  match,
  photo: { searchedPhotos, searchedPhotosLoading },
}) => {
  return (
    <Fragment>
      <ClearFix />
      <div className="content-wrapper">
        <div className="container">
          <div className="section-sm">
            <SectionTitle title={`Results `} />
            <div className="filter-sm-wrapper">
              <div className="row">
                <div className="col-xs-12 col-sm-3 col-md-4 mb-10">
                  <div className="result-count">
                    {searchedPhotos.length}{" "}
                    {searchedPhotos.length === 1
                      ? "item"
                      : searchedPhotos.length === 0
                      ? "items"
                      : "items"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-images flex-image category-item-wrapper">
              {searchedPhotosLoading && searchedPhotos.length <= 0 ? (
                <Spinner1 />
              ) : !searchedPhotosLoading && searchedPhotos.length === 0 ? (
                <h2>Oops!!! no results for {`"${match.params.content}"`}</h2>
              ) : (
                <Fragment>
                  {searchedPhotos.map(
                    ({ _id, title, photoImage, views, likes }) => (
                      <div key={_id} className="item imgItem">
                        <Link to={`/photos/${_id}`} title={title}>
                          <img
                            alt={title}
                            src={photoImage.split("&#x2F;").join("/")}
                          />
                        </Link>
                        <ItemCaption likes={likes} views={views} id={_id} />
                      </div>
                    )
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SearchPhoto.propTypes = {
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

export default connect(mapStateToProps, null)(SearchPhoto);
