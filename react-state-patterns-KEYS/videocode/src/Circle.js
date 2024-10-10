import React from "react";
import "./Circle.css";

/** Simple visual circle.
 *
 * Props:
 * - idx: index of this circle from loop
 * - color
 */

function Circle({color, idx, x, y, changePosition}) {
  return (
    <div 
    onClick={() => changePosition(idx)}
    className="Circle" style={{
      backgroundColor: color,
      position: 'absolute',
      top: `${y}vh`,
      left: `${x}vw`,

       }}>
      {idx + 1}
    </div>
  );
}

export default Circle;
