import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";

const Comment = ({
  deleteComment,
  id,
  auth: { isAuthenticated, loading, user },
  comment,
}) => {
  return (
    <li className="clearfix">
      <div className="comment-avatar">
        <img src={comment.avatar} alt={comment.name} />
      </div>
      <div className="comment-header">
        {user && (
          <Fragment>
            {!loading && comment.user === user._id && (
              <a
                onClick={(e) => {
                  deleteComment(id, comment._id);
                }}
                className="delete-comment comment-reply curs"
              >
                delete
              </a>
            )}
          </Fragment>
        )}

        <a href="/" className="comment-author">
          {comment.name}
        </a>
        <span className="comment-time">
          <Moment format="MMM, DD, YYYY">{comment.date}</Moment>
        </span>
      </div>
      <div className="comment-content">
        <p>{comment.text} </p>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { deleteComment })(Comment);
