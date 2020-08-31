import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TitleHeader = ({ title, pageTitle }) => {
  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <h2 className="page-title one-trunk">{title}</h2>
          </div>
          <div className="col-xs-12 col-sm-6">
            <ol className="breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>Page</li>
              <li className="active">{pageTitle}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default TitleHeader;
