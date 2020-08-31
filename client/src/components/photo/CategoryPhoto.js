import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import SectionTitle from "./SectionTitle";
import Spinner1 from "../layout/Spinner1";
import ClearFix from "../layout/ClearFix";
import ItemCaption from "../layout/ItemCaption";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPhotosByCategory } from "../../actions/photo";

const CategoryPhoto = ({
  match,
  photo: { categoryPhotos, categoryPhotosLoading },
  getPhotosByCategory,
}) => {
  useEffect(() => {
    getPhotosByCategory(match.params.category);
  }, [match.params.category, getPhotosByCategory]);
  return (
    <Fragment>
      <ClearFix />
      <div className="content-wrapper">
        <div className="container">
          <div className="section-sm">
            <SectionTitle title={`${match.params.category} `} />
            <div className="filter-sm-wrapper">
              <div className="row">
                <div className="col-xs-12 col-sm-3 col-md-4 mb-10">
                  <div className="result-count">
                    {categoryPhotos.length}{" "}
                    {categoryPhotos.length === 1
                      ? "item"
                      : categoryPhotos.length === 0
                      ? "items"
                      : "items"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-images flex-image category-item-wrapper">
              {categoryPhotosLoading ? (
                <Spinner1 />
              ) : (
                <Fragment>
                  {categoryPhotos.map(
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

CategoryPhoto.propTypes = {
  getPhotosByCategory: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

export default connect(mapStateToProps, { getPhotosByCategory })(CategoryPhoto);
