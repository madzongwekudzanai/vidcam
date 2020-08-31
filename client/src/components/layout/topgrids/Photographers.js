import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getPopularProfiles } from "../../../actions/profile";
import { connect } from "react-redux";
import GridTitle from "./GridTitle";
import Spinner1 from "../Spinner1";
import { Link } from "react-router-dom";

const Photographers = ({
  getPopularProfiles,
  profile: { popularProfiles, popularProfilesLoading },
}) => {
  useEffect(() => {
    getPopularProfiles();
  }, [getPopularProfiles]);
  return (
    <div className="col-xs-12 col-sm-12 col-lg-4 mb-30">
      <GridTitle title="Top Photographers" link="/" />
      <div className="author-sm-wrapper width-50-sm clearfix">
        {popularProfilesLoading ? (
          <Spinner1 />
        ) : !popularProfilesLoading && popularProfiles.length === 0 ? (
          <p>
            No popular photographers available,{" "}
            <Link to="/createProfile">create profile.</Link>
          </p>
        ) : (
          <Fragment>
            {popularProfiles.map(
              ({ _id, name, user, profileImage, followers }) => (
                <div key={_id} className="author-sm-item">
                  <Link to={`/profiles/${user},${_id}`} className="clearfix">
                    <div className="image">
                      <img
                        src={profileImage.split("&#x2F;").join("/")}
                        alt={name}
                        className="img-circle"
                      />
                    </div>
                    <div className="content">
                      <h6 className="uppercase">{name}</h6>
                      <span className="highlight">
                        <i className="fa fa-user"></i> {followers.length}
                      </span>
                    </div>
                  </Link>
                </div>
              )
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

Photographers.propTypes = {
  profile: PropTypes.object.isRequired,
  getPopularProfiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPopularProfiles })(Photographers);
