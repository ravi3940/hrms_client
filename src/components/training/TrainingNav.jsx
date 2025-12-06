export default function TrainingNav({ activeTab, setActiveTab, progress }) {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">

      <div className="d-flex gap-2">
        {["learn", "practice", "quiz"].map(tab => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="d-flex align-items-center gap-2">
        <span>Progress: {progress}%</span>
        <div className="progress" style={{ width: "150px" }}>
          <div className="progress-bar bg-success" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

    </div>
  );
}
