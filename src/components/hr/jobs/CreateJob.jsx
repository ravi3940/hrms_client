import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CreateJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    department: "",
    type: "Full-Time",
    location: "",
    description: "",
    requirements: "",
    salaryRange: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const  token =  localStorage.getItem("token")

  try {
    await axios.post("http://localhost:5000/api/jobs", job, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert("Job Created Successfully!");

    setJob({
      title: "",
      department: "",
      type: "Full-Time",
      location: "",
      description: "",
      requirements: "",
      salaryRange: ""
    });

    navigate("/hr/jobs")

  } catch (err) {
    console.error(err);
    alert("Error creating job");
  }
};

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4">Create a New Job Opening</h2>

      <div className="card shadow-sm border-0 p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label fw-semibold">Job Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={job.title}
                onChange={handleChange}
                required
                placeholder="Software Engineer"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Department</label>
              <input
                type="text"
                name="department"
                className="form-control"
                value={job.department}
                onChange={handleChange}
                required
                placeholder="IT / HR / Marketing"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Job Type</label>
              <select
                name="type"
                className="form-select"
                value={job.type}
                onChange={handleChange}
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={job.location}
                onChange={handleChange}
                placeholder="Bangalore / Remote"
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={job.description}
                onChange={handleChange}
                placeholder="Job responsibilities and overview..."
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Requirements</label>
              <textarea
                name="requirements"
                className="form-control"
                rows="3"
                value={job.requirements}
                onChange={handleChange}
                placeholder="Required skills, experience, qualifications..."
              />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-semibold">Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                className="form-control"
                value={job.salaryRange}
                onChange={handleChange}
                placeholder="₹8–12 LPA"
              />
            </div>
          </div>

          <button className="btn btn-primary mt-4 px-4 py-2 fw-semibold">
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}
