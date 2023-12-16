import React, { useState } from "react";
import DeadlyDoubles from "./DeadlyDoubles";
import "./Table.css";

/** Table at a casino for playing Deadly Double.
 *
 * THIS IS AN ANTI-PATTERN. DO NOT DO THIS.
 *
 * This is to show us making a specific table for a single game.
 * Instead, go look at Table.js.
 *
 * Props: none
 *
 * State:
 * - wins: # of wins so far
 * - losses: # of losses so far
 *
 */

function SimpleDeadlyDoublesTable() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  function addWin() {
    setWins(wins => wins + 1);
  }

  function addLoss() {
    setLosses(losses => losses + 1);
  }

  /** render "sets" of the game, along with win/loss summary */
  return (
    <div className="Table">
      <h2>Deadly Doubles</h2>
      <p>
        <i>Reach the sum before a deadly double takes you down!"</i>
      </p>
      <p>
        Wins: {wins} &mdash; Losses: {losses}
      </p>

      <DeadlyDoubles addWin={addWin} addLoss={addLoss} />
    </div>
  );
}

export default SimpleDeadlyDoublesTable;
