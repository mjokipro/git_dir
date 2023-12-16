import React from "react";
import "./App.css";
import ClickRando from "./ClickRando";
import BrokenClick from "./BrokenClick";
import GoodClick from "./GoodClick";
import Complex from "./Complex";

function App() {
  return (
    <div className="App">
      <BrokenClick />
      <GoodClick />
      <ClickRando maxNum={10} />
      <Complex text="PUSH ME" maxNum={100} />
    </div>
  );
}

export default App;
