import React, { useState, useEffect } from "react";

function EffectExample() {
  const [num, setNum] = useState(0);

const increment = () => {
    setNum(n => n + 1);
  };

  useEffect(() => {
    console.log("running callback")
  document.title = `Hi${'!'.repeat(num)}`
})

  return (
    <div>
      {console.log("RENDERING")}
      Let's get excited.
      <button onClick={increment}>Get more excited.</button>
      <p>Counter: {num} </p>
    </div>
  );
}

export default EffectExample;
