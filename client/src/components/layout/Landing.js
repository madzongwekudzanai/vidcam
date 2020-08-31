import React, { Fragment, useEffect } from "react";
import Hero from "../../components/layout/header/Hero";
import PropTypes from "prop-types";
import Masonry from "../../components/layout/masonry/Masonry";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PhotoSign from "../../components/layout/PhotoSign";
import TopGrid from "../../components/layout/topgrids/TopGrid";

const Landing = ({ getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <Fragment>
      <Hero />
      <div className="content-wrapper">
        <Masonry />
        <PhotoSign />
        <TopGrid />
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

export default connect(null, { getCurrentProfile })(Landing);
