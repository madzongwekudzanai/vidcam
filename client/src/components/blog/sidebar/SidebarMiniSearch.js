import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchPosts } from "../../../actions/post";

const SidebarMiniSearch = ({ searchPosts, post: { loadingSearchedPosts } }) => {
  const history = useHistory();
  const [content, setContent] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    searchPosts(content);
    if (!loadingSearchedPosts) {
      history.push(`/blog/searchResults/${content}`);
    }
    setContent("");
  };
  const onChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <div className="sidebar-module">
      <div className="sidebar-module-inner">
        <div className="sidebar-mini-search">
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <div className="input-group">
              <input
                onChange={(e) => {
                  onChange(e);
                }}
                required
                value={content}
                name="content"
                type="text"
                placeholder="Search for..."
                className="form-control"
              />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

SidebarMiniSearch.propTypes = {
  post: PropTypes.object.isRequired,
  searchPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { searchPosts })(SidebarMiniSearch);
