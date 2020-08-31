import React from "react";
import { Spinner } from "react-bootstrap";

const Spinner1 = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "45%",
      }}
    >
      <Spinner animation="border" variant="warning" />
    </div>
  );
};

export default Spinner1;
