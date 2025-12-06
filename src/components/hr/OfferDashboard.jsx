import React from "react";
import { Link } from "react-router-dom";

const OfferDashboard = () => {
  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between mb-4">
        <h2 className="fw-bold text-primary">Offer Letters</h2>
        <Link className="btn btn-success" to="/hr/offer/create">+ New Offer</Link>
      </div>

      <div className="card p-3 shadow-sm">
        <p className="text-muted">List of generated offers will appear here...</p>
      </div>

    </div>
  );
};

export default OfferDashboard;
