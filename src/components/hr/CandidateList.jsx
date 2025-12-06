import React, { useEffect, useState } from "react";
import axios from "axios";
import OfferCreate from "./OfferCreate";

// const CandidateList = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
//   const [filteredCandidates, setFilteredCandidates] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [selectedMultiple, setSelectedMultiple] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("single");

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:5000/api/applications", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         console.log("API Response:", response.data);

//         // Handle different response structures
//         let candidatesData = [];
        
//         if (Array.isArray(response.data)) {
//           candidatesData = response.data;
//         } else if (Array.isArray(response.data.applications)) {
//           candidatesData = response.data.applications;
//         } else if (response.data.data && Array.isArray(response.data.data)) {
//           candidatesData = response.data.data;
//         } else {
//           console.warn("Unexpected API response structure:", response.data);
//         }

//         setCandidates(candidatesData);
        
//         // Filter only shortlisted candidates
//         const shortlisted = candidatesData.filter(candidate => 
//           candidate.status === 'shortlisted'
//         );
//         setShortlistedCandidates(shortlisted);
//         setFilteredCandidates(shortlisted);
        
//       } catch (err) {
//         console.error("Error fetching candidates:", err);
//         setError("Failed to load candidates");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   // Search functionality
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredCandidates(shortlistedCandidates);
//     } else {
//       const filtered = shortlistedCandidates.filter(candidate => {
//         const searchLower = searchTerm.toLowerCase();
//         return (
//           (candidate.userId?.name || candidate.name || "").toLowerCase().includes(searchLower) ||
//           (candidate.userId?.email || candidate.email || "").toLowerCase().includes(searchLower) ||
//           (candidate.jobId?.title || candidate.jobTitle || "").toLowerCase().includes(searchLower) ||
//           (candidate.jobId?.department || candidate.department || "").toLowerCase().includes(searchLower)
//         );
//       });
//       setFilteredCandidates(filtered);
//     }
//   }, [searchTerm, shortlistedCandidates]);

//   const handleBack = () => {
//     setSelected(null);
//     setSelectedMultiple([]);
//     setViewMode("single");
//   };

//   const handleSingleSelect = (candidate) => {
//     setSelected(candidate);
//     setViewMode("single");
//   };

//   const handleMultipleSelect = (candidateId) => {
//     setSelectedMultiple(prev => {
//       if (prev.includes(candidateId)) {
//         return prev.filter(id => id !== candidateId);
//       } else {
//         return [...prev, candidateId];
//       }
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedMultiple.length === filteredCandidates.length) {
//       setSelectedMultiple([]);
//     } else {
//       setSelectedMultiple(filteredCandidates.map(candidate => candidate._id));
//     }
//   };

//   const handleGenerateMultipleOffers = () => {
//     if (selectedMultiple.length === 0) {
//       alert("Please select at least one candidate to generate offers");
//       return;
//     }
//     setViewMode("multiple");
//   };

//   const getSelectedCandidateData = () => {
//     return filteredCandidates.filter(candidate => 
//       selectedMultiple.includes(candidate._id)
//     );
//   };

//   if (loading) {
//     return (
//       <div className="container mt-4">
//         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
//           <div className="text-center">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-2 text-muted">Loading candidates...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-4">
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold text-primary mb-0">Shortlisted Candidates</h2>
//         <div className="text-muted">
//           Showing: {filteredCandidates.length} of {shortlistedCandidates.length} candidate(s)
//         </div>
//       </div>
//       <hr />

//       {!selected && viewMode !== "multiple" ? (
//         <div className="card shadow-sm">
//           <div className="card-body">
//             {/* Search and Action Bar */}
//             <div className="row mb-4">
//               <div className="col-md-6">
//                 <div className="input-group">
//                   <span className="input-group-text bg-light border-end-0">
//                     <i className="bi bi-search text-muted"></i>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control border-start-0"
//                     placeholder="Search by name, email, job role, or department..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-6 d-flex justify-content-end gap-2">
//                 {selectedMultiple.length > 0 && (
//                   <button
//                     className="btn btn-success"
//                     onClick={handleGenerateMultipleOffers}
//                   >
//                     <i className="bi bi-file-earmark-pdf me-2"></i>
//                     Generate Offers ({selectedMultiple.length})
//                   </button>
//                 )}
//                 <button
//                   className={`btn ${viewMode === "multiple" ? "btn-primary" : "btn-outline-primary"}`}
//                   onClick={() => setViewMode(viewMode === "multiple" ? "single" : "multiple")}
//                 >
//                   <i className={`bi ${viewMode === "multiple" ? "bi-check-square" : "bi-square"} me-2`}></i>
//                   {viewMode === "multiple" ? "Multi-Select Mode" : "Select Multiple"}
//                 </button>
//               </div>
//             </div>

//             {filteredCandidates.length === 0 ? (
//               <div className="text-center py-4">
//                 <i className="bi bi-people display-1 text-muted"></i>
//                 <h5 className="mt-3 text-muted">
//                   {searchTerm ? "No matching candidates found" : "No shortlisted candidates"}
//                 </h5>
//                 <p className="text-muted">
//                   {searchTerm 
//                     ? "Try adjusting your search terms" 
//                     : "There are no shortlisted candidates available for offer creation."
//                   }
//                 </p>
//                 {searchTerm && (
//                   <button 
//                     className="btn btn-outline-secondary mt-2"
//                     onClick={() => setSearchTerm("")}
//                   >
//                     Clear Search
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover mb-0">
//                   <thead className="table-dark">
//                     <tr>
//                       {viewMode === "multiple" && (
//                         <th style={{ width: '50px' }}>
//                           <div className="form-check">
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               checked={selectedMultiple.length === filteredCandidates.length && filteredCandidates.length > 0}
//                               onChange={handleSelectAll}
//                             />
//                           </div>
//                         </th>
//                       )}
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Job Role</th>
//                       <th>Department</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredCandidates.map((candidate) => (
//                       <tr key={candidate._id}>
//                         {viewMode === "multiple" && (
//                           <td>
//                             <div className="form-check">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 checked={selectedMultiple.includes(candidate._id)}
//                                 onChange={() => handleMultipleSelect(candidate._id)}
//                               />
//                             </div>
//                           </td>
//                         )}
//                         <td>
//                           <strong>{candidate.userId?.name || candidate.name || "N/A"}</strong>
//                         </td>
//                         <td>{candidate.userId?.email || candidate.email || "N/A"}</td>
//                         <td>{candidate.jobId?.title || candidate.jobTitle || "N/A"}</td>
//                         <td>
//                           <span className="badge bg-secondary">
//                             {candidate.jobId?.department || candidate.department || "N/A"}
//                           </span>
//                         </td>
//                         <td>
//                           <span className="badge bg-success">
//                             {candidate.status || 'shortlisted'}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="d-flex gap-2">
//                             <button
//                               className="btn btn-primary btn-sm"
//                               onClick={() => handleSingleSelect(candidate)}
//                               title="Create offer letter for this candidate"
//                             >
//                               <i className="bi bi-file-earmark-text me-1"></i>
//                               Create Offer
//                             </button>
//                             {viewMode === "multiple" && (
//                               <button
//                                 className={`btn btn-sm ${selectedMultiple.includes(candidate._id) ? 'btn-success' : 'btn-outline-success'}`}
//                                 onClick={() => handleMultipleSelect(candidate._id)}
//                                 title={selectedMultiple.includes(candidate._id) ? 'Selected' : 'Select for batch processing'}
//                               >
//                                 <i className={`bi ${selectedMultiple.includes(candidate._id) ? 'bi-check-lg' : 'bi-plus'}`}></i>
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Selection Summary */}
//             {viewMode === "multiple" && selectedMultiple.length > 0 && (
//               <div className="alert alert-info mt-3 mb-0">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <span>
//                     <i className="bi bi-info-circle me-2"></i>
//                     <strong>{selectedMultiple.length}</strong> candidate(s) selected for batch offer generation
//                   </span>
//                   <button
//                     className="btn btn-sm btn-success"
//                     onClick={handleGenerateMultipleOffers}
//                   >
//                     <i className="bi bi-file-earmark-pdf me-1"></i>
//                     Generate All Offers
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : viewMode === "multiple" ? (
//         <div>
//           <button 
//             className="btn btn-outline-secondary mb-3"
//             onClick={handleBack}
//           >
//             <i className="bi bi-arrow-left me-2"></i>
//             Back to Candidates
//           </button>
          
//           <div className="card shadow-sm">
//             <div className="card-header bg-primary text-white">
//               <h5 className="mb-0">
//                 <i className="bi bi-file-earmark-pdf me-2"></i>
//                 Batch Offer Generation
//               </h5>
//             </div>
//             <div className="card-body">
//               <div className="alert alert-warning">
//                 <i className="bi bi-exclamation-triangle me-2"></i>
//                 <strong>Batch Processing:</strong> You are about to generate offer letters for {selectedMultiple.length} candidates.
//                 The system will process them one by one.
//               </div>

//               <div className="mb-4">
//                 <h6>Selected Candidates:</h6>
//                 <div className="row">
//                   {getSelectedCandidateData().map((candidate, index) => (
//                     <div key={candidate._id} className="col-md-6 mb-2">
//                       <div className="card border">
//                         <div className="card-body py-2">
//                           <div className="d-flex justify-content-between align-items-center">
//                             <div>
//                               <strong>{candidate.userId?.name || candidate.name}</strong>
//                               <br />
//                               <small className="text-muted">
//                                 {candidate.jobId?.title} • {candidate.userId?.email}
//                               </small>
//                             </div>
//                             <span className="badge bg-primary">#{index + 1}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="d-flex gap-3">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => {
//                     // Start with the first candidate
//                     setSelected(getSelectedCandidateData()[0]);
//                     setViewMode("single");
//                   }}
//                 >
//                   <i className="bi bi-play-circle me-2"></i>
//                   Start Generating Offers
//                 </button>
//                 <button
//                   className="btn btn-outline-secondary"
//                   onClick={handleBack}
//                 >
//                   Cancel Batch Processing
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <button 
//             className="btn btn-outline-secondary mb-3"
//             onClick={handleBack}
//           >
//             <i className="bi bi-arrow-left me-2"></i>
//             Back to Candidates
//           </button>
//           <OfferCreate selectedCandidate={selected} onBack={handleBack} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CandidateList;






const CandidateList = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // "list", "details", or "offer"
  const [statusFilter, setStatusFilter] = useState("all");
  const [batchMode, setBatchMode] = useState(false);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/interviews", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Interviews API Response:", response.data);

        // Handle different response structures
        let interviewsData = [];
        
        if (Array.isArray(response.data)) {
          interviewsData = response.data;
        } else if (Array.isArray(response.data.interviews)) {
          interviewsData = response.data.interviews;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          interviewsData = response.data.data;
        } else {
          console.warn("Unexpected API response structure:", response.data);
          interviewsData = [];
        }

        setInterviews(interviewsData);
        
      } catch (err) {
        console.error("Error fetching interviews:", err);
        setError("Failed to load interviews");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleViewDetails = (interview) => {
    setSelectedInterview(interview);
    setViewMode("details");
  };

  const handleBackToList = () => {
    setSelectedInterview(null);
    setSelectedCandidates([]);
    setViewMode("list");
    setBatchMode(false);
  };

  const handleGenerateOffer = (interview) => {
    setSelectedInterview(interview);
    setViewMode("offer");
  };

  const handleBatchSelect = (interviewId) => {
    setSelectedCandidates(prev => {
      if (prev.includes(interviewId)) {
        return prev.filter(id => id !== interviewId);
      } else {
        return [...prev, interviewId];
      }
    });
  };

  const handleSelectAllSelected = () => {
    const selectedInterviews = interviews.filter(i => i.status === 'Selected');
    if (selectedCandidates.length === selectedInterviews.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(selectedInterviews.map(i => i._id));
    }
  };

  const handleGenerateBatchOffers = () => {
    if (selectedCandidates.length === 0) {
      alert("Please select at least one candidate to generate offers");
      return;
    }
    setViewMode("batch-offer");
  };

  const getSelectedInterviewData = () => {
    return interviews.filter(interview => 
      selectedCandidates.includes(interview._id)
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      "Scheduled": { class: "bg-primary", text: "Scheduled" },
      "Pending": { class: "bg-warning", text: "Pending" },
      "Selected": { class: "bg-success", text: "Selected" },
      "Next_Round": { class: "bg-info", text: "Next Round" },
      "Rejected": { class: "bg-danger", text: "Rejected" },
      "Completed": { class: "bg-secondary", text: "Completed" },
      "Cancelled": { class: "bg-dark", text: "Cancelled" }
    };

    const config = statusConfig[status] || { class: "bg-secondary", text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const getInterviewTypeBadge = (type) => {
    const typeConfig = {
      "Technical": "bg-primary",
      "HR Round": "bg-success", 
      "Managerial": "bg-warning"
    };
    return <span className={`badge ${typeConfig[type] || "bg-secondary"}`}>{type}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  // Filter interviews based on status
  const filteredInterviews = statusFilter === "all" 
    ? interviews 
    : interviews.filter(interview => interview.status === statusFilter);

  // Get only selected candidates for batch processing
  const selectedStatusInterviews = interviews.filter(i => i.status === 'Selected');

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading interviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-0">
          {viewMode === "details" ? "Interview Details" : 
           viewMode === "offer" ? "Generate Offer Letter" :
           viewMode === "batch-offer" ? "Batch Offer Generation" :
           "Scheduled Interviews"}
        </h2>
        {(viewMode === "details" || viewMode === "offer" || viewMode === "batch-offer") && (
          <button 
            className="btn btn-outline-secondary"
            onClick={handleBackToList}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </button>
        )}
      </div>
      <hr />

      {viewMode === "details" && selectedInterview ? (
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              <i className="bi bi-calendar-check me-2"></i>
              Interview Details
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h6 className="fw-semibold text-muted mb-3">Candidate Information</h6>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Candidate Name</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {selectedInterview.candidateId?.name || "N/A"}
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {selectedInterview.candidateId?.email || "N/A"}
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {selectedInterview.candidateId?.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <h6 className="fw-semibold text-muted mb-3">Interview Details</h6>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Job Position</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {selectedInterview.jobId?.title || "N/A"}
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Department</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {selectedInterview.jobId?.department || "N/A"}
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Interview Type</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {getInterviewTypeBadge(selectedInterview.interviewType)}
                  </p>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Interview Date</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {formatDate(selectedInterview.date)}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Interview Time</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {formatTime(selectedInterview.time)}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Status</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {getStatusBadge(selectedInterview.status)}
                  </p>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Interviewer</label>
                  <p className="form-control-plaintext border-bottom pb-2">
                    {selectedInterview.interviewer || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 mt-4 pt-3 border-top">
              {selectedInterview.status === 'Selected' && (
                <button 
                  className="btn btn-success"
                  onClick={() => handleGenerateOffer(selectedInterview)}
                >
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Generate Offer Letter
                </button>
              )}
              <button className="btn btn-primary">
                <i className="bi bi-pencil me-2"></i>
                Edit Interview
              </button>
              <button className="btn btn-outline-secondary">
                <i className="bi bi-calendar-plus me-2"></i>
                Reschedule
              </button>
              <button className="btn btn-outline-danger">
                <i className="bi bi-x-circle me-2"></i>
                Cancel Interview
              </button>
            </div>
          </div>
        </div>
      ) : viewMode === "offer" && selectedInterview ? (
        <div>
          <OfferCreate 
            selectedCandidate={{
              ...selectedInterview.candidateId,
              jobId: selectedInterview.jobId,
              applicationId: selectedInterview.applicationId
            }} 
            onBack={handleBackToList} 
          />
        </div>
      ) : viewMode === "batch-offer" ? (
        <div className="card shadow-sm">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">
              <i className="bi bi-file-earmark-pdf me-2"></i>
              Batch Offer Generation
            </h5>
          </div>
          <div className="card-body">
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Batch Processing:</strong> You are about to generate offer letters for {selectedCandidates.length} selected candidates.
            </div>

            <div className="mb-4">
              <h6>Selected Candidates for Offer Generation:</h6>
              <div className="row">
                {getSelectedInterviewData().map((interview, index) => (
                  <div key={interview._id} className="col-md-6 mb-2">
                    <div className="card border">
                      <div className="card-body py-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{interview.candidateId?.name}</strong>
                            <br />
                            <small className="text-muted">
                              {interview.jobId?.title} • {interview.candidateId?.email}
                            </small>
                          </div>
                          <span className="badge bg-primary">#{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex gap-3">
              <button
                className="btn btn-success"
                onClick={() => {
                  // Start with the first candidate
                  const firstInterview = getSelectedInterviewData()[0];
                  setSelectedInterview(firstInterview);
                  setViewMode("offer");
                }}
              >
                <i className="bi bi-play-circle me-2"></i>
                Start Generating Offers
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={handleBackToList}
              >
                Cancel Batch Processing
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            {/* Header with Actions */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Filter by Status:</label>
                <select 
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Interviews</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Selected">Selected</option>
                  <option value="Next_Round">Next Round</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="col-md-6 d-flex align-items-end justify-content-end gap-2">
                {selectedStatusInterviews.length > 0 && (
                  <>
                    {batchMode ? (
                      <>
                        {selectedCandidates.length > 0 && (
                          <button
                            className="btn btn-success"
                            onClick={handleGenerateBatchOffers}
                          >
                            <i className="bi bi-file-earmark-pdf me-2"></i>
                            Generate Offers ({selectedCandidates.length})
                          </button>
                        )}
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            setBatchMode(false);
                            setSelectedCandidates([]);
                          }}
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          Cancel Batch
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-outline-success"
                        onClick={() => setBatchMode(true)}
                      >
                        <i className="bi bi-collection me-2"></i>
                        Batch Offer Generation
                      </button>
                    )}
                  </>
                )}
                <span className="text-muted">
                  Showing {filteredInterviews.length} of {interviews.length} interviews
                </span>
              </div>
            </div>

            {/* Batch Selection Info */}
            {batchMode && selectedStatusInterviews.length > 0 && (
              <div className="alert alert-warning mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Batch Mode Active:</strong> Select candidates to generate multiple offer letters at once.
                    {selectedCandidates.length > 0 && ` ${selectedCandidates.length} selected`}
                  </span>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedCandidates.length === selectedStatusInterviews.length && selectedStatusInterviews.length > 0}
                      onChange={handleSelectAllSelected}
                    />
                    <label className="form-check-label">
                      Select All ({selectedStatusInterviews.length})
                    </label>
                  </div>
                </div>
              </div>
            )}

            {filteredInterviews.length === 0 ? (
              <div className="text-center py-4">
                <i className="bi bi-calendar-x display-1 text-muted"></i>
                <h5 className="mt-3 text-muted">
                  {statusFilter === "all" ? "No interviews scheduled" : `No ${statusFilter.toLowerCase()} interviews`}
                </h5>
                <p className="text-muted">
                  {statusFilter === "all" 
                    ? "There are no interviews scheduled at the moment."
                    : `There are no ${statusFilter.toLowerCase()} interviews.`
                  }
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      {batchMode && (
                        <th style={{ width: '50px' }}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              disabled={!batchMode}
                            />
                          </div>
                        </th>
                      )}
                      <th>Candidate</th>
                      <th>Position</th>
                      <th>Interview Type</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Interviewer</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInterviews.map((interview) => (
                      <tr key={interview._id}>
                        {batchMode && (
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedCandidates.includes(interview._id)}
                                onChange={() => handleBatchSelect(interview._id)}
                                disabled={interview.status !== 'Selected'}
                                title={interview.status !== 'Selected' ? 'Only selected candidates can receive offers' : 'Select for offer generation'}
                              />
                            </div>
                          </td>
                        )}
                        <td>
                          <strong>{interview.candidateId?.name || "N/A"}</strong>
                          <br />
                          <small className="text-muted">
                            {interview.candidateId?.email || "N/A"}
                          </small>
                        </td>
                        <td>{interview.jobId?.title || "N/A"}</td>
                        <td>{getInterviewTypeBadge(interview.interviewType)}</td>
                        <td>
                          <strong>{formatDate(interview.date)}</strong>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {formatTime(interview.time)}
                          </span>
                        </td>
                        <td>{interview.interviewer || "Not specified"}</td>
                        <td>{getStatusBadge(interview.status)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleViewDetails(interview)}
                              title="View interview details"
                            >
                              <i className="bi bi-eye me-1"></i>
                              View
                            </button>
                            {interview.status === 'Selected' && !batchMode && (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleGenerateOffer(interview)}
                                title="Generate offer letter"
                              >
                                <i className="bi bi-file-earmark-text me-1"></i>
                                Offer
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Interview Statistics */}
            {interviews.length > 0 && (
              <div className="mt-4 pt-3 border-top">
                <h6 className="fw-semibold mb-3">Interview Statistics</h6>
                <div className="row text-center">
                  <div className="col-md-2">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h4 className="fw-bold text-primary">{interviews.length}</h4>
                        <small className="text-muted">Total</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h4 className="fw-bold text-info">{interviews.filter(i => i.status === 'Scheduled').length}</h4>
                        <small className="text-muted">Scheduled</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h4 className="fw-bold text-warning">{interviews.filter(i => i.status === 'Pending').length}</h4>
                        <small className="text-muted">Pending</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h4 className="fw-bold text-success">{selectedStatusInterviews.length}</h4>
                        <small className="text-muted">Selected</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h4 className="fw-bold text-danger">{interviews.filter(i => i.status === 'Rejected').length}</h4>
                        <small className="text-muted">Rejected</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h4 className="fw-bold text-dark">{interviews.filter(i => i.status === 'Cancelled').length}</h4>
                        <small className="text-muted">Cancelled</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;