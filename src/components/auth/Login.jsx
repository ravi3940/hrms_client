import  { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-4">

      <div className="row justify-content-center align-items-center">

        {/* Card */}
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 p-4">

            <h2 className="fw-bold text-primary text-center mb-3">
              HRMS Login
            </h2>
            <p className="text-muted text-center mb-4">
              Welcome back! Please enter your credentials.
            </p>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-control py-2"
                  placeholder="yourname@company.com"
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="form-control py-2"
                  placeholder="Enter password"
                />
              </div>

              {/* Remember + Forgot */}
              <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="remember" />
                  <label htmlFor="remember" className="form-check-label">Remember me</label>
                </div>

                <Link to="#" className="text-primary small">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 fw-semibold"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

            </form>

            {/* Divider */}
            <div className="text-center my-3 text-muted">— or —</div>

            {/* Register Link */}
            <p className="text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary fw-semibold">
                Create Account
              </Link>
            </p>

          </div>
        </div>

        {/* Right Side Image (Desktop Only) */}
        <div className="col-lg-5 d-none d-lg-block text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706830.png"
            className="img-fluid"
            alt="Login Illustration"
            style={{ maxHeight: "380px" }}
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
