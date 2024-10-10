import React from "react";
import Die from "./Die";
import "./DiceSet.css";

/** Dice Set: shows set of dice with values
 *
 * Props:
 * - vals: array of values for dice: [2, 3, 4] shows three dice w/those nums
 *
 */

function DiceSet({ vals }) {
  return (
    <section className="DiceSet">
      {vals.map(v => (
        <Die val={v} />
      ))}
    </section>
  );
}

export default DiceSet;
