export default function Sidebar({ modules, activeModule, setActiveModule }) {
  return (
    <div className="sidebar p-3">

      <h5 className="mb-3">Training Modules</h5>

      {modules.map(m => (
        <div
          key={m.id}
          className={`p-3 rounded mb-2 d-flex flex-column ${activeModule === m.id ? "bg-primary text-white" : "bg-white border"}`}
          style={{ cursor: "pointer" }}
          onClick={() => setActiveModule(m.id)}
        >
          <strong>{m.title}</strong>
          <span className="text-muted small">{m.completed ? "Completed" : "In Progress"}</span>
        </div>
      ))}

    </div>
  );
}
