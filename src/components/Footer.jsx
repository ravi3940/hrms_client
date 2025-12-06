import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5 border-top border-secondary">
      <div className="container">
        <div className="row">

          {/* Brand + Description */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold">HRMS</h4>
            <p className="text-light small">
              A modern HR Management System for recruitment, onboarding, and employee management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/login" className="text-light text-decoration-none">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-light text-decoration-none">Register</Link>
              </li>
              <li>
                <Link to="/onboarding" className="text-light text-decoration-none">Onboarding</Link>
              </li>
              <li>
                <Link to="/admin" className="text-light text-decoration-none">Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">

              <a href="#" className="text-light fs-4">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#" className="text-light fs-4">
                <i className="bi bi-twitter"></i>
              </a>

              <a href="#" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </a>

              <a href="#" className="text-light fs-4">
                <i className="bi bi-github"></i>
              </a>

            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        {/* Bottom */}
        <div className="text-center text-light small">
          © {new Date().getFullYear()} HRMS. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
