import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost, addComment } from "../../actions/post";
import Spinner1 from "../layout/Spinner1";
import TitleHeader from "../layout/TitleHeader";
import Sidebar from "./sidebar/Sidebar";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const BlogDetail = ({
  getPost,
  auth: { isAuthenticated, user },
  post: { singlePost, singlePostLoading },
  match,
  addComment,
}) => {
  const [body, setBody] = useState("");
  const onChange = (e) => {
    setBody(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(match.params.id, { text: body });
    setBody("");
  };
  useEffect(() => {
    getPost(match.params.id);
  }, [match.params.id, getPost]);
  return (
    <Fragment>
      {singlePostLoading ? (
        <Spinner1 />
      ) : (
        <Fragment>
          <TitleHeader title={singlePost.title} pageTitle="Blog Detail" />
          <div className="content-wrapper pt-50 pb-20">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-8 col-md-9 mb-30">
                  <div className="blog-wrapper">
                    <div className="blog-item blog-single">
                      <div className="blog-media">
                        <img
                          src={`/blog/${singlePost.blogImage}`}
                          alt={singlePost.title}
                        />
                      </div>
                      <div className="blog-content">
                        <h3>{singlePost.title}</h3>
                        <ul className="blog-meta clearfix">
                          <li>
                            <div>
                              by <a>Admin</a>
                            </div>
                          </li>
                          <li>
                            <div>
                              <a>
                                on{" "}
                                <Moment format="MMMM DD, YYYY">
                                  {singlePost.date}
                                </Moment>
                              </a>
                            </div>
                          </li>
                          <li>
                            <div>
                              in{" "}
                              {singlePost.category
                                .split(",")
                                .map((cat, index) => (
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
                          <li>
                            <div>
                              {singlePost.comments.length}{" "}
                              {singlePost.comments.length === 1
                                ? "comment"
                                : singlePost.comments.length === 0
                                ? "comments"
                                : "comments"}
                            </div>
                          </li>
                        </ul>
                        <div className="blog-entry">
                          <p>{singlePost.text}</p>
                        </div>
                      </div>
                      <h3 className="text-uppercase">
                        {singlePost.comments.length}{" "}
                        {singlePost.comments.length === 1
                          ? "Comment"
                          : singlePost.comments.length === 0
                          ? "Comments"
                          : "Comments"}
                      </h3>
                      <div id="comment-wrapper">
                        <ul className="comment-item">
                          {singlePost.comments.map((comment, index) => (
                            <Comment
                              key={index}
                              id={match.params.id}
                              comment={comment}
                            />
                          ))}
                        </ul>
                      </div>
                      <h3 className="text-uppercase">Leave Your Comment</h3>
                      <div className="white-bg">
                        {isAuthenticated ? (
                          <form
                            onSubmit={(e) => {
                              onSubmit(e);
                            }}
                            className="comment-form"
                          >
                            <div className="row">
                              <div className="col-xs-12 col-sm-6 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="comment-name">
                                    Your Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={user.name}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="col-xs-12 col-sm-6 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="comment-email">
                                    Your Email{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={user.email}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="clear"></div>
                            <div className="row">
                              <div className="col-md-12 mb-30">
                                <div className="form-group">
                                  <label htmlFor="comment-message">
                                    Message{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <textarea
                                    name="message"
                                    value={body}
                                    onChange={(e) => {
                                      onChange(e);
                                    }}
                                    className="form-control"
                                    rows="8"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Comment
                                </button>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <p>
                            Please{" "}
                            <Link to="/login">
                              <strong>login</strong>
                            </Link>{" "}
                            or{" "}
                            <Link to="/register">
                              <strong>register</strong>
                            </Link>{" "}
                            to comment on this post
                          </p>
                        )}
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>
                <Sidebar />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

BlogDetail.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPost, addComment })(BlogDetail);
