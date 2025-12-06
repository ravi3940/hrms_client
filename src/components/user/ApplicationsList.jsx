import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const JobOpening = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadUserApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/user/${user._id}`
      );
      setApplications(res.data);
      setFilteredApplications(res.data);
    } catch (error) {
      console.error("Error loading applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobId?.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [statusFilter, searchTerm, applications]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      applied: { class: "bg-primary", icon: "bi-send", text: "Applied" },
      reviewed: { class: "bg-info", icon: "bi-search", text: "Under Review" },
      shortlisted: { class: "bg-warning", icon: "bi-star", text: "Shortlisted" },
      interview: { class: "bg-purple", icon: "bi-calendar-event", text: "Interview" },
      rejected: { class: "bg-danger", icon: "bi-x-circle", text: "Not Selected" },
      offered: { class: "bg-success", icon: "bi-award", text: "Offer Received" }
    };
    
    const config = statusConfig[status] || { class: "bg-secondary", icon: "bi-question", text: status };
    return (
      <span className={`badge ${config.class} text-white d-inline-flex align-items-center`}>
        <i className={`bi ${config.icon} me-1`}></i>
        {config.text}
      </span>
    );
  };

  const getStatusProgress = (status) => {
    const steps = [
      { key: "applied", label: "Applied", active: true },
      { key: "reviewed", label: "Under Review", active: ["reviewed", "shortlisted", "interview", "offered"].includes(status) },
      { key: "interview", label: "Interview", active: ["interview", "offered"].includes(status) },
      { key: "offered", label: "Offer", active: status === "offered" }
    ];

    return (
      <div className="d-flex align-items-center justify-content-between mb-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="d-flex flex-column align-items-center">
              <div 
                className={`rounded-circle d-flex align-items-center justify-content-center ${
                  step.active ? "bg-primary text-white" : "bg-light text-muted"
                }`}
                style={{ width: '30px', height: '30px', fontSize: '12px' }}
              >
                {index + 1}
              </div>
              <small className="mt-1 text-muted text-center">{step.label}</small>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`flex-fill mx-2 ${step.active ? "bg-primary" : "bg-light"}`}
                style={{ height: '2px' }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading your applications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0">
      {/* Hero Section */}
      <section className="bg-light py-5 border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">My Applications</li>
                </ol>
              </nav>
              <h1 className="display-5 fw-bold text-dark mb-3">
                My <span className="text-primary">Applications</span>
              </h1>
              <p className="lead text-muted mb-4">
                Track your job applications and interview progress in one place
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                  <i className="bi bi-send-check me-2"></i>
                  {applications.length} Total Applications
                </span>
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                  <i className="bi bi-award me-2"></i>
                  {applications.filter(app => app.status === "offered").length} Offers
                </span>
                <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                  <i className="bi bi-clock-history me-2"></i>
                  {applications.filter(app => ["reviewed", "shortlisted", "interview"].includes(app.status)).length} In Progress
                </span>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4">
                <i className="bi bi-send-check text-primary display-6"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="container py-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label htmlFor="searchApplications" className="form-label fw-semibold">Search Applications</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                id="searchApplications"
                className="form-control border-start-0"
                placeholder="Search by job title, department, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setSearchTerm("")}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="statusFilter" className="form-label fw-semibold">Filter by Status</label>
            <select
              id="statusFilter"
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="reviewed">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="offered">Offer Received</option>
              <option value="rejected">Not Selected</option>
            </select>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center h-100">
              <div className="card bg-light border-0 w-100">
                <div className="card-body py-2 text-center">
                  <small className="text-muted">
                    <strong>{filteredApplications.length}</strong> of <strong>{applications.length}</strong> applications
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications List */}
      <section className="container py-4">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-5">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '100px', height: '100px'}}>
              <i className="bi bi-send display-6 text-muted"></i>
            </div>
            <h4 className="text-muted mb-3">
              {applications.length === 0 ? "No applications yet" : "No applications match your filters"}
            </h4>
            <p className="text-muted mb-4">
              {applications.length === 0 
                ? "Start applying to jobs to see your applications here" 
                : "Try adjusting your search or filter criteria"
              }
            </p>
            {applications.length === 0 && (
              <Link to="/jobs" className="btn btn-primary btn-lg">
                <i className="bi bi-briefcase me-2"></i>
                Browse Available Jobs
              </Link>
            )}
          </div>
        ) : (
          <div className="row g-4">
            {filteredApplications.map((application) => (
              <div key={application._id} className="col-12">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-transparent border-0 pb-0">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                            <i className="bi bi-briefcase text-primary fs-4"></i>
                          </div>
                          <div>
                            <h5 className="card-title fw-bold text-dark mb-1">
                              {application.jobId?.title || "Job Title Not Available"}
                            </h5>
                            <p className="card-text text-muted mb-0">
                              <i className="bi bi-building me-1"></i>
                              {application.jobId?.company || "Our Company"} • 
                              <i className="bi bi-diagram-2 ms-2 me-1"></i>
                              {application.jobId?.department || "Department Not Specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <div className="mt-2 mt-md-0">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <h6 className="fw-semibold text-dark mb-3">Application Progress</h6>
                          {getStatusProgress(application.status)}
                        </div>
                        <div className="d-flex flex-wrap gap-2 text-muted">
                          <small>
                            <i className="bi bi-calendar me-1"></i>
                            Applied {new Date(application.appliedAt).toLocaleDateString()}
                          </small>
                          <small>
                            <i className="bi bi-clock me-1"></i>
                            Updated {new Date(application.updatedAt || application.appliedAt).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex flex-column h-100">
                          <div className="mb-3">
                            <h6 className="fw-semibold text-dark mb-2">Quick Actions</h6>
                            <div className="d-flex gap-2 flex-wrap">
                              <button className="btn btn-outline-primary btn-sm">
                                <i className="bi bi-eye me-1"></i>
                                View Details
                              </button>
                              <button className="btn btn-outline-secondary btn-sm">
                                <i className="bi bi-download me-1"></i>
                                Download Resume
                              </button>
                              <button className="btn btn-outline-info btn-sm">
                                <i className="bi bi-chat-left me-1"></i>
                                Contact HR
                              </button>
                            </div>
                          </div>
                          {application.notes && (
                            <div className="mt-auto">
                              <div className="alert alert-info mb-0">
                                <small>
                                  <i className="bi bi-info-circle me-1"></i>
                                  <strong>Latest Update:</strong> {application.notes}
                                </small>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Status Legend and Help Section */}
      {applications.length > 0 && (
        <section className="container py-5 border-top bg-light rounded-3">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="fw-bold text-dark mb-4">Application Status Guide</h5>
              <div className="row g-3">
                <div className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                    <span className="badge bg-primary me-3">Applied</span>
                    <small className="text-muted">Application submitted successfully</small>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                    <span className="badge bg-info me-3">Under Review</span>
                    <small className="text-muted">HR team is reviewing your application</small>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                    <span className="badge bg-warning me-3">Shortlisted</span>
                    <small className="text-muted">Selected for next round</small>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                    <span className="badge bg-purple me-3">Interview</span>
                    <small className="text-muted">Interview scheduled</small>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                    <span className="badge bg-success me-3">Offer Received</span>
                    <small className="text-muted">Job offer extended</small>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                    <span className="badge bg-danger me-3">Not Selected</span>
                    <small className="text-muted">Application not successful</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 bg-primary text-white">
                <div className="card-body">
                  <h6 className="card-title fw-bold mb-3">
                    <i className="bi bi-question-circle me-2"></i>
                    Need Help?
                  </h6>
                  <p className="card-text small opacity-75 mb-3">
                    If you have questions about your application status or need to update your information, our HR team is here to help.
                  </p>
                  <div className="d-grid gap-2">
                    <button className="btn btn-light btn-sm">
                      <i className="bi bi-envelope me-1"></i>
                      Contact HR
                    </button>
                    <button className="btn btn-outline-light btn-sm">
                      <i className="bi bi-telephone me-1"></i>
                      Schedule Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default JobOpening;