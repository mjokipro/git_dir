import React, { useState } from "react";
import ColorButtons from "./ColorButtons";
import PositionedCircle from "./PositionedCircle";

/** Get random int min..max (not incl max) */
function randRange(min = 0, max = 100) {
  return Math.random() * (max - min) + min;
}

/** Manage positioned & re-positionable circles.
 *
 * State:
 * - circles: array of circles: [ {x, y, color }, ... ]
 **/

function PositionedColorfulCircles() {
  const [circles, setCircles] = useState([]);

  /** Add a circle w/newColor */
  function addCircle(newColor) {
    setCircles(circles => [
      ...circles,
      { color: newColor, x: randRange(), y: randRange() },
    ]);
  }

  /** Change position of circle at index i */
  function changePosition(i) {
    setCircles(circles => {
      // create copy of state array
      const circlesCopy = [...circles];
      // create copy of object at idx i,
      // then change copy
      circlesCopy[i] = {
        ...circles[i],
        x: randRange(),
        y: randRange(),
      };
      // return circlesCopy;
      return circlesCopy;
    });
  }
  // end

  return (
    <div>
      <ColorButtons addCircle={addCircle} />
      {circles.map((circle, i) => (
        <PositionedCircle
          circle={circle}
          key={i}
          idx={i}
          changePosition={changePosition}
        />
      ))}
    </div>
  );
}

export default PositionedColorfulCircles;
