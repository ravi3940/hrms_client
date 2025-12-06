import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Jobs = () => {

  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

  const loadJobs = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  };

  const loadUserApplications = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      setApplications(res.data);
    } catch (error) {
      console.error("Error loading applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([loadJobs(), loadUserApplications()]);
  }, []);

  useEffect(() => {
    let filtered = [...jobs];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requirements?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter(job => job.department === departmentFilter);
    }

    // Apply location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter(job => job.location === locationFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "title":
          return a.title?.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [searchTerm, departmentFilter, locationFilter, sortBy, jobs]);

  // const handleApply = async (jobId, jobTitle) => {
  //   try {
  //     await axios.post("http://localhost:5000/api/applications/apply", {
  //       userId: user._id,
  //       jobId: jobId,
  //     });

  //     // Show success toast notification
  //     const toast = document.createElement('div');
  //     toast.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3';
  //     toast.style.zIndex = '1060';
  //     toast.innerHTML = `
  //       <strong>Success!</strong> You've applied for "${jobTitle}".
  //       <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  //     `;
  //     document.body.appendChild(toast);

  //     // Auto remove toast after 5 seconds
  //     setTimeout(() => {
  //       if (toast.parentNode) {
  //         toast.parentNode.removeChild(toast);
  //       }
  //     }, 5000);

  //     loadUserApplications(); // Refresh applications to update status
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Unable to apply for this job");
  //   }
  // };

  const getDepartments = () => {
    const departments = [...new Set(jobs.map(job => job.department).filter(Boolean))];
    return departments;
  };

  const getLocations = () => {
    const locations = [...new Set(jobs.map(job => job.location).filter(Boolean))];
    return locations;
  };

  const hasApplied = (jobId) => {
    return applications.some(
      (app) =>
        app.jobId === jobId ||
        app.jobId?._id === jobId
    );
  };

  const handleApply = async (jobId, jobTitle) => {
    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("candidateName", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone || "N/A");
      // resume optional for Now (set null)
      formData.append("resume", "");

      await axios.post(
        "http://localhost:5000/api/applications/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`

          },
        }
      );

      // SUCCESS TOAST
      const toast = document.createElement("div");
      toast.className =
        "alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3";
      toast.style.zIndex = "1060";
      toast.innerHTML = `
        <strong>Application Submitted!</strong> You applied for "${jobTitle}".
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
      document.body.appendChild(toast);

      setTimeout(() => toast.remove(), 4000);

      // Refresh applications to update UI
      loadUserApplications();

    } catch (err) {
      alert(err.response?.data?.message || "Unable to apply for this job. Try again.");
    }
  };


  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading job opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item active text-white-50" aria-current="page">Jobs</li>
            </ol>
          </nav>
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-3">Available Job Opportunities</h1>
              <p className="lead mb-4 opacity-75">
                Discover your next career move with our exciting job openings across various departments
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-white text-primary px-3 py-2">
                  <i className="bi bi-briefcase me-2"></i>
                  {jobs.length} Open Positions
                </span>
                <span className="badge bg-white bg-opacity-25 text-white px-3 py-2">
                  <i className="bi bi-building me-2"></i>
                  {getDepartments().length} Departments
                </span>
                <span className="badge bg-white bg-opacity-25 text-white px-3 py-2">
                  <i className="bi bi-geo-alt me-2"></i>
                  {getLocations().length} Locations
                </span>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4">
                <i className="bi bi-briefcase display-4 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="container py-4 bg-light rounded-bottom">
        <div className="row g-3 align-items-end">
          <div className="col-lg-4 col-md-6">
            <label htmlFor="jobSearch" className="form-label fw-semibold">Search Jobs</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                id="jobSearch"
                className="form-control border-start-0"
                placeholder="Job title, department, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <label htmlFor="departmentFilter" className="form-label fw-semibold">Department</label>
            <select
              id="departmentFilter"
              className="form-select"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {getDepartments().map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="col-lg-2 col-md-6">
            <label htmlFor="locationFilter" className="form-label fw-semibold">Location</label>
            <select
              id="locationFilter"
              className="form-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              {getLocations().map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className="col-lg-2 col-md-6">
            <label htmlFor="sortBy" className="form-label fw-semibold">Sort By</label>
            <select
              id="sortBy"
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Job Title A-Z</option>
            </select>
          </div>
          <div className="col-lg-2 col-md-12">
            <div className="card bg-white border-0 h-100">
              <div className="card-body py-2 text-center">
                <small className="text-muted d-block">Showing</small>
                <strong className="text-primary">{filteredJobs.length}</strong>
                <small className="text-muted"> of </small>
                <strong>{jobs.length}</strong>
                <small className="text-muted d-block">jobs</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="container py-5">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-5">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '100px', height: '100px' }}>
              <i className="bi bi-briefcase display-6 text-muted"></i>
            </div>
            <h4 className="text-muted mb-3">
              {jobs.length === 0 ? "No open positions available" : "No jobs match your filters"}
            </h4>
            <p className="text-muted mb-4">
              {jobs.length === 0
                ? "Check back later for new opportunities"
                : "Try adjusting your search criteria or filters"
              }
            </p>
            {(searchTerm || departmentFilter !== "all" || locationFilter !== "all") && (
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  setSearchTerm("");
                  setDepartmentFilter("all");
                  setLocationFilter("all");
                }}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="row g-4">
            {filteredJobs.map((job) => {
              const applied = hasApplied(job._id);

              return (
                <div key={job._id} className="col-xl-4 col-lg-6 col-md-6">
                  <div className="card border-0 shadow-sm h-100 job-card">
                    <div className="card-header bg-transparent border-0 pb-0">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="card-title fw-bold text-dark mb-1">{job.title}</h5>
                          <span className="badge bg-primary bg-opacity-10 text-primary">
                            {job.department}
                          </span>
                        </div>
                        {applied && (
                          <span className="badge bg-success">
                            <i className="bi bi-check-circle me-1"></i>
                            Applied
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="card-body">
                      {/* Company and Location */}
                      <div className="mb-3">
                        <div className="d-flex align-items-center text-muted mb-2">
                          <i className="bi bi-building me-2"></i>
                          <small>{job.company || "Our Company"}</small>
                        </div>
                        <div className="d-flex align-items-center text-muted">
                          <i className="bi bi-geo-alt me-2"></i>
                          <small>{job.location || "Remote"}</small>
                        </div>
                      </div>

                      {/* Job Description */}
                      <p className="card-text text-muted small mb-3">
                        {job.description?.substring(0, 120)}...
                      </p>

                      {/* Requirements */}
                      {job.requirements && (
                        <div className="mb-3">
                          <h6 className="fw-semibold text-dark mb-2">Key Requirements:</h6>
                          <div className="d-flex flex-wrap gap-1">
                            {job.requirements.split(',').slice(0, 3).map((req, index) => (
                              <span key={index} className="badge bg-light text-dark border small">
                                {req.trim()}
                              </span>
                            ))}
                            {job.requirements.split(',').length > 3 && (
                              <span className="badge bg-light text-muted border small">
                                +{job.requirements.split(',').length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Job Meta Information */}
                      <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                        <div>
                          <i className="bi bi-clock me-1"></i>
                          {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <i className="bi bi-people me-1"></i>
                          {job.vacancies || 1} position
                        </div>
                        <div>
                          <i className="bi bi-cash me-1"></i>
                          {job.salary || "Competitive"}
                        </div>
                      </div>

                      {/* Apply Button */}
                      {/* <div className="d-grid">
                        <button
                          className={`btn fw-semibold py-2 ${applied
                            ? "btn-outline-success"
                            : "btn-primary"
                            }`}
                          onClick={() => !applied && handleApply(job._id, job.title)}
                          disabled={applied}
                        >
                          {applied ? (
                            <>
                              <i className="bi bi-check-circle me-2"></i>
                              Applied Successfully
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-2"></i>
                              Apply Now
                            </>
                          )}
                        </button>
                      </div> */}
                      <Link
                        to={`/apply/${job._id}`}
                        className={`btn fw-semibold py-2 d-block text-center ${applied ? "btn-outline-success" : "btn-primary"}`}
                        onClick={(e) => applied && e.preventDefault()}
                      >
                        {applied ? (
                          <>
                            <i className="bi bi-check-circle me-2"></i>
                            Applied Successfully
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Apply Now
                          </>
                        )}
                      </Link>

                      {/* Quick Actions */}
                      <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-outline-secondary btn-sm flex-fill">
                          <i className="bi bi-eye me-1"></i>
                          View Details
                        </button>
                        <button className="btn btn-outline-primary btn-sm flex-fill">
                          <i className="bi bi-share me-1"></i>
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="container py-5 border-top">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <div className="bg-light rounded-3 p-5">
              <h3 className="fw-bold text-dark mb-3">Can't find what you're looking for?</h3>
              <p className="text-muted mb-4 lead">
                Join our talent community and we'll notify you when matching positions become available.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button className="btn btn-primary btn-lg px-4">
                  <i className="bi bi-bell me-2"></i>
                  Get Job Alerts
                </button>
                <Link to="/applications" className="btn btn-outline-primary btn-lg px-4">
                  <i className="bi bi-send-check me-2"></i>
                  View My Applications
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bootstrap JavaScript for interactive components */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Jobs;