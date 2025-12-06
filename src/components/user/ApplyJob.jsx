import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user , login} = useAuth();

  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: ""
  });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchJob = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJob(res.data);
      // Auto-fill user data if available

      if (user) {
        setFormData(prev => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || ""
        }));
      }
    } catch (err) {
      console.error("Error fetching job:", err);
      setError("Failed to load job details");
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setError("");

    if (!resume) {
      setError("Please upload your resume");
      return;
    }
    setSubmitting(true);

    const applicationData = new FormData();
    applicationData.append("userId",user.id);
    applicationData.append("jobId", id);
    applicationData.append("name", formData.name);
    applicationData.append("email", formData.email);
    applicationData.append("phone", formData.phone);
    applicationData.append("coverLetter", formData.coverLetter);
    applicationData.append("resume", resume);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/applications/apply",
        applicationData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Application submitted successfully!");
      navigate("/user/dashboard");

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Job Summary Card */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="fw-bold text-primary mb-2">{job.title}</h2>
                  <p className="text-muted mb-3">{job.description}</p>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge bg-primary">{job.type}</span>
                    <span className="badge bg-secondary">{job.department}</span>
                    <span className="badge bg-success">
                      ${job.salary?.toLocaleString() || "Negotiable"}
                    </span>
                  </div>

                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                    <span>{job.location}</span>
                  </div>
                </div>

                <div className="col-md-4 text-md-end">
                  <div className="bg-primary bg-opacity-10 rounded p-3 d-inline-block">
                    <i className="bi bi-briefcase text-primary" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 border-bottom">
              <h4 className="fw-bold mb-0 text-dark">
                <i className="bi bi-pencil-square text-primary me-2"></i>
                Application Form
              </h4>
            </div>

            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError("")}></button>
                </div>
              )}

              <form onSubmit={handleApply}>
                <div className="row">
                  {/* Personal Information */}
                  <div className="col-md-6">
                    <h6 className="fw-semibold text-muted mb-3">Personal Information</h6>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="col-md-6">
                    <h6 className="fw-semibold text-muted mb-3">Application Details</h6>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Upload Resume (PDF/DOC) *
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files[0])}
                        required
                      />
                      <small className="text-muted">
                        Maximum file size: 5MB. Accepted formats: PDF, DOC, DOCX
                      </small>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Cover Letter</label>
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="4"
                        placeholder="Tell us why you're a great fit for this position..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 pt-3 border-top">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 fw-semibold"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-check me-2"></i>
                        Submit Application
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 py-2"
                    onClick={() => navigate(-1)}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Application Tips */}
          <div className="mt-4">
            <div className="alert alert-info border-0">
              <h6 className="fw-semibold mb-2">
                <i className="bi bi-lightbulb me-2"></i>
                Application Tips
              </h6>
              <ul className="mb-0 ps-3">
                <li>Ensure your resume is up-to-date and tailored to this position</li>
                <li>Double-check your contact information for accuracy</li>
                <li>A customized cover letter can significantly improve your chances</li>
                <li>You'll receive a confirmation email once your application is submitted</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
      />
    </div>
  );
}