import React from "react";

const AttendanceDashboard = () => {
  return (
    <div className="container py-4">

      <h2 className="fw-bold text-primary mb-4">Attendance Dashboard</h2>

      {/* Cards */}
      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-muted">Present Today</h6>
            <h2 className="fw-bold text-success">38</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-muted">Absent</h6>
            <h2 className="fw-bold text-danger">4</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-muted">On Leave</h6>
            <h2 className="fw-bold text-warning">3</h2>
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="card p-3 shadow-sm">
        <h5 className="fw-semibold mb-3">Today's Attendance</h5>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Status</th>
              <th>Check-in</th>
              <th>Check-out</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Ravi Kumar</td>
              <td><span className="badge bg-success">Present</span></td>
              <td>9:15 AM</td>
              <td>—</td>
            </tr>

            <tr>
              <td>Priya Sharma</td>
              <td><span className="badge bg-warning">Leave</span></td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default AttendanceDashboard;
