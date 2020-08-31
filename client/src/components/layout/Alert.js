import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alerts = ({ alerts }) => {
  return (
    <div>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "15px",
              zIndex: "100",
            }}
            className={`alert alert-${alert.alertType}`}
            key={alert.id}
            role="alert"
          >
            {alert.msg}
          </div>
        ))}
    </div>
  );
};

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
