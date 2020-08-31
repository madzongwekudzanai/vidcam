import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLatestPosts } from "../../../actions/post";
import SidebarTitle from "./SidebarTitle";
import Spinner1 from "../../layout/Spinner1";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const LatestPosts = ({
  getLatestPosts,
  post: { latestPosts, loadingLatestPosts },
}) => {
  useEffect(() => {
    getLatestPosts();
  }, [getLatestPosts]);
  return (
    <div className="sidebar-module">
      <SidebarTitle title="Latest Posts" />
      <div className="sidebar-module-inner">
        <ul className="sidebar-post">
          {loadingLatestPosts ? (
            <Spinner1 />
          ) : (
            <Fragment>
              {latestPosts.map(({ _id, blogImage, title, date }) => (
                <li className="clearfix" key={_id}>
                  <Link to={`/blog/${_id}`}>
                    <div className="image">
                      <img src={`/blog/${blogImage}`} alt={title} />
                    </div>
                    <div className="content">
                      <h3 className="two-trunk">{title}</h3>
                      <p className="sidebar-post-meta">
                        <i className="fa fa-clock-o mr-5"></i>
                        <Moment format="MMMM DD, YYYY">{date}</Moment>
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

LatestPosts.propTypes = {
  post: PropTypes.object.isRequired,
  getLatestPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getLatestPosts })(LatestPosts);
