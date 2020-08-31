import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner1 from "../layout/Spinner1";
import { getPhotosCategory } from "../../actions/photo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SectionTitle = ({
  title,
  getPhotosCategory,
  photo: { categories, categoriesLoading },
}) => {
  useEffect(() => {
    getPhotosCategory();
  }, [getPhotosCategory]);
  return (
    <div className="section-title photoTitle">
      <h3 className="uppercase">
        <i className="fa fa-pie-chart mr-5"></i>
        <span className="font600">{title}</span>Photos & Vectors
      </h3>
      <p className="uppercase">
        <span className="font700 mr-10">Popular Categories: </span>
        {categoriesLoading ? (
          <Spinner1 />
        ) : (
          <Fragment>
            {categories.map(({ _id, category }) => (
              <Link key={_id} to={`/photos/categories/${category}`}>
                {category}
              </Link>
            ))}
          </Fragment>
        )}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

SectionTitle.propTypes = {
  photo: PropTypes.object.isRequired,
  getPhotosCategory: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { getPhotosCategory })(SectionTitle);
