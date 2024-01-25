import React, { useState } from "react";

function BestSimpleCounter() {
  const [num, setNum] = useState(0);
  function clickUp() {
    setNum(n => n + 1);
  }

  function clickUpBy2() {
    setNum(n => n + 2);
  }

  return (
    <div>
      <h3>Count: {num}</h3>
      <button onClick={clickUp}>Up</button>
      <button onClick={clickUpBy2}>Up By 2</button>
    </div>
  );
}

export default BestSimpleCounter;
