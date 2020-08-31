import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import SectionTitle from "./SectionTitle";
import Spinner1 from "../layout/Spinner1";
import ItemCaption from "../layout/ItemCaption";
import ClearFix from "../layout/ClearFix";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPhotos } from "../../actions/photo";

const AllPhotos = ({ photo: { photos, loading }, getPhotos }) => {
  useEffect(() => {
    getPhotos();
  }, [getPhotos]);
  return (
    <Fragment>
      <ClearFix />
      <div className="content-wrapper">
        <div className="container">
          <div className="section-sm">
            <SectionTitle />
            <div className="filter-sm-wrapper">
              <div className="row">
                <div className="col-xs-12 col-sm-3 col-md-4 mb-10">
                  <div className="result-count">
                    {photos.length}{" "}
                    {photos.length === 1
                      ? "item"
                      : photos.length === 0
                      ? "items"
                      : "items"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-images flex-image category-item-wrapper">
              {loading ? (
                <Spinner1 />
              ) : (
                <Fragment>
                  {photos.map(({ _id, title, photoImage, views, likes }) => (
                    <div key={_id} className="item imgItem">
                      <Link
                        to={photoImage.split("&#x2F;").join("/")}
                        title={title}
                      >
                        <img
                          alt={title}
                          src={photoImage.split("&#x2F;").join("/")}
                        />
                      </Link>
                      <ItemCaption likes={likes} views={views} id={_id} />
                    </div>
                  ))}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AllPhotos.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

export default connect(mapStateToProps, { getPhotos })(AllPhotos);
