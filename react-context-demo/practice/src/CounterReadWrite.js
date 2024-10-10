import React, { useState } from "react";
import Child from "./Child";
import CountContext from "./countContext";

function CounterReadWrite() {
  const [count, setCount] = useState(0);
  function up(evt) {
    setNum(oldNum => oldNum + 1);
  }

  return (
    <CountContext.Provider value={{ count, up }}>
      <Child />
    </CountContext.Provider>
  );
}

export default CounterReadWrite;
