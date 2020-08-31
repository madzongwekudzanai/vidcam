import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getLatestPosts } from "../../../actions/post";
import Spinner1 from "../Spinner1";

const LatestNews = ({
  getLatestPosts,
  post: { latestPosts, loadingLatestPosts },
}) => {
  useEffect(() => {
    getLatestPosts();
  }, [getLatestPosts]);
  return (
    <div className="col-xs-12 col-sm-12 col-lg-6">
      <h4 className="footer-title">LATEST NEWS</h4>
      <ul className="footer-faq">
        {loadingLatestPosts ? (
          <Spinner1 />
        ) : (
          <Fragment>
            {latestPosts.map(({ _id, title }) => (
              <li key={_id}>
                <Link to={`/blog/${_id}`}>{title}</Link>
              </li>
            ))}
          </Fragment>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

LatestNews.propTypes = {
  getLatestPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getLatestPosts })(LatestNews);
