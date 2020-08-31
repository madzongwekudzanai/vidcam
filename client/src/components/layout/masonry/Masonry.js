import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNumberedPosts } from "../../../actions/post";
import MasonryTitle from "./MasonryTitle";
import Spinner1 from "../Spinner1";
import ItemCaption from "../ItemCaption";
import { Link } from "react-router-dom";
import "./style.css";

const Masonry = ({
  getNumberedPosts,
  post: { numberedPosts, numberedPostsLoading },
}) => {
  useEffect(() => {
    getNumberedPosts(-1, 18);
  }, [getNumberedPosts]);
  return (
    <div className="section">
      <div className="container masCont">
        <MasonryTitle />
        {numberedPostsLoading ? (
          <Spinner1 />
        ) : !numberedPostsLoading && numberedPosts.length === 0 ? (
          <p className="text-center">
            There are no photos yet, <Link to="/upload">upload.</Link>
          </p>
        ) : (
          <div className="flex-images flex-image category-item-wrapper">
            {numberedPosts.map(({ _id, title, photoImage, views, likes }) => (
              <div key={_id} className="item imgItem">
                <Link to={`/photos/${_id}`} title={title}>
                  <img
                    className="masImg"
                    alt={title}
                    src={photoImage.split("&#x2F;").join("/")}
                  />
                </Link>
                <ItemCaption likes={likes} views={views} id={_id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

Masonry.propTypes = {
  post: PropTypes.object.isRequired,
  getNumberedPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getNumberedPosts })(Masonry);
