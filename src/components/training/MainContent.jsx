import CounterDemo from "./CounterDemo";
import TodoDemo from "./TodoDemo";
import EffectDemo from "./EffectDemo";
import Quiz from "./Quiz";

export default function MainContent({ activeModule, activeTab }) {

  return (
    <div className="flex-grow-1 p-4">

      {activeTab === "learn" && (
        <>
          {activeModule === "components" && <CounterDemo />}
          {activeModule === "state" && <TodoDemo />}
          {activeModule === "effects" && <EffectDemo />}
        </>
      )}

      {activeTab === "practice" && (
        <div className="alert alert-info">Practice tasks coming soon…</div>
      )}

      {activeTab === "quiz" && <Quiz />}

    </div>
  );
}
