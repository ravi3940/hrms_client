import React from "react";
import { Link } from "react-router-dom";

const HRDashboard = () => {
  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">HR Dashboard</h2>
        <Link to="/hr/applications" className="btn btn-primary">
          View Applications
        </Link>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <h6 className="text-muted">New Applications</h6>
            <h2 className="fw-bold text-primary">42</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <h6 className="text-muted">Interviews Scheduled</h6>
            <h2 className="fw-bold text-warning">8</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <h6 className="text-muted">Offers Sent</h6>
            <h2 className="fw-bold text-success">12</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <h6 className="text-muted">Onboarding Pending</h6>
            <h2 className="fw-bold text-danger">5</h2>
          </div>
        </div>
      </div>

      {/* JOB MANAGEMENT SECTION */}
      <div className="card shadow-sm p-4 border-0 mb-5">
        <h5 className="fw-semibold mb-3">Job Management</h5>

        <div className="d-flex gap-3 flex-wrap">
          <Link className="btn btn-outline-primary px-4" to="/hr/create-job">
            + Create Job
          </Link>

          <Link className="btn btn-outline-secondary px-4" to="/hr/jobs">
            View Jobs
          </Link>

          <Link className="btn btn-outline-dark px-4" to="/hr/job-status">
            Job Status
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="card shadow-sm p-4 border-0 mb-5">
        <h5 className="fw-semibold mb-3">Quick Actions</h5>

        <div className="d-flex gap-3 flex-wrap">
          <Link className="btn btn-outline-primary px-4" to="/hr/applications">
            Manage Applications
          </Link>

          <Link className="btn btn-outline-warning px-4" to="/hr/interviews">
            Interview Scheduling
          </Link>

          <Link className="btn btn-outline-success px-4" to="/hr/offer">
            Generate Offer Letter
          </Link>

          <Link className="btn btn-outline-info px-4" to="/onboarding">
            Onboarding Tasks
          </Link>
        </div>
      </div>

      {/* RECENT APPLICATIONS TABLE */}
      <div className="card shadow-sm border-0 p-3">
        <h5 className="fw-semibold mb-3">Recent Applications</h5>

        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Role</th>
              <th>Status</th>
              <th>Applied On</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ravi Kumar</td>
              <td>Full Stack Developer</td>
              <td><span className="badge bg-primary">New</span></td>
              <td>Jan 21, 2025</td>
              <td><Link to="/hr/applications" className="btn btn-sm btn-outline-primary">View</Link></td>
            </tr>

            <tr>
              <td>Priya Sharma</td>
              <td>HR Manager</td>
              <td><span className="badge bg-warning">Interview</span></td>
              <td>Jan 20, 2025</td>
              <td><Link to="/hr/applications" className="btn btn-sm btn-outline-primary">View</Link></td>
            </tr>

            <tr>
              <td>Arun Singh</td>
              <td>UI/UX Designer</td>
              <td><span className="badge bg-success">Selected</span></td>
              <td>Jan 18, 2025</td>
              <td><Link to="/hr/applications" className="btn btn-sm btn-outline-primary">View</Link></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default HRDashboard;
