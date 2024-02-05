import React, { useState } from "react";
import DiceSet from "./DiceSet";
import { rollDice } from "./utils";

/** Psychic Dice: a simple dice-rolling "game".
 *
 * Dice are rolled; you indicate whether you psychically "knew" them or not
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

function PsychicDice({
  numDice = 3,
  numSides = 6,
  addWin,
  addLoss,
  gameState
}) {
  const [vals, setVals] = useState(Array(numDice).fill());
  const [unrolled, setUnrolled] = useState(true);

  function roll(evt) {
    setVals(rollDice(numDice, numSides));
    setUnrolled(false);
  }

  return (
    <div className="PsychicDice">
      <DiceSet vals={vals} />
      <div>
        {gameState ? (
          <b>You {gameState}!</b>
        ) : unrolled ? (
          <button onClick={roll}>Roll</button>
        ) : (
          <span>
            <button onClick={addWin}>Yep!</button>
            <button onClick={addLoss}>Nope!</button>
          </span>
        )}
      </div>
    </div>
  );
}

export default PsychicDice;
