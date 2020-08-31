import React from "react";
import Photos from "./Photos";
import Searches from "./Searches";
import Photographers from "./Photographers";

const TopGrid = () => {
  return (
    <div className="section pb-50">
      <div className="container">
        <div className="row">
          <Photos />
          <Searches />
          <Photographers />
        </div>
      </div>
    </div>
  );
};

export default TopGrid;
