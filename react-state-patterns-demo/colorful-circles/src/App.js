import React from "react";
import "./App.css";
import ColorfulCircles from "./ColorfulCircles";
import PositionedColorfulCircles from "./PositionedColorfulCircles";

/** Show colorful circles. */
function App() {
  return (
    <div className="App">
      <h1>Colorful Circles!</h1>
      <ColorfulCircles />
      {/*<PositionedColorfulCircles />*/}
    </div>
  );
}

export default App;
