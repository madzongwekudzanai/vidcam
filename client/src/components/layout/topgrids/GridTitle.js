import React from "react";
import PropTypes from "prop-types";

const GridTitle = ({ title, link }) => {
  return (
    <div className="section-title mb-30">
      <h4 className="text-left">
        <a href={link}>{title}</a>
      </h4>
    </div>
  );
};

GridTitle.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default GridTitle;
