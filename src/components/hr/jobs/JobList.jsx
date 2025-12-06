import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    setDeletingId(id);

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (err) {
      setError("Failed to delete job");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
        <p className="mt-3 text-muted">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <h2 className="fw-bold text-primary">Job Openings</h2>
        <Link to="/hr/create-job" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add Job
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Job Cards Grid */}
      <div className="row g-4">

        {jobs.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-inbox display-1 text-muted"></i>
            <h4 className="mt-3 text-muted">No Job Found</h4>
            <Link to="/hr/create-job" className="btn btn-primary mt-2">Create Job</Link>
          </div>
        )}

        {jobs.map((job, i) => (
          <div className="col-md-6 col-lg-4" key={job._id}>
            <div className="card shadow-sm border-0 rounded-4 h-100 job-card-hover">

              {/* Card Body */}
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="fw-bold">{job.title}</h5>
                  <span className="badge bg-light text-dark border">
                    #{i + 1}
                  </span>
                </div>

                <p className="text-muted small">{job.description?.slice(0, 80)}...</p>

                <div className="d-flex flex-wrap gap-2 my-3">
                  <span className="badge bg-primary">{job.type}</span>
                  <span className="badge bg-dark">{job.department}</span>
                  <span className="badge bg-success">{job.salary || "N/A"}</span>
                </div>

                <p className="mb-1">
                  <i className="bi bi-geo-alt text-danger"></i>
                  <span className="ms-1 text-muted">{job.location}</span>
                </p>
              </div>

              {/* Card Footer */}
              <div className="card-footer bg-white border-0 d-flex justify-content-between">
                <Link
                  to={`/hr/edit-job/${job._id}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="bi bi-pencil-square"></i> Edit
                </Link>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteJob(job._id)}
                  disabled={deletingId === job._id}
                >
                  {deletingId === job._id ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <i className="bi bi-trash"></i>
                  )}
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Icons CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
      />
    </div>
  );
}
