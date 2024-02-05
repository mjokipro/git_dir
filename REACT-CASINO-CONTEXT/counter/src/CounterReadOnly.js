import React, { useState } from "react";
import Child from "./Child";
import CountContext from "./countContext";

function CounterReadOnly() {
  const [num, setNum] = useState(0);
  function up(evt) {
    setNum(oldNum => oldNum + 1);
  }

  return (
    <CountContext.Provider value={num}>
      <button onClick={up}>+1 (from parent)</button>
      <Child />
    </CountContext.Provider>
  );
}

export default CounterReadOnly;
