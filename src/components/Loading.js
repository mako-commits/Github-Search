import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div className="status-message">
      <Spinner animation="border" />
    </div>
  );
};

export default Loading;
