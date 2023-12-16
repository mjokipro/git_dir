import React, { useState } from "react";
import ColorButtons from "./ColorButtons";
import Circle from "./Circle";

function StillBrokenColorfulCircles() {
  const [circles, setCircles] = useState([]);

  function addCircle(newColor) {
    // FIXME still doesn't work: array reference is unchanged
    setCircles(circles => {
      circles.push(newColor);
      return circles;
    });
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

export default StillBrokenColorfulCircles;
