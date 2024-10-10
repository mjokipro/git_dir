import React, { useState, useEffect, useRef } from "react";

function TimerWithRef() {
  const timerId = useRef();
  let [count, setCount] = useState(0);

  useEffect(function setCounter() {
    console.log("EFFECT RAN!");
    timerId.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return function cleanUpClearTimer() {
      console.log("Unmount ID", timerId.current);
      clearInterval(timerId.current);
    };
  }, [timerId]);

  return (
    <div>
      <h1>{count}</h1>
      <p>(Timer id is {timerId.current}.)</p>
    </div>
  );
}

export default TimerWithRef;
