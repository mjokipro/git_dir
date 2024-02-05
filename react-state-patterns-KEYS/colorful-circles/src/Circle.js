import React from "react";
import "./Circle.css";

/** Simple visual circle.
 *
 * Props:
 * - idx: index of this circle from loop
 * - color
 */

function Circle(props) {
  return (
    <div className="Circle" style={{ backgroundColor: props.color }}>
      {props.idx + 1}
    </div>
  );
}

export default Circle;
