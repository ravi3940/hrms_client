import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function OfferForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [formData, setFormData] = useState({
    position: "",
    salary: "",
    joiningDate: "",
    offerDate: new Date().toISOString().split('T')[0],
    company: "DigiTran"
  });

  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch application details
  const loadApplication = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/applications/${id}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      console.log(res.data);
      setApplication(res.data);
      
      // Auto-fill position from job title
      if (res.data.jobId?.title) {
        setFormData(prev => ({
          ...prev,
          position: res.data.jobId.title
        }));
      }
    } catch (error) {
      console.error("Error loading application:", error);
      setMessage("Error loading application details");
    }
  };

  useEffect(() => {
    loadApplication();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Download PDF file
  const downloadPDF = (pdfBlob, fileName) => {
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || `offer-letter-${application?.userId?.name || 'candidate'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Submit Offer Form and Download PDF
  const submitOffer = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setMessage("");

    try {
      const fd = new FormData();

      fd.append("applicationId", id);
      fd.append("name", application.candidateName || application.userId?.name);
      fd.append("email", application.email || application.userId?.email);
      fd.append("position", formData.position);
      fd.append("salary", formData.salary);
      fd.append("joiningDate", formData.joiningDate);
      fd.append("offerDate", formData.offerDate);
      fd.append("company", formData.company);

      if (logo) fd.append("logo", logo);
      if (signature) fd.append("signature", signature);

      // Send request and get PDF as blob
      const response = await axios.post("http://localhost:5000/api/offers/create", fd, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Important: receive binary data
      });

      // Create blob from response
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      
      // Download the PDF
      downloadPDF(pdfBlob, `offer-letter-${formData.position}-${application.userId?.name}.pdf`);

      setMessage("Offer letter created and downloaded successfully!");
      
      // Optional: Navigate after download
      setTimeout(() => navigate("/hr/offers"), 2000);

    } catch (err) {
      console.error("Error creating offer:", err);
      
      // Try to read error message if it's not a blob
      if (err.response?.data instanceof Blob) {
        const errorText = await err.response.data.text();
        try {
          const errorJson = JSON.parse(errorText);
          setMessage(errorJson.message || "Error creating offer");
        } catch {
          setMessage("Error creating offer letter");
        }
      } else {
        setMessage(err.response?.data?.message || "Error creating offer letter");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!application) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading application details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-primary mb-0">Create Offer Letter</h2>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </button>
          </div>

          {message && (
            <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}>
              {message}
              <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
            </div>
          )}

          {/* Candidate Information Card */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-person-badge me-2"></i>
                Candidate Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Name:</strong> {application.candidateName || application.userId?.name}</p>
                  <p><strong>Email:</strong> {application.email || application.userId?.email}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Applied for:</strong> {application.jobId?.title}</p>
                  <p><strong>Department:</strong> {application.jobId?.department}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Form */}
          <form onSubmit={submitOffer} className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <i className="bi bi-file-earmark-text me-2"></i>
                Offer Details
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Position *</label>
                  <input
                    type="text"
                    name="position"
                    className="form-control"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Senior Developer"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Salary (₹) *</label>
                  <input
                    type="text"
                    name="salary"
                    className="form-control"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 8,00,000"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Joining Date *</label>
                  <input
                    type="date"
                    name="joiningDate"
                    className="form-control"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Offer Date *</label>
                  <input
                    type="date"
                    name="offerDate"
                    className="form-control"
                    value={formData.offerDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Company Logo</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files[0])}
                  />
                  <small className="text-muted">Optional: PNG, JPG, SVG (Max: 2MB)</small>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Authorized Signature</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setSignature(e.target.files[0])}
                  />
                  <small className="text-muted">Optional: PNG, JPG (Max: 2MB)</small>
                </div>

                <div className="col-12">
                  <div className="d-flex gap-3 pt-3 border-top">
                    <button 
                      type="submit" 
                      className="btn btn-primary px-4 py-2 fw-semibold"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Generating Offer...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-download me-2"></i>
                          Generate & Download Offer
                        </>
                      )}
                    </button>

                    <button 
                      type="button" 
                      className="btn btn-outline-secondary px-4 py-2"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Information Alert */}
          <div className="alert alert-info mt-4">
            <h6 className="fw-semibold">
              <i className="bi bi-info-circle me-2"></i>
              Important Notes
            </h6>
            <ul className="mb-0 ps-3">
              <li>The offer letter will be generated as a PDF and downloaded automatically</li>
              <li>Candidate will receive a copy via email</li>
              <li>All offer details will be saved in the system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}