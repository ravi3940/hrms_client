import React, { useEffect, useState } from "react";

export default function EffectDemo() {
  const [time, setTime] = useState(new Date());
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  return (
    <div className="p-3 border rounded bg-light mb-3">

      <h5>useEffect Example</h5>

      <p><strong>Current time:</strong> {time.toLocaleTimeString()}</p>

      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
        You clicked: {count}
      </button>

    </div>
  );
}
