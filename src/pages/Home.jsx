import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/image.png";

const Home = () => {
  return (
    <div className="container-fluid px-0">
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-primary position-relative overflow-hidden">
        <div className="container py-5 py-lg-8">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <h1 className="display-4 fw-bold text-dark mb-4">
                  Complete <span className="text-primary-gradient">HR Management</span> Solution
                </h1>
                <p className="lead text-muted mb-5 fs-5 lh-base">
                  Streamline recruitment, employee management, attendance, payroll, 
                  onboarding & HR workflows — all in one smart HRMS platform.
                </p>
                <div className="d-flex flex-wrap gap-3 mb-5">
                  <Link 
                    to="/auth" 
                    className="btn btn-primary btn-lg px-5 py-3 fw-semibold shadow-primary-hover"
                  >
                    Get Started <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                  <Link 
                    to="/demo" 
                    className="btn btn-outline-primary btn-lg px-5 py-3 fw-semibold border-2"
                  >
                    Request Demo <i className="bi bi-play-circle ms-2"></i>
                  </Link>
                </div>
                <div className="d-flex flex-wrap gap-4 text-center">
                  <div className="stat-item">
                    <div className="h3 fw-bold text-dark mb-1">500+</div>
                    <div className="text-muted small">Companies</div>
                  </div>
                  <div className="stat-item">
                    <div className="h3 fw-bold text-dark mb-1">50K+</div>
                    <div className="text-muted small">Employees</div>
                  </div>
                  <div className="stat-item">
                    <div className="h3 fw-bold text-dark mb-1">24/7</div>
                    <div className="text-muted small">Support</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <div className="floating-animation">
                  <img
                    src={image}
                    alt="HRMS Illustration"
                    className="img-fluid rounded-3 shadow-lg"
                    style={{ maxHeight: "500px" }}
                  />
                </div>
                {/* Floating elements */}
                <div className="position-absolute top-0 start-0 mt-3 ms-3 bg-white rounded-3 shadow-sm p-3 d-none d-md-flex align-items-center floating-badge">
                  <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                    <i className="bi bi-check-lg text-white small"></i>
                  </div>
                  <span className="fw-semibold text-dark">Automated</span>
                </div>
                <div className="position-absolute bottom-0 end-0 mb-3 me-3 bg-white rounded-3 shadow-sm p-3 d-none d-md-flex align-items-center floating-badge delay-1">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                    <i className="bi bi-graph-up text-white small"></i>
                  </div>
                  <span className="fw-semibold text-dark">Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centralized Database Section */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card border-0 shadow-lg hover-lift">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-4">
                        <i className="bi bi-database-fill text-primary fs-1"></i>
                      </div>
                      <div>
                        <h2 className="fw-bold text-dark mb-2">Centralized Database</h2>
                        <p className="text-muted mb-0 fs-5">
                          All your HR data in one secure, organized platform. Access employee information, 
                          documents, and analytics from a single dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{ width: '140px', height: '140px' }}>
                      <i className="bi bi-shield-check text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core HR Features */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Core HR Features</h2>
          <p className="lead text-muted mx-auto" style={{maxWidth: '600px'}}>
            Comprehensive tools to manage all aspects of human resources efficiently
          </p>
        </div>
        
        <div className="row g-4">
          {[
            {
              icon: "bi-person-lines-fill",
              title: "Recruitment",
              description: "Manage job posts, candidate screening, and interview pipeline.",
              color: "primary",
              link: "/hr/applications",
              btnText: "View Applications"
            },
            {
              icon: "bi-calendar-check",
              title: "Attendance & Leave",
              description: "Track employee attendance, manage leaves, and generate reports.",
              color: "success",
              link: "/attendance",
              btnText: "Manage Attendance"
            },
            {
              icon: "bi-cash-coin",
              title: "Payroll",
              description: "Process salaries, manage deductions, and handle compliance.",
              color: "warning",
              link: "/payroll",
              btnText: "Process Payroll"
            }
          ].map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100 hover-lift feature-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className={`bg-${feature.color} bg-opacity-10 rounded-3 p-3 me-3`}>
                      <i className={`bi ${feature.icon} text-${feature.color} fs-2`}></i>
                    </div>
                    <h5 className="fw-bold text-dark mb-0">{feature.title}</h5>
                  </div>
                  <p className="text-muted mb-4 flex-grow-1">{feature.description}</p>
                  <Link 
                    to={feature.link} 
                    className={`btn btn-${feature.color} ${feature.color === 'warning' ? 'text-white' : ''} w-100`}
                  >
                    {feature.btnText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional HR Features */}
      <section className="container py-5 bg-light rounded-4">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Advanced HR Modules</h2>
          <p className="lead text-muted mx-auto" style={{maxWidth: '600px'}}>
            Specialized tools for talent development and performance management
          </p>
        </div>
        
        <div className="row g-4">
          {[
            {
              icon: "bi-journal-check",
              title: "Onboarding",
              description: "Automate new hire document submission & orientation workflow.",
              color: "info",
              link: "/onboarding",
              btnText: "Onboarding Tasks"
            },
            {
              icon: "bi-graph-up",
              title: "Performance Management",
              description: "Set goals, conduct reviews, and track employee performance.",
              color: "danger",
              link: "/performance",
              btnText: "View Performance"
            },
            {
              icon: "bi-star",
              title: "Talent Management",
              description: "Identify, develop, and retain top talent in your organization.",
              color: "purple",
              link: "/talent",
              btnText: "Talent Pool"
            }
          ].map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100 hover-lift feature-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className={`bg-${feature.color} bg-opacity-10 rounded-3 p-3 me-3`}>
                      <i className={`bi ${feature.icon} text-${feature.color} fs-2`}></i>
                    </div>
                    <h5 className="fw-bold text-dark mb-0">{feature.title}</h5>
                  </div>
                  <p className="text-muted mb-4 flex-grow-1">{feature.description}</p>
                  <Link 
                    to={feature.link} 
                    className={`btn btn-${feature.color} ${feature.color === 'info' || feature.color === 'purple' ? 'text-white' : ''} w-100`}
                  >
                    {feature.btnText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Training and Development */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 bg-gradient-info text-white shadow-lg">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-4 mb-md-0">
                    <div className="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center p-4">
                      <i className="bi bi-mortarboard-fill fs-1"></i>
                    </div>
                  </div>
                  <div className="col-md-6 text-center text-md-start">
                    <h3 className="fw-bold mb-3">Training and Development</h3>
                    <p className="mb-4 opacity-75">
                      Enhance employee skills with comprehensive training programs, 
                      track progress, and identify development opportunities.
                    </p>
                  </div>
                  <div className="col-md-3 text-center">
                    <Link to="/training" className="btn btn-light btn-lg px-4">
                      Explore Programs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements & Quick Actions */}
      <section className="container py-5">
        <div className="row g-5">
          {/* Announcements */}
          <div className="col-lg-8">
            <div className="mb-4">
              <h3 className="fw-bold text-dark mb-4">HR Announcements</h3>
              <div className="list-group shadow-sm">
                {[
                  { title: "Holiday", content: "Office closed on Jan 26 (Republic Day)", badge: "NEW" },
                  { title: "Policy Update", content: "Revised remote work guidelines", badge: null },
                  { title: "Training", content: "Mandatory cybersecurity workshop next week", badge: null },
                  { title: "Payroll", content: "New tax forms required by Feb 1st", badge: "IMPORTANT" }
                ].map((announcement, index) => (
                  <div key={index} className="list-group-item border-0 p-4 hover-lift">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="text-primary">{announcement.title}:</strong> {announcement.content}
                      </div>
                      {announcement.badge && (
                        <span className={`badge bg-${announcement.badge === 'NEW' ? 'primary' : 'danger'} pulse`}>
                          {announcement.badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm sticky-top" style={{top: '100px'}}>
              <div className="card-body p-4">
                <h4 className="fw-bold text-dark mb-4">Quick Actions</h4>
                <div className="d-grid gap-3">
                  {[
                    { icon: "bi-plus-circle", text: "Create Job", link: "/create-job", color: "primary" },
                    { icon: "bi-people", text: "Employee Directory", link: "/employees", color: "dark" },
                    { icon: "bi-calendar-event", text: "Mark Attendance", link: "/attendance", color: "success" },
                    { icon: "bi-cash-stack", text: "Process Payroll", link: "/payroll", color: "warning" },
                    { icon: "bi-graph-up", text: "HR Reports", link: "/reports", color: "info" }
                  ].map((action, index) => (
                    <Link
                      key={index}
                      to={action.link}
                      className={`btn btn-outline-${action.color} d-flex align-items-center justify-content-between py-3 px-4 text-start`}
                    >
                      <span>
                        <i className={`bi ${action.icon} me-2`}></i>
                        {action.text}
                      </span>
                      <i className="bi bi-arrow-right-short"></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom styles */}
      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #f8f9fa 0%, #e8eaf6 50%, #f8f9fa 100%);
        }
        .text-primary-gradient {
          background: linear-gradient(135deg, #3f51b5, #2196f3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shadow-primary-hover {
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(63, 81, 181, 0.3);
        }
        .shadow-primary-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(63, 81, 181, 0.4);
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15) !important;
        }
        .bg-gradient-info {
          background: linear-gradient(135deg, #2196f3 0%, #21cbf3 100%);
        }
        .border-2 {
          border-width: 2px !important;
        }
        .min-vh-75 {
          min-height: 75vh;
        }
        .floating-animation {
          animation: float 3s ease-in-out infinite;
        }
        .floating-badge {
          animation: float 2s ease-in-out infinite;
        }
        .delay-1 {
          animation-delay: 0.5s;
        }
        .pulse {
          animation: pulse 2s infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .btn-purple {
          background-color: #6f42c1;
          border-color: #6f42c1;
          color: white;
        }
        .btn-purple:hover {
          background-color: #5a2d91;
          border-color: #5a2d91;
          color: white;
        }
        .text-purple {
          color: #6f42c1 !important;
        }
        .bg-purple {
          background-color: #6f42c1 !important;
        }
      `}</style>
    </div>
  );
};

export default Home;