import React, { useState } from "react";
import ColorButtons from "./ColorButtons";
import Circle from "./Circle";

function BrokenColorfulCircles() {
  const [circles, setCircles] = useState([]);

  function addCircle(newColor) {
    // FIXME: this doesn't work: without using setCircles,
    // component doesn't know that it needs to re-render
    circles.push(newColor);
  }

  return (
    <div>
      <ColorButtons addCircle={addCircle} />
      {circles.map((color, i) => (
        <Circle color={color} key={i} idx={i} />
      ))}
    </div>
  );
}

export default BrokenColorfulCircles;
