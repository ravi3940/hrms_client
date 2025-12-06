import React, { useEffect, useState } from "react";
import axios from "axios";

const InterviewScheduler = () => {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("schedule");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    applicationId: "",
    candidateId: "",
    jobId: "",
    interviewType: "Technical",
    date: "",
    time: "",
    interviewer: "",
    status: "Scheduled"
  });

  const token = localStorage.getItem("token");

  // Fetch shortlisted candidates
  const loadShortlisted = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/applications", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setApplications(res.data.applications || res.data || []);
    } catch (error) {
      console.error("Error loading applications:", error);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // Fetch scheduled interviews
  const loadInterviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/interviews", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setInterviews(res.data.interviews || []);
    } catch (error) {
      console.error("Error loading interviews:", error);
      alert("Failed to load interviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShortlisted();
    loadInterviews();
  }, []);

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "applicationId") {
      const selectedApp = applications.find(app => app._id === value);
      if (selectedApp) {
        setForm(prev => ({
          ...prev,
          applicationId: value,
          candidateId: selectedApp.userId?._id || selectedApp.candidateId,
          jobId: selectedApp.jobId?._id || selectedApp.jobId
        }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit Interview
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.applicationId || !form.date || !form.time) {
      return alert("Please fill all required fields.");
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/interviews/schedule",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Interview Scheduled Successfully!");
      loadInterviews();
      setActiveTab("manage");

      // Reset form
      setForm({
        applicationId: "",
        candidateId: "",
        jobId: "",
        interviewType: "Technical",
        date: "",
        time: "",
        interviewer: "",
        status: "Scheduled"
      });
    } catch (error) {
      console.error("Error scheduling interview:", error);
      alert("Failed to schedule interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update Interview Status
  const updateInterviewStatus = async (interviewId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/interviews/${interviewId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Interview status updated successfully!");
      loadInterviews();
    } catch (error) {
      console.error("Error updating interview status:", error);
      alert("Failed to update interview status. Please try again.");
    }
  };

  // Cancel Interview
  const cancelInterview = async (interviewId) => {
    if (window.confirm("Are you sure you want to cancel this interview?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/interviews/${interviewId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Interview cancelled successfully!");
        loadInterviews();
      } catch (error) {
        console.error("Error cancelling interview:", error);
        alert("Failed to cancel interview. Please try again.");
      }
    }
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-primary";
      case "Pending":
        return "bg-secondary";
      case "Selected":
        return "bg-success";
      case "Next_Round":
        return "bg-info";
      case "Rejected":
        return "bg-danger";
      case "Completed":
        return "bg-warning text-dark";
      case "Cancelled":
        return "bg-dark";
      default:
        return "bg-secondary";
    }
  };

  // Format status for display
  const formatStatus = (status) => {
    return status.replace(/_/g, ' ');
  };

  // Filter interviews based on status and search
  const filteredInterviews = interviews.filter(interview => {
    const matchesStatus = filterStatus === "all" || interview.status === filterStatus;
    const matchesSearch = interview.candidateId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div>
              <h1 className="h2 fw-bold text-primary mb-2">Interview Scheduler</h1>
              <p className="text-muted mb-0">Manage and schedule candidate interviews efficiently</p>
            </div>
            <div className="mt-2 mt-md-0">
              <span className="badge bg-light text-dark fs-6">
                Total Interviews: {interviews.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body p-2">
              <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "schedule" ? "active" : ""}`}
                    onClick={() => setActiveTab("schedule")}
                  >
                    <i className="bi bi-calendar-plus me-2"></i>
                    Schedule Interview
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "manage" ? "active" : ""}`}
                    onClick={() => setActiveTab("manage")}
                  >
                    <i className="bi bi-list-task me-2"></i>
                    Manage Interviews
                    <span className="badge bg-primary ms-2">{interviews.length}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Form */}
      {activeTab === "schedule" && (
        <div className="row">
          <div className="col-12 col-lg-8 mx-auto">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white py-3">
                <h5 className="card-title mb-0">
                  <i className="bi bi-calendar-event me-2"></i>
                  Schedule New Interview
                </h5>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Candidate Selection */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">Select Candidate *</label>
                      <select
                        className="form-select form-select-lg"
                        name="applicationId"
                        value={form.applicationId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose a candidate...</option>
                        {applications.map((app) => (
                          <option key={app._id} value={app._id}>
                            {app.userId?.name} — {app.jobId?.title}
                            {app.userId?.email ? ` (${app.userId.email})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Interview Type and Date */}
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Interview Type</label>
                      <select
                        className="form-select"
                        name="interviewType"
                        value={form.interviewType}
                        onChange={handleChange}
                      >
                        <option value="Technical">Technical Interview</option>
                        <option value="HR Round">HR Round</option>
                        <option value="Managerial">Managerial Round</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Interview Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={getTodayDate()}
                        required
                      />
                    </div>

                    {/* Time and Interviewer */}
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Time *</label>
                      <input
                        type="time"
                        className="form-control"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Interviewer</label>
                      <input
                        className="form-control"
                        placeholder="Enter interviewer name..."
                        name="interviewer"
                        value={form.interviewer}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          type="button"
                          className="btn btn-outline-secondary me-md-2"
                          onClick={() => setForm({
                            applicationId: "",
                            candidateId: "",
                            jobId: "",
                            interviewType: "Technical",
                            date: "",
                            time: "",
                            interviewer: "",
                            status: "Scheduled"
                          })}
                        >
                          Reset Form
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary px-4"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Scheduling...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-calendar-check me-2"></i>
                              Schedule Interview
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Interviews */}
      {activeTab === "manage" && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="card-title mb-2 mb-md-0">
                      <i className="bi bi-list-task me-2 text-primary"></i>
                      Interview Management
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-column flex-md-row gap-2">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-search"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search candidates or positions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <select
                        className="form-select form-select-sm"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Selected">Selected</option>
                        <option value="Next_Round">Next Round</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Candidate & Position</th>
                        <th>Interview Details</th>
                        <th>Schedule</th>
                        <th>Status</th>
                        <th className="text-center pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInterviews.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-5">
                            <div className="text-muted">
                              <i className="bi bi-calendar-x display-4 d-block mb-3"></i>
                              <h5>No interviews found</h5>
                              <p className="mb-0">No interviews match your current filters.</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredInterviews.map((iv) => (
                          <tr key={iv._id} className="border-bottom">
                            <td className="ps-4">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: '40px', height: '40px' }}>
                                    <i className="bi bi-person-fill"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1 fw-semibold">{iv.candidateId?.name || "N/A"}</h6>
                                  <p className="text-muted mb-0 small">{iv.jobId?.title || "N/A"}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <span className="badge bg-light text-dark mb-1">{iv.interviewType}</span>
                                <div className="small text-muted">
                                  <i className="bi bi-person me-1"></i>
                                  {iv.interviewer || "Not assigned"}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="text-nowrap">
                                <div className="fw-semibold">
                                  {new Date(iv.date).toLocaleDateString()}
                                </div>
                                <div className="text-muted small">
                                  <i className="bi bi-clock me-1"></i>
                                  {iv.time}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${getStatusBadgeClass(iv.status)}`}>
                                {formatStatus(iv.status)}
                              </span>
                            </td>
                            <td className="text-center pe-4">
                              <div className="btn-group" role="group">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-sm btn-outline-primary dropdown-toggle d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                    <span className="d-none d-md-inline ms-1">Update</span>
                                  </button>

                                  <ul className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: "280px" }}>
                                    <li className="mb-2">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0">Update Status</h6>
                                        <span className={`badge ${getStatusBadgeClass(iv.status)}`}>
                                          {formatStatus(iv.status)}
                                        </span>
                                      </div>
                                      <small className="text-muted">{iv.candidateId?.name}</small>
                                    </li>

                                    <li><hr className="my-2" /></li>

                                    {/* Status Grid */}
                                    <li>
                                      <div className="container-fluid">
                                        <div className="row g-2">
                                          <div className="col-4">
                                            <button
                                              className="btn btn-outline-primary w-100 h-100 p-2 d-flex flex-column"
                                              onClick={() => updateInterviewStatus(iv._id, "Scheduled")}
                                            >
                                              <span className="fs-5">📅</span>
                                              <small>Scheduled</small>
                                            </button>
                                          </div>
                                          <div className="col-4">
                                            <button
                                              className="btn btn-outline-secondary w-100 h-100 p-2 d-flex flex-column"
                                              onClick={() => updateInterviewStatus(iv._id, "Pending")}
                                            >
                                              <span className="fs-5">⏳</span>
                                              <small>Pending</small>
                                            </button>
                                          </div>
                                          <div className="col-4">
                                            <button
                                              className="btn btn-outline-success w-100 h-100 p-2 d-flex flex-column"
                                              onClick={() => updateInterviewStatus(iv._id, "Completed")}
                                            >
                                              <span className="fs-5">✅</span>
                                              <small>Completed</small>
                                            </button>
                                          </div>
                                          <div className="col-4">
                                            <button
                                              className="btn btn-outline-success w-100 h-100 p-2 d-flex flex-column"
                                              onClick={() => updateInterviewStatus(iv._id, "Selected")}
                                            >
                                              <span className="fs-5">🎉</span>
                                              <small>Selected</small>
                                            </button>
                                          </div>
                                          <div className="col-4">
                                            <button
                                              className="btn btn-outline-info w-100 h-100 p-2 d-flex flex-column"
                                              onClick={() => updateInterviewStatus(iv._id, "Next_Round")}
                                            >
                                              <span className="fs-5">🔄</span>
                                              <small>Next Round</small>
                                            </button>
                                          </div>
                                          <div className="col-4">
                                            <button
                                              className="btn btn-outline-danger w-100 h-100 p-2 d-flex flex-column"
                                              onClick={() => updateInterviewStatus(iv._id, "Rejected")}
                                            >
                                              <span className="fs-5">❌</span>
                                              <small>Rejected</small>
                                            </button>
                                          </div>
                                          <div className="col-12 mt-1">
                                            <button
                                              className="btn btn-outline-dark w-100 p-2 d-flex justify-content-center align-items-center"
                                              onClick={() => updateInterviewStatus(iv._id, "Cancelled")}
                                            >
                                              <span className="fs-5 me-2">🚫</span>
                                              Cancel Interview
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <button
                                  className="btn btn-sm btn-outline-danger ms-1"
                                  onClick={() => cancelInterview(iv._id)}
                                  title="Cancel Interview"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      {activeTab === "manage" && interviews.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <div className="card bg-primary bg-opacity-10 border-0">
                  <div className="card-body text-center">
                    <h3 className="text-primary mb-1">
                      {interviews.filter(iv => iv.status === "Scheduled").length}
                    </h3>
                    <small className="text-muted">Scheduled</small>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card bg-success bg-opacity-10 border-0">
                  <div className="card-body text-center">
                    <h3 className="text-success mb-1">
                      {interviews.filter(iv => iv.status === "Selected").length}
                    </h3>
                    <small className="text-muted">Selected</small>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card bg-warning bg-opacity-10 border-0">
                  <div className="card-body text-center">
                    <h3 className="text-warning mb-1">
                      {interviews.filter(iv => iv.status === "Pending").length}
                    </h3>
                    <small className="text-muted">Pending</small>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card bg-danger bg-opacity-10 border-0">
                  <div className="card-body text-center">
                    <h3 className="text-danger mb-1">
                      {interviews.filter(iv => iv.status === "Rejected").length}
                    </h3>
                    <small className="text-muted">Rejected</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewScheduler;