import React, { useState } from "react";
import ColorButtons from "./ColorButtons";
import Circle from "./Circle";

/** Show color circles buttons and circles.
 *
 * State:
 * - circles: array of circle colors: ["red", "blue"]
 **/

function ColorfulCircles() {
  const [circles, setCircles] = useState([]);

  function addCircle(newColor) {
    // FIXED make a *new* array so reference changes
    setCircles(circles => [...circles, newColor]);
  }

  return (
    <div>
      <ColorButtons addCircle={addCircle} />
      {circles.map((circle, i) => (
        <Circle color={circle} key={i} idx={i} />
      ))}
    </div>
  );
}

export default ColorfulCircles;
