import React, { useState } from "react";
import axios from "axios";

const OfferCreate = ({ selectedCandidate }) => {
  const [form, setForm] = useState({
    name: selectedCandidate?.name || "",
    position: "",
    salary: "",
    joiningDate: "",
    company: "Your Company Pvt. Ltd.",
  });

  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e, setter) => setter(e.target.files[0]);

  const submitOffer = async () => {
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    if (logo) data.append("logo", logo);
    if (signature) data.append("signature", signature);

    try {
      const res = await axios.post("http://localhost:5000/api/offers/create", data, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      setPdfBlob(blob);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Failed to generate offer letter");
    }
  };

  const downloadPDF = () => {
    if (!pdfBlob) return;
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(pdfBlob);
    link.download = `Offer-Letter-${form.name}.pdf`;
    link.click();
  };

  return (
    <div className="container card shadow p-4 mt-3">
      <h3 className="fw-bold text-primary">
        <i className="bi bi-file-earmark-text me-2"></i>Create Offer Letter
      </h3>
      <hr />

      <div className="row g-3">
        
        <div className="col-md-6">
          <label className="form-label">Candidate Name</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Position</label>
          <input
            name="position"
            className="form-control"
            onChange={handleChange}
            placeholder="Software Engineer"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Salary</label>
          <input
            name="salary"
            className="form-control"
            placeholder="₹ 4,50,000 LPA"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Name</label>
          <input
            name="company"
            className="form-control"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        {/* Logo Upload */}
        <div className="col-md-6">
          <label className="form-label">Upload Logo</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileChange(e, setLogo)}
          />
        </div>

        {/* Signature Upload */}
        <div className="col-md-6">
          <label className="form-label">Upload Signature</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileChange(e, setSignature)}
          />
        </div>

      </div>

      <button
        className="btn btn-primary mt-4 w-100 fw-semibold"
        onClick={submitOffer}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Offer Letter"}
      </button>

      {/* PDF Preview Section */}
      {pdfBlob && (
        <div className="mt-4">
          <h5 className="fw-bold">Preview</h5>
          <iframe
            src={URL.createObjectURL(pdfBlob)}
            title="PDF Preview"
            className="w-100"
            style={{ height: "500px", borderRadius: "10px" }}
          ></iframe>

          <button className="btn btn-success w-100 mt-3" onClick={downloadPDF}>
            <i className="bi bi-download me-2"></i>Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default OfferCreate;
