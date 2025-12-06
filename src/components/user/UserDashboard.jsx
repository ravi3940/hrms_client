import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Open Jobs
  const loadJobs = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(res.data);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  };

  // Fetch my applications
  const loadUserApps = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/${applications._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      setApplications(res.data);
    } catch (error) {
      console.error("Error loading applications:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadJobs();
      if (user && user._id) {
        await loadUserApps(user._id);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [user]);



  const getStatusBadge = (status) => {
    const statusConfig = {
      applied: { class: "bg-primary", text: "Applied" },
      reviewed: { class: "bg-info", text: "Under Review" },
      shortlisted: { class: "bg-warning", text: "Shortlisted" },
      interview: { class: "bg-purple", text: "Interview" },
      rejected: { class: "bg-danger", text: "Not Selected" },
      offered: { class: "bg-success", text: "Offer Received" }
    };

    const config = statusConfig[status] || { class: "bg-secondary", text: status };
    return <span className={`badge ${config.class} text-white`}>{config.text}</span>;
  };

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0">
      {/* Hero Section */}
      <section className="bg-gradient-primary py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold text-dark mb-2">
                Welcome back, <span className="text-primary">{user.name}</span>!
              </h1>
              <p className="lead text-muted mb-4">
                Here's your job activity & application summary
              </p>
              <div className="d-flex flex-wrap gap-3">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                  <i className="bi bi-person-badge me-2"></i>
                  {user.role.toUpperCase()}
                </span>
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                  <i className="bi bi-envelope me-2"></i>
                  {user.email}
                </span>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4">
                <i className="bi bi-person-check text-primary" style={{ fontSize: '3rem' }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="container py-4">
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm hover-lift">
              <div className="card-body text-center p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-briefcase text-primary fs-4"></i>
                </div>
                <h3 className="fw-bold text-dark mb-1">{jobs.length}</h3>
                <p className="text-muted mb-2">Open Positions</p>
                <Link to="#jobs" className="btn btn-primary btn-sm">
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm hover-lift">
              <div className="card-body text-center p-4">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-send-check text-success fs-4"></i>
                </div>
                <h3 className="fw-bold text-dark mb-1">{applications.length}</h3>
                <p className="text-muted mb-2">Applications Sent</p>
                <button
                  onClick={() => setActiveTab("applications")}
                  className="btn btn-success btn-sm"
                >
                  View Status
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm hover-lift">
              <div className="card-body text-center p-4">
                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-clock-history text-info fs-4"></i>
                </div>
                <h3 className="fw-bold text-dark mb-1">
                  {applications.filter(app => app.status === "reviewed" || app.status === "shortlisted").length}
                </h3>
                <p className="text-muted mb-2">In Progress</p>
                <button
                  onClick={() => setActiveTab("applications")}
                  className="btn btn-info btn-sm text-white"
                >
                  Track Progress
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm hover-lift">
              <div className="card-body text-center p-4">
                <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-star text-warning fs-4"></i>
                </div>
                <h3 className="fw-bold text-dark mb-1">
                  {applications.filter(app => app.status === "offered").length}
                </h3>
                <p className="text-muted mb-2">Offers Received</p>
                <button
                  onClick={() => setActiveTab("applications")}
                  className="btn btn-warning btn-sm text-white"
                >
                  View Offers
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="container py-4">
        <div className="row">
          <div className="col-12">
            {/* Tabs Navigation */}
            <ul className="nav nav-pills nav-justified mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold py-3 ${activeTab === "jobs" ? "active bg-primary border-0" : "text-dark"}`}
                  onClick={() => setActiveTab("jobs")}
                  style={{ borderRadius: '12px' }}
                >
                  <i className="bi bi-briefcase me-2"></i>
                  Available Jobs ({jobs.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold py-3 ${activeTab === "applications" ? "active bg-primary border-0" : "text-dark"}`}
                  onClick={() => setActiveTab("applications")}
                  style={{ borderRadius: '12px' }}
                >
                  <i className="bi bi-send-check me-2"></i>
                  My Applications ({applications.length})
                </button>
              </li>
            </ul>

            {/* Search Bar for Jobs */}
            {activeTab === "jobs" && (
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 py-3"
                      placeholder="Search jobs by title, department, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ borderRadius: '0 8px 8px 0' }}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <span className="text-muted">
                    {filteredJobs.length} of {jobs.length} jobs found
                  </span>
                </div>
              </div>
            )}

            {/* Jobs Tab Content */}
            {activeTab === "jobs" && (
              <div className="slide-in">
                <h3 className="fw-bold text-dark mb-4">Available Job Opportunities</h3>

                {filteredJobs.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-briefcase display-1 text-muted mb-3"></i>
                    <h4 className="text-muted mb-3">No jobs available</h4>
                    <p className="text-muted">Check back later for new opportunities</p>
                  </div>
                ) : (
                  <div className="row g-4">
                    {filteredJobs.map((job) => {
                      const hasApplied = applications.some(app => app.jobId === job._id);

                      return (
                        <div className="col-lg-4 col-md-6" key={job._id}>
                          <div className="card border-0 shadow-sm h-100 hover-lift feature-card">
                            <div className="card-body p-4">
                              <div className="d-flex justify-content-between align-items-start mb-3">
                                <h5 className="fw-bold text-dark mb-0">{job.title}</h5>
                                <span className="badge bg-primary bg-opacity-10 text-primary">
                                  {job.department}
                                </span>
                              </div>

                              <div className="mb-3">
                                <small className="text-muted">
                                  <i className="bi bi-building me-1"></i>
                                  {job.company || "Our Company"}
                                </small>
                              </div>

                              <p className="text-muted mb-4 small">
                                {job.description?.substring(0, 120)}...
                              </p>

                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <small className="text-muted">
                                  <i className="bi bi-clock me-1"></i>
                                  Posted {new Date(job.createdAt).toLocaleDateString()}
                                </small>
                                <small className="text-muted">
                                  <i className="bi bi-geo-alt me-1"></i>
                                  {job.location || "Remote"}
                                </small>
                              </div>

                              {/* <button
                                className={`btn w-100 py-2 fw-semibold ${hasApplied
                                  ? "btn-outline-success"
                                  : "btn-primary shadow-primary-hover"
                                  }`}
                                onClick={() => !hasApplied && handleApply(job._id, job.title)}
                                disabled={hasApplied}
                              >
                                {hasApplied ? (
                                  <>
                                    <i className="bi bi-check-circle me-2"></i>
                                    Applied
                                  </>
                                ) : (
                                  <>
                                    <i className="bi bi-send me-2"></i>
                                    Apply Now
                                  </>
                                )}
                              </button> */}

                              <Link
                                to={`/user/apply/${job._id}`}
                                className={`btn w-100 py-2 fw-semibold ${hasApplied ? "btn-outline-success" : "btn-primary shadow-primary-hover"
                                  }`}
                                onClick={(e) => hasApplied && e.preventDefault()}
                              >
                                {hasApplied ? (
                                  <>
                                    <i className="bi bi-check-circle me-2"></i>
                                    Applied
                                  </>
                                ) : (
                                  <>
                                    <i className="bi bi-send me-2"></i>
                                    Apply Now
                                  </>
                                )}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Applications Tab Content */}
            {activeTab === "applications" && (
              <div className="slide-in">
                <h3 className="fw-bold text-dark mb-4">Your Application Status</h3>

                {applications.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-send display-1 text-muted mb-3"></i>
                    <h4 className="text-muted mb-3">No applications yet</h4>
                    <p className="text-muted mb-4">Start applying to jobs to see your applications here</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setActiveTab("jobs")}
                    >
                      <i className="bi bi-briefcase me-2"></i>
                      Browse Jobs
                    </button>
                  </div>
                ) : (
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th className="border-0 ps-4 fw-semibold">Job Title</th>
                              <th className="border-0 fw-semibold">Department</th>
                              <th className="border-0 fw-semibold">Status</th>
                              <th className="border-0 fw-semibold">Applied Date</th>
                              <th className="border-0 fw-semibold">Last Updated</th>
                              <th className="border-0 pe-4 fw-semibold">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {applications.map((application) => (
                              <tr key={application._id} className="align-middle">
                                <td className="ps-4">
                                  <div>
                                    <strong>{application.jobId?.title || "Job Title N/A"}</strong>
                                    <br />
                                    <small className="text-muted">
                                      {application.jobId?.company || "Our Company"}
                                    </small>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge bg-primary bg-opacity-10 text-primary">
                                    {application.jobId?.department || "N/A"}
                                  </span>
                                </td>
                                <td>
                                  {getStatusBadge(application.status)}
                                </td>
                                <td>
                                  {new Date(application.appliedAt).toLocaleDateString()}
                                </td>
                                <td>
                                  {new Date(application.updatedAt || application.appliedAt).toLocaleDateString()}
                                </td>
                                <td className="pe-4">
                                  <button className="btn btn-outline-primary btn-sm">
                                    <i className="bi bi-eye me-1"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Application Status Legend */}
                {applications.length > 0 && (
                  <div className="mt-4">
                    <h6 className="fw-semibold mb-3">Status Legend:</h6>
                    <div className="d-flex flex-wrap gap-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-primary me-2">Applied</span>
                        <small className="text-muted">Application submitted</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-info me-2">Under Review</span>
                        <small className="text-muted">HR is reviewing your application</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-warning me-2">Shortlisted</span>
                        <small className="text-muted">You've been shortlisted</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-purple me-2">Interview</span>
                        <small className="text-muted">Interview scheduled</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-success me-2">Offer Received</span>
                        <small className="text-muted">Job offer extended</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-danger me-2">Not Selected</span>
                        <small className="text-muted">Application not successful</small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #f8f9fa 0%, #e8eaf6 50%, #f8f9fa 100%);
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15) !important;
        }
        .shadow-primary-hover {
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(63, 81, 181, 0.3);
        }
        .shadow-primary-hover:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(63, 81, 181, 0.4);
        }
        .slide-in {
          animation: slideIn 0.3s ease-out;
        }
        .min-vh-50 {
          min-height: 50vh;
        }
        .bg-purple {
          background-color: #6f42c1 !important;
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .nav-pills .nav-link.active {
          background: linear-gradient(135deg, #3f51b5, #2196f3);
          border: none;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;