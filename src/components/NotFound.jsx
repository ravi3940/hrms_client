import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="fs-5 text-muted">Page Not Found</p>

      <Link to="/" className="btn btn-primary mt-3 px-4">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
