import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HRDemoPage() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-light py-5 border-bottom">
        <div className="container d-flex flex-column flex-md-row align-items-center">
          <div className="w-100">
            <h1 className="fw-bold text-primary">
              HRMS – Smart HR Automation
            </h1>
            <p className="lead text-secondary">
              Manage your employees, track attendance, automate payroll,
              and streamline recruitment through a modern HRMS platform.
            </p>

            <button className="btn btn-primary px-4 py-2 fw-semibold mt-2">
              Explore Features
            </button>
          </div>

          <img
            src="https://cdn.dribbble.com/users/1803663/screenshots/6998146/media/1dcd7c82a29bb1a4f4f3f94ec0597aaf.png"
            alt="HR Management"
            className="img-fluid mt-4 mt-md-0"
            style={{ maxHeight: "300px" }}
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="container py-5">
        <h2 className="fw-bold text-center mb-4">HR Core Modules</h2>
        <div className="row g-4">

          <FeatureCard
            title="Recruitment"
            desc="Post jobs, track applications, manage hiring pipelines."
            icon="bi bi-person-plus"
          />

          <FeatureCard
            title="Attendance"
            desc="Capture attendance via biometric/GPS/QR systems."
            icon="bi bi-calendar-check"
          />

          <FeatureCard
            title="Employee Directory"
            desc="Maintain centralized employee profiles & documents."
            icon="bi bi-people"
          />

          <FeatureCard
            title="Payroll Automation"
            desc="Generate salary slips, manage PF/ESI, automate payroll."
            icon="bi bi-cash-coin"
          />

        </div>
      </section>

      {/* IMAGE + VIDEO TRAINING SECTION */}
      <section className="bg-light py-5 border-top border-bottom">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">HR Training & Onboarding</h2>

          <div className="row align-items-center g-4">

            {/* IMAGE */}
            <div className="col-md-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9071/9071199.png"
                alt="HR Training"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "300px" }}
              />
            </div>

            {/* VIDEO */}
            <div className="col-md-6">
              <div className="ratio ratio-16x9 shadow rounded">
                <iframe
                  src="https://www.youtube.com/embed/Y8Tko2YC5hA"
                  title="HR Onboarding Video"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-2 text-muted text-center">HR Onboarding & Training Video</p>
            </div>

          </div>

        </div>
      </section>

      {/* DEMO CARDS */}
      <section className="container py-5">
        <h2 className="fw-bold text-center mb-4">HR Quick Actions</h2>

        <div className="row g-4">

          <ActionCard label="📝 Create Job" />
          <ActionCard label="📁 View Applications" />
          <ActionCard label="📊 Attendance Report" />
          <ActionCard label="🧾 Generate Salary Slip" />

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-center text-white py-3 mt-5">
        HRMS Demo Page © {new Date().getFullYear()}
      </footer>

    </div>
  );
}

/* ---------------------------------------------------------------
   Reusable Components
---------------------------------------------------------------- */

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card border-0 shadow-sm p-4 h-100">
        <div className="text-primary fs-1 mb-3">
          <i className={icon}></i>
        </div>
        <h5 className="fw-bold">{title}</h5>
        <p className="text-muted">{desc}</p>
      </div>
    </div>
  );
}

function ActionCard({ label }) {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="card shadow-sm border-0 text-center p-4 h-100">
        <h5 className="fw-semibold">{label}</h5>
      </div>
    </div>
  );
}
