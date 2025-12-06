import React from "react";

const EmployeeDirectory = () => {
  const employees = [
    { name: "Ravi Kumar", role: "Full Stack Dev", dept: "Engineering" },
    { name: "Priya Sharma", role: "HR Manager", dept: "HR" },
    { name: "Arun Singh", role: "UI Designer", dept: "Design" },
  ];

  return (
    <div className="container py-4">

      <h2 className="fw-bold text-primary mb-4">Employee Directory</h2>

      <div className="row g-4">
        {employees.map((emp, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-sm border-0 p-3">
              <h5 className="fw-bold">{emp.name}</h5>
              <p className="text-muted mb-1">{emp.role}</p>
              <span className="badge bg-primary">{emp.dept}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default EmployeeDirectory;
