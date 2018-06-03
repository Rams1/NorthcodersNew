import React from "react";
import "./Loading.css";

function Loading(props) {
  return (
    <div className="loading">
      <div id="loading">
        <div id="loading-inner" />
      </div>
      <h3>Loading...</h3>
    </div>
  );
}

export default Loading;
