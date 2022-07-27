import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

const NotFound = () => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert
        className="status-message"
        variant="danger"
        onClose={() => setShow(false)}
        dismissible
      >
        Seems this user doesn't exist
      </Alert>
    );
  }
  return null;
};

export default NotFound;
