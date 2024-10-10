import React, { useState } from "react";
import { getRandom } from "./random";

/** An example of a component with state/props/children. */

function Complex(props) {
  const [pushed, setPushed] = useState(false);
  const [num, setNum] = useState(getRandom(props.maxNum));

  function handleClick() {
    setPushed(true);
    setNum(getRandom(props.maxNum));
  }

  return (
    <button className="btn" onClick={handleClick}>
      <b>{pushed ? `Number: ${num}` : props.text}</b>
    </button>
  );
}

export default Complex;
