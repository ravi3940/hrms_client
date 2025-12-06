import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobId: "",
    status: "",
  });

  const token = localStorage.getItem("token");

const fetchApplications = async () => {
  const res = await axios.get("http://localhost:5000/api/applications", {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("APPLICATIONS API RESPONSE:", res.data);

  const apps = Array.isArray(res.data)
    ? res.data
    : res.data.applications || res.data.data || [];

  setApplications(apps);
};

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs", {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
    setJobs(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/applications/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchApplications();
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const filteredApps = applications.filter((app) => {
    return (
      (filters.jobId === "" || app.job?._id === filters.jobId) &&
      (filters.status === "" || app.status === filters.status)
    );
  });

  return (
    <div className="container py-4">

      <h2 className="fw-bold text-primary mb-4">Applications Management</h2>

      {/* FILTER CARD */}
      <div className="card shadow-sm border-0 p-3 mb-4">
        <div className="row g-3">

          <div className="col-md-6 col-12">
            <label className="form-label fw-semibold">Filter by Job</label>
            <select
              className="form-select"
              onChange={(e) => setFilters({ ...filters, jobId: e.target.value })}
            >
              <option value="">All Jobs</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 col-12">
            <label className="form-label fw-semibold">Filter by Status</label>
            <select
              className="form-select"
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="d-none d-md-block">
        <div className="card shadow-sm border-0 p-3">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Sr.No</th>
                <th>Candidate</th>
                <th>Email</th>
                <th>Job</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApps.length > 0 ? (
                filteredApps.map((app, index) => (
                  <tr key={app._id}>
                    <td>{index + 1}</td>

                    <td>{app.candidateName || app.userId?.name || "N/A"}</td>

                    <td>{app.userId?.email || app.email}</td>

                    <td>{app.job?.title || "N/A"}</td>

                    <td>
                      <a
                        href={`http://localhost:5000/api/${app.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-dark"
                      >
                        View
                      </a>
                    </td>

                    <td>
                      <span className="badge bg-info text-dark text-uppercase">
                        {app.status}
                      </span>
                    </td>

                    <td>{new Date(app.updatedAt).toLocaleDateString()}</td>

                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => updateStatus(app._id, "shortlisted")}
                        >
                          Shortlist
                        </button>

                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => updateStatus(app._id, "interview")}
                        >
                          Interview
                        </button>

                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => updateStatus(app._id, "offered")}
                        >
                          Select
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => updateStatus(app._id, "rejected")}
                        >
                          Reject
                        </button>
                      </div>

                      {app.status === "offered" && (
                       <Link to={`/hr/offer/${app._id}`} state={{ application: app }}
                          
                          className="btn btn-sm btn-outline-primary mt-2 w-100"
                        >
                          Generate Offer Letter
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARDS VIEW */}
      <div className="d-md-none">
        {filteredApps.length > 0 ? (
          filteredApps.map((app, index) => (
            <div key={app._id} className="card shadow-sm border-0 p-3 mb-3">

              <h5 className="fw-bold">{app.candidateName || "N/A"}</h5>
              <small className="text-muted">{app.email}</small>

              <hr />

              <p className="mb-1">
                <strong>Job:</strong> {app.job?.title || "N/A"}
              </p>

              <p>
                <strong>Status: </strong>
                <span className="badge bg-info text-dark text-uppercase">
                  {app.status}
                </span>
              </p>

              <p className="text-muted">
                <strong>Updated:</strong> {new Date(app.updatedAt).toLocaleDateString()}
              </p>

              <a
                href={`http://localhost:5000/${app.resume}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark w-100 mb-2"
              >
                View Resume
              </a>

              {/* Action Buttons Mobile */}
              <div className="d-grid gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => updateStatus(app._id, "shortlisted")}
                >
                  Shortlist
                </button>

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => updateStatus(app._id, "interview")}
                >
                  Interview
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => updateStatus(app._id, "offered")}
                >
                  Select
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => updateStatus(app._id, "rejected")}
                >
                  Reject
                </button>

                {app.status === "offered" && (
                  <Link
                    to={`/hr/offer/${app._id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Generate Offer Letter
                  </Link>
                )}
              </div>

            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-4">No applications found.</p>
        )}
      </div>

    </div>
  );
}
