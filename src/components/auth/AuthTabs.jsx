import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "../../styles/animations.css";
const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");

  // Login states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  // Register states
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // ---------------- HANDLERS ----------------
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (loginError) setLoginError("");
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    if (registerError) setRegisterError("");
  };

  // LOGIN SUBMIT
  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedUser = await login(loginData.email, loginData.password);

      switch (loggedUser.role) {
        case "admin":
          navigate("/admin");
          break;
        case "hr":
          navigate("/hr/dashboard");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "user":
          navigate("/user/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setLoginError("Invalid email or password");
    }
  };

  // REGISTER SUBMIT
  const submitRegister = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...payload } = registerData;
      payload.role = payload.role.toLowerCase();

      await axios.post("http://localhost:5000/api/auth/register", payload);
      setActiveTab("login");
    } catch (err) {
      setRegisterError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center align-items-center">

        {/* LEFT — FORM */}
        <div className="col-lg-5 col-md-8">
          <div className="card shadow-lg border-0 p-4 rounded-4">

            {/* TABS */}
            <ul className="nav nav-tabs mb-4 justify-content-center">
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold ${activeTab === "login" ? "active" : ""}`}
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold ${activeTab === "register" ? "active" : ""}`}
                  onClick={() => setActiveTab("register")}
                >
                  Register
                </button>
              </li>
            </ul>

            {/* LOGIN */}
            {activeTab === "login" && (
              <div>
                <h3 className="fw-bold text-primary mb-3 text-center">Login</h3>

                {loginError && (
                  <div className="alert alert-danger py-2">{loginError}</div>
                )}

                <form onSubmit={submitLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control py-2"
                      placeholder="yourname@company.com"
                      onChange={handleLoginChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <input
                        type={viewPassword ? "text" : "password"}
                        name="password"
                        className="form-control py-2"
                        placeholder="Enter password"
                        onChange={handleLoginChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setViewPassword(!viewPassword)}
                      >
                        {viewPassword ? (
                          <i className="bi bi-eye-slash"></i>
                        ) : (
                          <i className="bi bi-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-primary w-100 py-2 fw-semibold">
                    Login
                  </button>
                </form>
              </div>
            )}

            {/* REGISTER */}
            {activeTab === "register" && (
              <div>
                <h3 className="fw-bold text-primary mb-3 text-center">Create Account</h3>

                {registerError && (
                  <div className="alert alert-danger py-2">{registerError}</div>
                )}

                <form onSubmit={submitRegister}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control py-2"
                      placeholder="Enter full name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control py-2"
                      placeholder="yourname@company.com"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Role</label>
                    <select
                      name="role"
                      className="form-select py-2"
                      value={registerData.role}
                      onChange={handleRegisterChange}
                    >
                      <option value="user">User</option>
                      <option value="hr">HR</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control py-2"
                      placeholder="Create password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control py-2"
                      placeholder="Re-enter password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>

                  <button  className="btn btn-primary w-100 py-2 fw-semibold">
                    Create Account
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — ILLUSTRATION */}
        <div className="col-lg-5 d-none d-lg-flex justify-content-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706830.png"
            alt="Auth Illustration"
            className="img-fluid"
            style={{ maxHeight: "420px" }}
          />
        </div>

      </div>
    </div>
  );
};

export default AuthTabs;
