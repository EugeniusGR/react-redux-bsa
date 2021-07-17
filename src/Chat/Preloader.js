import React from "react";
import "./Preloader.css";

function Preloader(props) {
  return (
    <div className="preloader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Preloader;
