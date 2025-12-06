import React, { useState } from "react";

export default function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-3 border rounded bg-light mb-3">

      <h5>useState Example - Counter</h5>

      <div className="d-flex align-items-center gap-3 my-3">
        <button className="btn btn-outline-secondary" onClick={() => setCount(count - 1)}>-</button>
        <h3>{count}</h3>
        <button className="btn btn-outline-secondary" onClick={() => setCount(count + 1)}>+</button>
      </div>

      <button className="btn btn-primary" onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
