import React, { useState } from "react";

function SimpleCounter() {
  const [num, setNum] = useState(0);
  function clickUp() {
    setNum(num + 1);
  }

  function clickUpBy2() {
    setNum(num + 1);
    setNum(num + 1);
  }

  return (
    <div>
      <h3>Count: {num}</h3>
      <button onClick={clickUp}>Up</button>
      <button onClick={clickUpBy2}>Up By 2</button>
    </div>
  );
}

export default SimpleCounter;
