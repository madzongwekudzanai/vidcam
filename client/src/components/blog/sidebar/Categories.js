import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategories } from "../../../actions/post";
import SidebarTitle from "./SidebarTitle";
import Spinner1 from "../../layout/Spinner1";
import { Link } from "react-router-dom";

const Categories = ({
  getCategories,
  post: { categories, loadingCategories },
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <div className="sidebar-module">
      <SidebarTitle title="Categories" />
      <div className="sidebar-module-inner">
        <ul className="sidebar-category">
          {loadingCategories ? (
            <Spinner1 />
          ) : (
            <Fragment>
              {categories.map(({ _id, category }) => (
                <li key={_id}>
                  <Link to={`/blog/categories/${category}`}>{category}</Link>
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

Categories.propTypes = {
  post: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getCategories })(Categories);
