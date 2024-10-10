import React, { useState } from "react";
import "./Table.css";

/** Table at a casino.
 *
 * Each table plays a game (Deadly Doubles, Psychic Dice, etc)
 *
 * This is a generic class --- it wraps the specific game with the ability
 * to keep track of wins/losses, and shows all the "sets" of the game (ie,
 * each individual hand of the game).
 *
 * Props:
 * - there *could* be props, but the class is agnostic about it. Whatever
 *   props it receives, it passes to the underlying game.
 *
 * State:
 * - gameStates: array of ["won", "won", "lost", ...] for already-decided sets
 *
 */

function Table(props) {
  const [gameStates, setGameStates] = useState([]);
  function addWin() {
    setGameStates(states => [...states, "won"]);
  }
  function addLoss() {
    setGameStates(states => [...states, "lost"]);
  }
  const wins = gameStates.filter(st => st === "won").length;
  const losses = gameStates.length - wins;

  /** render "sets" of the game, along with win/loss summary */

  // get list of already-won/lost sets [if any]
  let sets = gameStates.map((gs, idx) => (
    <props.game key={idx} gameState={gs} {...props} />
  ));

  // add new set
  sets.push(
    <props.game
      key={sets.length}
      addWin={addWin}
      addLoss={addLoss}
      {...props}
    />
  );

  return (
    <div className="Table">
      <h2>{props.title}</h2>
      <p>
        <i>{props.description}</i>
      </p>
      <p>
        Wins: {wins} &mdash; Losses: {losses}
      </p>
      {sets.reverse()}
    </div>
  );
}

export default Table;
