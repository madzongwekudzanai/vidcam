import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import TitleHeader from "../layout/TitleHeader";
import Sidebar from "./sidebar/Sidebar";
import Moment from "react-moment";
import Spinner1 from "../layout/Spinner1";
import { Link } from "react-router-dom";

const Blog = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      <TitleHeader title="News & Updates" pageTitle="Blog" />
      <div className="content-wrapper pt-50 pb-20">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-9 mb-30">
              <div className="blog-wrapper">
                {loading ? (
                  <Spinner1 />
                ) : (
                  <Fragment>
                    {posts.map(
                      ({ _id, blogImage, title, category, text, date }) => (
                        <div key={_id} className="blog-item">
                          <div className="blog-media">
                            <div className="overlay-box">
                              <Link to={`/blog/${_id}`} className="blog-image">
                                <img src={`/blog/${blogImage}`} alt={title} />
                                <div className="image-overlay">
                                  <div className="overlay-content">
                                    <div className="overlay-icon">
                                      <i className="fa fa-plus"></i>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="blog-content">
                            <div className="row">
                              <div className="col-xs-12 col-sm-12 col-md-5 mb-20-sm">
                                <h3>
                                  <Link
                                    to={`/blog/${_id}`}
                                    className="inverse two-trunk"
                                  >
                                    {title}
                                  </Link>
                                </h3>
                                <ul className="blog-meta clearfix">
                                  <li>
                                    <div>
                                      <i className="fa fa-user"></i>
                                      <Link to={`/blog/${_id}`}>Admin</Link>
                                    </div>
                                  </li>
                                  <li>
                                    <div>
                                      <i className="fa fa-calendar"></i>
                                      <Link to={`/blog/${_id}`}>
                                        on{" "}
                                        <Moment format="MMMM DD, YYYY">
                                          {date}
                                        </Moment>
                                      </Link>
                                    </div>
                                  </li>
                                  <li>
                                    <div>
                                      <i className="fa fa-folder-open"></i>
                                      {category.split(",").map((cat, index) => (
                                        <Fragment key={index}>
                                          <Link to={`/blog/categories/${cat}`}>
                                            {cat.trim()}
                                          </Link>
                                          {index === 1 ? (
                                            <Fragment></Fragment>
                                          ) : (
                                            <Fragment>{", "}</Fragment>
                                          )}
                                        </Fragment>
                                      ))}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-xs-12 col-sm-12 col-md-7">
                                <div className="blog-entry">
                                  <p className="six-trunk">{text}</p>
                                </div>
                                <Link
                                  to={`/blog/${_id}`}
                                  className="btn btn-primary btn-sm"
                                >
                                  Read More{" "}
                                  <i className="fa fa-long-arrow-right"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </Fragment>
                )}
              </div>
              <div className="clear"></div>
              <div className="pager-wrappper clearfix">
                <div className="pager-innner">
                  <div className="flex-row flex-align-middle">
                    <div className="flex-column flex-sm-12">
                      1 to 15 from 248
                    </div>
                    <div className="flex-column flex-sm-12">
                      <nav className="pager-right">
                        <ul className="pagination">
                          <li>
                            <a href="#">
                              <span>&laquo;</span>
                            </a>
                          </li>
                          <li className="active">
                            <a href="#">1</a>
                          </li>
                          <li>
                            <a href="#">2</a>
                          </li>
                          <li>
                            <a href="#">3</a>
                          </li>
                          <li>
                            <span>...</span>
                          </li>
                          <li>
                            <a href="#">11</a>
                          </li>
                          <li>
                            <a href="#">12</a>
                          </li>
                          <li>
                            <a href="#">13</a>
                          </li>
                          <li>
                            <a href="#">
                              <span>&raquo;</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

Blog.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPosts })(Blog);
