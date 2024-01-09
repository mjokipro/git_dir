import React, { useState } from "react";
import "./Table.css";

/** Table at a casino for playing a game.
 *
 * THIS IS NOT THE BEST VERSION OF THIS --- see Table.js.
 *
 * Props:
 * - title: title of game
 * - description: description of game
 * - game: game component
 *
 * State:
 * - wins: # of wins so far
 * - losses: # of losses so far
 *
 */

function SimpleTable({ title, description, game: Game }) {
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
      <h2>{title}</h2>
      <p>
        <i>{description}</i>
      </p>
      <p>
        Wins: {wins} &mdash; Losses: {losses}
      </p>

      <Game addWin={addWin} addLoss={addLoss} />
    </div>
  );
}

export default SimpleTable;
