import React from "react";

const stages = [
  { title: "Applied", count: 12 },
  { title: "Screening", count: 6 },
  { title: "Interview", count: 4 },
  { title: "Selected", count: 2 },
  { title: "Rejected", count: 3 },
];

const CandidatePipeline = () => {
  return (
    <div className="container py-4">

      <h2 className="fw-bold text-primary mb-4">Candidate Pipeline</h2>

      <div className="row g-4">
        {stages.map((stage) => (
          <div className="col-lg-2 col-md-4 col-sm-6" key={stage.title}>
            <div className="card border-0 shadow-sm p-3">
              <h6 className="fw-semibold">{stage.title}</h6>
              <h2 className="fw-bold text-primary">{stage.count}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="alert alert-info">
          Drag-and-drop Kanban functionality can be added using React Beautiful DnD.
        </div>
      </div>

    </div>
  );
};

export default CandidatePipeline;
