import React, { useState, useEffect } from "react";

function EffectExample() {
  const [num, setNum] = useState(0);

  function increment(evt) {
    setNum(n => n + 1);
  };

  useEffect(function setTitleOnRerender() {
    document.title = `WOW${"!".repeat(num)}`;
  });

  return (
    <div>
      Let's get excited.
      <button onClick={increment}>Get more excited.</button>
    </div>
  );
}

export default EffectExample;
