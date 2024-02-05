import React, { useState } from "react";
import Tables from "./Tables";

import DiceColorContext from "./DiceColorContext";

/** Rithm Casino!
 *
 * This lets players choose a lucky color, and shows the game tables.
 *
 * Props:
 * - list of [[color-val, color-name], ...] for drop-down menu of colors
 *
 * State:
 * - diceColor: current color to use for dice (this becomes a "context")
 *
 */

function Casino({
  colors = [
    ["darkgreen", "Dark Green"],
    ["tomato", "Tomato"],
    ["darkblue", "Dark Blue"],
    ["#789", "Seven Eight Nine"],
    ["olive", "Olive"]
  ]
}) {
  const [diceColor, setDiceColor] = useState(colors[0][0]);
  function handleChangeColor(evt) {
    setDiceColor(evt.target.value);
  }

  return (
    <div className="Casino">
      <h1>Rithm Casino!</h1>
      <p>
        As long as you keep losing, <i>drinks are on the house</i>
      </p>

      <p>
        <b>Select Your Lucky Dice Color: </b>
        <select onChange={handleChangeColor}>
          {colors.map(c => (
            <option value={c[0]}>{c[1]}</option>
          ))}
        </select>
      </p>

      {/* wrap in "context provider", so descendants can access color */}
      <DiceColorContext.Provider value={diceColor}>
        <Tables />
      </DiceColorContext.Provider>
    </div>
  );
}

export default Casino;
