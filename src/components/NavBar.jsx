import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import  logo  from  "../assets/logo.png"

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState("light");

  const isActive = (path) => location.pathname === path;
  const hasRole = (role) => user?.role?.toLowerCase() === role.toLowerCase();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.body.setAttribute("data-bs-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-bs-theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top py-2 border-bottom">
      <div className="container-fluid">

        {/* LOGO */}
        <Link to="/" className="navbar-brand fw-bold text-primary d-flex align-items-center">
          <img src={logo} height="30" className="me-2" alt="logo" />
        </Link>

        {/* TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navbarMenu">

          {/* LEFT MENU */}
          <ul className="navbar-nav me-auto ms-3 align-items-center gap-2">

            {/* ADMIN */}
            {user && hasRole("admin") && (
              <li className="nav-item">
                <Link
                  to="/admin"
                  className={`nav-link ${isActive("/admin") ? "active fw-semibold text-primary" : ""}`}
                >
                  Admin Panel
                </Link>
              </li>
            )}

            {/* HR */}
            {user && hasRole("hr") && (
              <>
                <li className="nav-item">
                  <Link
                    to="/hr/applications"
                    className={`nav-link ${isActive("/hr/applications") ? "active fw-semibold text-primary" : ""}`}
                  >
                    Applications
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/hr/onboarding"
                    className={`nav-link ${isActive("/hr/onboarding") ? "active fw-semibold text-primary" : ""}`}
                  >
                    Onboarding
                  </Link>
                </li>
              </>
            )}

            {/* USER */}
            {user && hasRole("user") && (
              <>
                <li className="nav-item">
                  <Link
                    to="/user/dashboard"
                    className={`nav-link ${isActive("/user/dashboard") ? "active fw-semibold text-primary" : ""}`}
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/user/jobs"
                    className={`nav-link ${isActive("/user/jobs") ? "active fw-semibold text-primary" : ""}`}
                  >
                    Jobs
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/user/job/open"
                    className={`nav-link ${isActive("/user/job/open") ? "active fw-semibold text-primary" : ""}`}
                  >
                    My Applications
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/user/status"
                    className={`nav-link ${isActive("/user/status") ? "active fw-semibold text-primary" : ""}`}
                  >
                    Job Status
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* RIGHT MENU */}
          <ul className="navbar-nav ms-auto align-items-center gap-3">



            {/* AUTH BUTTON */}
            {!user && (
              <li className="nav-item">
                <Link className="btn btn-primary px-3" to="/auth">
                  Auth
                </Link>
              </li>
            )}

            {/* LOGGED IN USER DROPDOWN */}
            {user && (
              <li className="nav-item dropdown">
                <button
                  className="btn bg-light border dropdown-toggle d-flex align-items-center gap-2"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                    className="rounded-circle"
                    width="34"
                    height="34"
                    alt="avatar"
                  />
                  <span className="fw-semibold">{user.name}</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="bi bi-person-circle me-2"></i> Profile
                    </Link>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
