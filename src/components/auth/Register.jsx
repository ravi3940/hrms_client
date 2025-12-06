import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "USER",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validate = () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...payload } = form;
      await axios.post("/api/auth/register", payload);

      navigate("/login", {
        state: { message: "Account created successfully!" },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-4">

      <div className="row justify-content-center align-items-center">

        {/* REGISTER CARD */}
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 p-4">

            <h2 className="fw-bold text-primary text-center mb-2">
              Create HRMS Account
            </h2>
            <p className="text-muted text-center mb-4">
              Register to access your HR workspace
            </p>

            {/* Error */}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control py-2"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control py-2"
                  placeholder="yourname@company.com"
                  required
                />
              </div>

              {/* Role */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Select Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="form-select py-2"
                >
                  <option value="USER">Employee / User</option>
                  <option value="HR">HR Manager</option>
                  <option value="ADMIN">Administrator</option>
                </select>

                <small className="text-muted">
                  {form.role === "USER" && "Access employee dashboard"}
                  {form.role === "HR" && "Manage job postings & hiring"}
                  {form.role === "ADMIN" && "Full system access"}
                </small>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control py-2"
                  placeholder="Create password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="form-control py-2"
                  placeholder="Re-enter password"
                  required
                />
              </div>

              {/* Terms */}
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" required />
                <label className="form-check-label small">
                  I agree to the{" "}
                  <span className="text-primary">Terms</span> and{" "}
                  <span className="text-primary">Privacy Policy</span>.
                </label>
              </div>

              {/* Button */}
              <button
                className="btn btn-primary w-100 py-2 fw-semibold"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="text-center my-3 text-muted">— or —</div>

            {/* Login link */}
            <p className="text-center small">
              Already have an account?{" "}
              <Link to="/login" className="text-primary fw-semibold">
                Login here
              </Link>
            </p>

          </div>
        </div>

        {/* Illustration (Right Side) */}
        <div className="col-lg-5 d-none d-lg-block text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6819/6819265.png"
            className="img-fluid"
            alt="Register illustration"
            style={{ maxHeight: "380px" }}
          />
        </div>

      </div>
    </div>
  );
};

export default Register;
