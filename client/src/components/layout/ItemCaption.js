import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ItemCaption = ({ views, likes, id }) => {
  return (
    <div className="category-item-caption">
      <div className="row gap-0">
        <div className="col-xs-4 col-sm-4">
          <a
            title={`${likes.length} ${
              likes.length === 0
                ? "likes"
                : likes.length === 1
                ? "like"
                : "likes"
            }`}
          >
            <i className="fas fa-heart"></i>
          </a>
        </div>
        <div className="col-xs-4 col-sm-4">
          <a
            title={`${views.length} ${
              views.length === 0
                ? "views"
                : views.length === 1
                ? "view"
                : "views"
            }`}
          >
            <i className="fas fa-eye"></i>
          </a>
        </div>
        <div className="col-xs-4 col-sm-4">
          <Link to={`/photos/${id}`} title="view photo">
            <i className="fas fa-info"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

ItemCaption.propTypes = {
  views: PropTypes.array.isRequired,
  likes: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default ItemCaption;
