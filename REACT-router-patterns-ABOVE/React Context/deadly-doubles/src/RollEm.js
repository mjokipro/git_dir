import React, { useState } from "react";
import DiceSet from "./DiceSet";
import { rollDice } from "./utils";

/** Roll: a simple dice-rolling game.
 *
 * Keep rolling dice -- there's no real win/loss.
 *
 * Props:
 * - numDice: number of dice to roll
 * - numSides: number of sides on dice
 * - gameState: "won", "lost", or undefined [if still playing]
 *              in this game, every roll "wins"
 *
 * State:
 * - vals: values of dice
 *
 */

function RollEm({ numDice = 3, numSides = 6, gameState, addWin }) {
  const [vals, setVals] = useState(Array(numDice).fill());
  function roll(evt) {
    setVals(rollDice(numDice, numSides));
    // "hey, kids --- every game's a winner! isn't gambling *fun*?"
    addWin();
  }

  return (
    <div className="RollEm">
      <DiceSet vals={vals} />
      {gameState ? (
        <b>You {gameState}!</b>
      ) : (
        <button onClick={roll}>Roll</button>
      )}
    </div>
  );
}

export default RollEm;
