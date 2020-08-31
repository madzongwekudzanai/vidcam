import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getPopularPhotos } from "../../../actions/photo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GridTitle from "./GridTitle";
import Spinner1 from "../Spinner1";
import ItemCaption from "../ItemCaption";

const Photos = ({
  getPopularPhotos,
  photo: { popularPhotos, popularPhotosLoading },
}) => {
  useEffect(() => {
    getPopularPhotos();
  }, [getPopularPhotos]);
  return (
    <div className="col-xs-12 col-sm-12 col-lg-4 mb-30">
      <GridTitle title="Top Photos" link="/photos" />
      <div className="row gap-10 category-item-wrapper">
        {popularPhotosLoading ? (
          <Spinner1 />
        ) : !popularPhotosLoading && popularPhotos.length === 0 ? (
          <p>
            No popular photos available, <Link to="/upload">upload.</Link>
          </p>
        ) : (
          <Fragment>
            {popularPhotos.map(({ _id, photoImage, title, views, likes }) => (
              <div
                key={_id}
                className="col-xss-6 col-xs-4 col-sm-4 col-md-6 mb-10"
              >
                <div className="item sm">
                  <Link to={`/photos/${_id}`} title={title}>
                    <img
                      src={photoImage.split("&#x2F;").join("/")}
                      alt={title}
                    />
                  </Link>
                  <ItemCaption likes={likes} views={views} id={_id} />
                </div>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

Photos.propTypes = {
  photo: PropTypes.object.isRequired,
  getPopularPhotos: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPopularPhotos })(Photos);
