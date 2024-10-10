import React from "react";
import "./App.css";
import Dice from "./Dice";

/** Simple game with dice. */

function App() {
  return (
    <div className="App">
      <Dice />
      <Dice numDice={4} title="Mini Dice" maxVal={20} />
    </div>
  );
}

export default App;
