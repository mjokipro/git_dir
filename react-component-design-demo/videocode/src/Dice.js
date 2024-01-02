import React, { useState } from "react";
import "./Dice.css";
import Die from "./Die.js";

/** A game can be any number of Dies, all with random values. */

function Dice(props) {

  const [values, setValue] = useState(Array.from({ length: props.numDice }));

  /** roll a new set of random numbers */

  const roll = () => {
    setValue(curValues =>
        curValues.map(n => Math.floor(Math.random() * props.maxVal) + 1),
    );
  };

  return (
      <section className="Dice">
        <h1>{props.title}</h1>
        <div>
          {values.map(n => (
              <Die value={n} />
          ))}
        </div>
        <button onClick={roll}>Roll</button>
      </section>
  );
}

Dice.defaultProps = {
  title: "Main Game",
  numDice: 6,
  maxVal: 20,
};

export default Dice;
