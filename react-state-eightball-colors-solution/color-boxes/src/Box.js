import React from "react";
import "./Box.css";

/** Individual colored box.
 *
 * Props:
 * - color: color of box
 **/
function Box({ color }) {
  return (
      <div
          className="Box"
          style={{ backgroundColor: color }}
      />
  );
}

export default Box;
