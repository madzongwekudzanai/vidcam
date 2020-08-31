import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getPhotosCategory } from "../../../actions/photo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GridTitle from "./GridTitle";
import Spinner1 from "../Spinner1";

const Searches = ({
  getPhotosCategory,
  photo: { categories, categoriesLoading },
}) => {
  useEffect(() => {
    getPhotosCategory();
  }, [getPhotosCategory]);
  return (
    <div className="col-xs-12 col-sm-12 col-lg-4 mb-30">
      <GridTitle title="Top Categories" link="/photos" />
      <div className="row gap-10 category-item-wrapper">
        {categoriesLoading ? (
          <Spinner1 />
        ) : !categoriesLoading && categories.length === 0 ? (
          <p>
            No categories available, <Link to="/upload">upload photos.</Link>
          </p>
        ) : (
          <Fragment>
            {categories.map(({ _id, category, photoImage }) => (
              <div key={_id} className="col-xs-12 col-xs-6 col-sm-4 col-md-6">
                <div
                  className="category-image-bg sm"
                  style={{ backgroundImage: `url(/photo/${photoImage})` }}
                >
                  <Link to={`/photos/categories/${category}`}>
                    <span className="text">{category}</span>
                  </Link>
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

Searches.propTypes = {
  photo: PropTypes.object.isRequired,
  getPhotosCategory: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPhotosCategory })(Searches);
