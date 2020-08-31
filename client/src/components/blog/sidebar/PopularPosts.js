import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPopularPosts } from "../../../actions/post";
import SidebarTitle from "./SidebarTitle";
import Spinner1 from "../../layout/Spinner1";
import { Link } from "react-router-dom";

const PopularPosts = ({
  getPopularPosts,
  post: { popularPosts, loadingPopularPosts },
}) => {
  useEffect(() => {
    getPopularPosts();
  }, [getPopularPosts]);
  return (
    <div className="sidebar-module">
      <SidebarTitle title="Popular Posts" />
      <div className="sidebar-module-inner">
        <ul className="sidebar-post no-image">
          {loadingPopularPosts ? (
            <Spinner1 />
          ) : (
            <Fragment>
              {popularPosts.map(({ _id, title, comments }) => (
                <li className="clearfix" key={_id}>
                  <Link to={`/blog/${_id}`}>
                    <div className="content">
                      <h3 className="two-trunk">{title}</h3>
                      <p className="sidebar-post-meta">
                        <i className="fa fa-comments mr-5"></i>
                        {comments.length} Comments
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </Fragment>
          )}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

PopularPosts.propTypes = {
  post: PropTypes.object.isRequired,
  getPopularPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPopularPosts })(PopularPosts);
