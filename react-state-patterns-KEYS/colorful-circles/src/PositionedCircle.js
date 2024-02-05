import React from "react";
import "./Circle.css";

/** Circle that is display at coordinate.
 *
 * Props:
 * - idx: index of which circle this is
 * - circle: {x, y, color} data
 */

function PositionedCircle(props) {
  function handleChange() {
    props.changePosition(props.idx);
  }

  return (
    <div
      className="Circle"
      style={{
        backgroundColor: props.circle.color,
        position: "absolute",
        top: `${props.circle.y}vh`,
        left: `${props.circle.x}vw`
      }}
      onClick={handleChange}
    >
      {props.idx + 1}
    </div>
  );
}

export default PositionedCircle;
