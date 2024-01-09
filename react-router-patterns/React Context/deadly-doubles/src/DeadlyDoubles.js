import React, { useState } from "react";
import DiceSet from "./DiceSet";
import { hasDoubles, rollDice, sum } from "./utils";

/** DeadlyDoubles: a simple dice-rolling game.
 *
 * Keep rolling until sum of dice >= goal (win) or until you get doubles (lose)
 *
 * Props:
 * - numDice: number of dice to roll
 * - numSides: number of sides on dice
 * - gameState: "won", "lost", or undefined (still being played)
 *
 * State:
 * - vals: values of dice
 *
 */

function DeadlyDoubles({
  numDice = 3,
  numSides = 6,
  addWin,
  addLoss,
  gameState
}) {
  const [vals, setVals] = useState(Array(numDice).fill(null));
  const goal = Math.floor(numDice * (numSides / 2));

  /** roll dice: if won/lost, tell Table (parent) that. Update state. */

  function roll(evt) {
    let vals = rollDice(numDice, numSides);

    if (sum(vals) >= goal) {
      addWin();
    } else if (hasDoubles(vals)) {
      addLoss();
    }

    setVals(vals);
  }

  return (
    <div className="DeadlyDoubles">
      <DiceSet vals={vals} />
      <div>
        <i>Need: {goal} </i>
        <i>Sum: {sum(vals)} </i>
        {gameState ? (
          <b>You {gameState}!</b>
        ) : (
          <button onClick={roll}>Roll</button>
        )}
      </div>
    </div>
  );
}

export default DeadlyDoubles;
