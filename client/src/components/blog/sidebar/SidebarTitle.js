import React from "react";
import PropTypes from "prop-types";

const SidebarTitle = ({ title }) => {
  return <h4 className="sidebar-title">{title}</h4>;
};

SidebarTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SidebarTitle;
