import React from "react";

const ScrollToTopButton = () => {
  return (
    <div
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      id="back-to-top"
    >
      <a>
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
};

export default ScrollToTopButton;
