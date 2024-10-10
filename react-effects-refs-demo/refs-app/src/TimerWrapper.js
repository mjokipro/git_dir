import React, { useState } from "react";
import TimerWithRef from "./TimerWithRef";

function TimerWrapper() {
  const [timerHidden, setTimerHidden] = useState(false);
  function toggle(evt) {
    setTimerHidden(isHidden => !isHidden);
  };

  return (
    <div>
      <button onClick={toggle}>
        {timerHidden ? "Show timer" : "Hide timer"}
      </button>
      {timerHidden ? null : <TimerWithRef />}
    </div>
  );
}

export default TimerWrapper;
