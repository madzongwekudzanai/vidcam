import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner1 from "../layout/Spinner1";
import ItemCaption from "../layout/ItemCaption";
import { connect } from "react-redux";
import { loadPhotographer } from "../../actions/authPhotographer";
import { Link } from "react-router-dom";

const PhotographerPhotos = ({
  photos,
  loading,
  loadPhotographer,
  authPhotographer: { photographerLoading, photographer },
  singleProfile: { user },
}) => {
  useEffect(() => {
    loadPhotographer();
  }, [loadPhotographer]);
  return (
    <Fragment>
      <div className="content-wrapper">
        <div className="container">
          <div className="section-sm">
            <div className="section-title photoTitle">
              <h3 className="uppercase">Photos</h3>
            </div>
            <div className="flex-images flex-image category-item-wrapper">
              {loading ? (
                <Spinner1 />
              ) : !loading && photos.length === 0 ? (
                <Fragment>
                  {photographerLoading ? (
                    <Spinner1 />
                  ) : !photographerLoading && photographer === null ? (
                    <strong className="text-center">No Photos</strong>
                  ) : (
                    !photographerLoading &&
                    user === photographer._id && (
                      <p className="text-center">
                        You haven't uploaded any photos please,{" "}
                        <Link to="/upload">upload.</Link>
                      </p>
                    )
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  {photos.map(({ _id, title, photoImage, views, likes }) => (
                    <div key={_id} className="item imgItem">
                      <Link to={`/photos/${_id}`} title={title}>
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

const mapStateToProps = (state) => ({
  authPhotographer: state.authPhotographer,
});

PhotographerPhotos.propTypes = {
  photos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadPhotographer: PropTypes.func.isRequired,
  singleProfile: PropTypes.object.isRequired,
  authPhotographer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { loadPhotographer })(
  PhotographerPhotos
);
