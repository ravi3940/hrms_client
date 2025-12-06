import React, { useState } from "react";
import TrainingHeader from "../components/training/TrainingHeader"
import TrainingNav from "../components/training/TrainingNav";
import Sidebar from "../components/training/Sidebar";
import MainContent from "../components/training/MainContent";

export default function ReactTraining() {

  const [activeTab, setActiveTab] = useState("learn");
  const [activeModule, setActiveModule] = useState("components");
  const [progress, setProgress] = useState(30);

  const modules = [
    { id: "components", title: "Components & JSX", completed: true },
    { id: "state", title: "State & Events", completed: false },
    { id: "effects", title: "Effects & Lifecycle", completed: false },
  ];

  return (
    <div className="container training-container shadow">

      <TrainingHeader />

      <TrainingNav activeTab={activeTab} setActiveTab={setActiveTab} progress={progress} />

      <div className="d-flex">
        <Sidebar modules={modules} activeModule={activeModule} setActiveModule={setActiveModule} />
        <MainContent activeModule={activeModule} activeTab={activeTab} />
      </div>

    </div>
  );
}
