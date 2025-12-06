import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchJob = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJob(res.data);
    } catch (err) {
      console.log("❌ Fetch job error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job deleted!");
      navigate("/hr/jobs");
    } catch (err) {
      alert("Failed to delete job.");
    }
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  if (!job)
    return (
      <div className="container py-5">
        <h4 className="text-danger">Job Not Found</h4>
      </div>
    );

  return (
    <div className="container py-4">

      <Link to="/hr/jobs" className="btn btn-light border mb-3">
        ← Back
      </Link>

      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h2 className="fw-bold text-primary mb-2">{job.title}</h2>
        <p className="text-muted">{job.department}</p>

        <div className="row mt-4">

          <div className="col-md-6">
            <h6 className="fw-semibold">Job Type:</h6>
            <p>{job.type}</p>
          </div>

          <div className="col-md-6">
            <h6 className="fw-semibold">Location:</h6>
            <p>
              <i className="bi bi-geo-alt text-danger"></i> {job.location}
            </p>
          </div>

          <div className="col-md-6 mt-3">
            <h6 className="fw-semibold">Salary Range:</h6>
            <p className="text-success fw-semibold">{job.salary}</p>
          </div>

        </div>

        <hr />

        <h5 className="fw-bold mt-3">Job Description</h5>
        <p className="text-muted">{job.description}</p>

        {/* HR ACTION BUTTONS */}
        {user?.role === "hr" && (
          <div className="d-flex gap-3 mt-4">
            <Link to={`/hr/edit-job/${job._id}`} className="btn btn-primary px-4">
              <i className="bi bi-pencil-square me-2"></i> Edit Job
            </Link>

            <button
              className="btn btn-danger px-4"
              onClick={handleDelete}
            >
              <i className="bi bi-trash me-2"></i> Delete Job
            </button>
          </div>
        )}

        {/* USER APPLY BUTTON */}
        {user?.role === "user" && (
          <div className="mt-4">
            <Link to={`/apply/${job._id}`} className="btn btn-success px-4">
              <i className="bi bi-send-check me-2"></i> Apply for this Job
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
