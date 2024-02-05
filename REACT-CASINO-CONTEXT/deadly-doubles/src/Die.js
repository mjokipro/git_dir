import React, { useContext } from "react";
import DiceColorContext from "./DiceColorContext";

import "./Die.css";

/** Die (single dice)
 *
 * Props:
 * - val: number on die
 *
 */

function Die({ val }) {
  const color = useContext(DiceColorContext);
  const styles = { backgroundColor: color || "blue" };

  return (
    <div className="Die" style={styles}>
      {val}
    </div>
  );
}

export default Die;
