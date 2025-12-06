import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const JobStatus = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [activeApplication, setActiveApplication] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    offers: 0,
    rejected: 0,
    successRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadUserApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/user/${user._id}`
      );
      setApplications(res.data);
      if (res.data.length > 0) {
        setActiveApplication(res.data[0]._id);
      }
      calculateStats(res.data);
    } catch (error) {
      console.error("Error loading applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (apps) => {
    const total = apps.length;
    const inProgress = apps.filter(app => 
      ["applied", "reviewed", "shortlisted", "interview"].includes(app.status)
    ).length;
    const offers = apps.filter(app => app.status === "offered").length;
    const rejected = apps.filter(app => app.status === "rejected").length;
    const successRate = total > 0 ? Math.round((offers / total) * 100) : 0;

    setStats({ total, inProgress, offers, rejected, successRate });
  };

  useEffect(() => {
    loadUserApplications();
  }, []);

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

  const getSelectedApplication = () => {
    return applications.find(app => app._id === activeApplication);
  };

  const getTimelineEvents = (application) => {
    const events = [
      {
        date: application.appliedAt,
        title: "Application Submitted",
        description: "Your application has been received and is under review",
        status: "completed",
        icon: "bi-send-check"
      }
    ];

    if (["reviewed", "shortlisted", "interview", "offered"].includes(application.status)) {
      events.push({
        date: application.updatedAt,
        title: "Under Review",
        description: "HR team is reviewing your application and qualifications",
        status: "completed",
        icon: "bi-search"
      });
    }

    if (["shortlisted", "interview", "offered"].includes(application.status)) {
      events.push({
        date: application.updatedAt,
        title: "Shortlisted",
        description: "You have been shortlisted for the next round",
        status: "completed",
        icon: "bi-star"
      });
    }

    if (["interview", "offered"].includes(application.status)) {
      events.push({
        date: application.interviewDate || application.updatedAt,
        title: "Interview Scheduled",
        description: "Interview has been scheduled with the hiring team",
        status: "completed",
        icon: "bi-calendar-event"
      });
    }

    if (application.status === "offered") {
      events.push({
        date: application.updatedAt,
        title: "Offer Extended",
        description: "Congratulations! A formal job offer has been extended",
        status: "completed",
        icon: "bi-award"
      });
    }

    if (application.status === "rejected") {
      events.push({
        date: application.updatedAt,
        title: "Application Closed",
        description: "This position has been filled by another candidate",
        status: "cancelled",
        icon: "bi-x-circle"
      });
    }

    return events;
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading your application status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0">
      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item active text-white-50" aria-current="page">Application Status</li>
            </ol>
          </nav>
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-3">Application Status Center</h1>
              <p className="lead mb-4 opacity-75">
                Track your job application progress and timelines in real-time
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary bg-opacity-25 text-white px-3 py-2">
                  <i className="bi bi-person me-2"></i>
                  {user.name}
                </span>
                <span className="badge bg-success bg-opacity-25 text-white px-3 py-2">
                  <i className="bi bi-envelope me-2"></i>
                  {user.email}
                </span>
                <span className="badge bg-info bg-opacity-25 text-white px-3 py-2">
                  <i className="bi bi-graph-up me-2"></i>
                  {stats.successRate}% Success Rate
                </span>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-primary bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center p-4">
                <i className="bi bi-speedometer2 display-4 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="container py-4">
        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 bg-primary text-white shadow">
              <div className="card-body text-center p-4">
                <i className="bi bi-send-check display-6 mb-3 opacity-75"></i>
                <h2 className="fw-bold mb-1">{stats.total}</h2>
                <p className="mb-0 opacity-75">Total Applications</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 bg-info text-white shadow">
              <div className="card-body text-center p-4">
                <i className="bi bi-clock-history display-6 mb-3 opacity-75"></i>
                <h2 className="fw-bold mb-1">{stats.inProgress}</h2>
                <p className="mb-0 opacity-75">In Progress</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 bg-success text-white shadow">
              <div className="card-body text-center p-4">
                <i className="bi bi-award display-6 mb-3 opacity-75"></i>
                <h2 className="fw-bold mb-1">{stats.offers}</h2>
                <p className="mb-0 opacity-75">Offers Received</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 bg-warning text-white shadow">
              <div className="card-body text-center p-4">
                <i className="bi bi-graph-up display-6 mb-3 opacity-75"></i>
                <h2 className="fw-bold mb-1">{stats.successRate}%</h2>
                <p className="mb-0 opacity-75">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-4">
        <div className="row">
          {/* Applications List */}
          <div className="col-lg-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0">
                <h5 className="card-title fw-bold mb-0">Your Applications</h5>
              </div>
              <div className="card-body p-0">
                {applications.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                    <p className="text-muted mb-0">No applications yet</p>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {applications.map((application) => (
                      <button
                        key={application._id}
                        className={`list-group-item list-group-item-action border-0 ${
                          activeApplication === application._id ? 'bg-primary text-white' : ''
                        }`}
                        onClick={() => setActiveApplication(application._id)}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className={`mb-1 ${activeApplication === application._id ? 'text-white' : 'text-dark'}`}>
                              {application.jobId?.title || "Untitled Position"}
                            </h6>
                            <small className={activeApplication === application._id ? 'text-white-50' : 'text-muted'}>
                              {application.jobId?.department}
                            </small>
                          </div>
                          {getStatusBadge(application.status)}
                        </div>
                        <small className={activeApplication === application._id ? 'text-white-50' : 'text-muted'}>
                          Applied {new Date(application.appliedAt).toLocaleDateString()}
                        </small>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timeline View */}
          <div className="col-lg-8">
            {applications.length === 0 ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <i className="bi bi-send display-1 text-muted mb-3"></i>
                  <h4 className="text-muted mb-3">No applications yet</h4>
                  <p className="text-muted mb-4">Start applying to jobs to track your progress here</p>
                  <Link to="/jobs" className="btn btn-primary btn-lg">
                    <i className="bi bi-briefcase me-2"></i>
                    Browse Jobs
                  </Link>
                </div>
              </div>
            ) : !activeApplication ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <i className="bi bi-cursor display-1 text-muted mb-3"></i>
                  <p className="text-muted">Select an application to view its timeline</p>
                </div>
              </div>
            ) : (
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title fw-bold mb-1">
                        {getSelectedApplication()?.jobId?.title}
                      </h5>
                      <p className="text-muted mb-0">
                        {getSelectedApplication()?.jobId?.department} • 
                        {getSelectedApplication()?.jobId?.company}
                      </p>
                    </div>
                    {getStatusBadge(getSelectedApplication()?.status)}
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="fw-semibold text-dark mb-4">Application Timeline</h6>
                  
                  <div className="timeline">
                    {getTimelineEvents(getSelectedApplication()).map((event, index) => (
                      <div key={index} className="timeline-item d-flex position-relative mb-4">
                        <div className="timeline-badge">
                          <div className={`rounded-circle d-flex align-items-center justify-content-center ${
                            event.status === "completed" ? "bg-primary" : "bg-secondary"
                          }`} style={{width: '40px', height: '40px'}}>
                            <i className={`bi ${event.icon} text-white`}></i>
                          </div>
                          {index < getTimelineEvents(getSelectedApplication()).length - 1 && (
                            <div className="timeline-line position-absolute start-50 translate-middle-x bg-light" 
                                 style={{height: 'calc(100% - 40px)', top: '40px', width: '2px'}}></div>
                          )}
                        </div>
                        <div className="timeline-content ms-4 flex-grow-1">
                          <div className="card border-0 bg-light">
                            <div className="card-body">
                              <h6 className="card-title fw-bold text-dark mb-1">{event.title}</h6>
                              <p className="card-text text-muted small mb-2">{event.description}</p>
                              <small className="text-muted">
                                <i className="bi bi-clock me-1"></i>
                                {new Date(event.date).toLocaleDateString()} at{" "}
                                {new Date(event.date).toLocaleTimeString()}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Next Steps */}
                  <div className="mt-4">
                    <div className="alert alert-info border-0">
                      <h6 className="alert-heading fw-semibold mb-2">
                        <i className="bi bi-lightbulb me-2"></i>
                        Next Steps
                      </h6>
                      <p className="mb-0 small">
                        {getSelectedApplication()?.status === "applied" && 
                          "Wait for HR to review your application. This typically takes 3-5 business days."}
                        {getSelectedApplication()?.status === "reviewed" && 
                          "Your application is under review. You may be contacted for further assessment."}
                        {getSelectedApplication()?.status === "shortlisted" && 
                          "Congratulations! You've been shortlisted. Expect an interview invitation soon."}
                        {getSelectedApplication()?.status === "interview" && 
                          "Interview scheduled. Prepare by reviewing the job requirements and company information."}
                        {getSelectedApplication()?.status === "offered" && 
                          "Offer received! Please review the offer details and respond by the specified deadline."}
                        {getSelectedApplication()?.status === "rejected" && 
                          "This position has been filled. Continue exploring other opportunities that match your skills."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container py-4 border-top">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h5 className="fw-bold text-dark mb-4 text-center">Quick Actions</h5>
            <div className="row g-3">
              <div className="col-md-3 col-6">
                <Link to="/jobs" className="btn btn-outline-primary w-100 h-100 py-3">
                  <i className="bi bi-briefcase display-6 d-block mb-2"></i>
                  Browse Jobs
                </Link>
              </div>
              <div className="col-md-3 col-6">
                <Link to="/applications" className="btn btn-outline-success w-100 h-100 py-3">
                  <i className="bi bi-send-check display-6 d-block mb-2"></i>
                  All Applications
                </Link>
              </div>
              <div className="col-md-3 col-6">
                <button className="btn btn-outline-info w-100 h-100 py-3">
                  <i className="bi bi-download display-6 d-block mb-2"></i>
                  Download CV
                </button>
              </div>
              <div className="col-md-3 col-6">
                <button className="btn btn-outline-warning w-100 h-100 py-3">
                  <i className="bi bi-person-circle display-6 d-block mb-2"></i>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobStatus;