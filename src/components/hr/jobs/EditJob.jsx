import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    department: "",
    type: "",
    location: "",
    description: "",
    salary: "",
  });

  const fetchJob = async () => {
    try {

      const token = localStorage.getItem("token")
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)
      setJob(res.data);
    } catch (error) {
     console.log(error)
    }


    
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")

    await axios.put(`http://localhost:5000/api/jobs/${id}`,job, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    alert("Job updated!");
    navigate("/hr/jobs");
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4">Edit Job</h2>

      <div className="card shadow-sm border-0 p-4">
        <form onSubmit={handleUpdate}>
          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={job.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                className="form-control"
                value={job.department}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Type</label>
              <select
                name="type"
                className="form-select"
                value={job.type}
                onChange={handleChange}
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={job.location}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Salary</label>
              <input
                type="text"
                name="salary"
                className="form-control"
                value={job.salary}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={job.description}
                onChange={handleChange}
              ></textarea>
            </div>

          </div>

          <button className="btn btn-success mt-4 px-4 py-2 fw-semibold">
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}
