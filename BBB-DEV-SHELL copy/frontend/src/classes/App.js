import React from "react";
import CounterClassBased from "./CounterClassBased";
import CounterClassBasedInlineArrow from "./CounterClassBasedInlineArrow";
import CounterClassBasedNewer from "./CounterClassBasedNewer";
import CounterClassBasedBroken from "./CounterClassBasedBroken";
import CounterUsingHOC from "./CounterUsingHOC";
import CounterHooks from "./CounterHooks";
import CounterMixin from "./CounterMixin";
import CounterRenderProps from "./CounterRenderProps";
import Effects from "./Effects";
import LifeCycle from "./LifeCycle";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CounterClassBasedInlineArrow />
      <CounterClassBasedBroken />
      <CounterClassBased />
      <CounterClassBasedNewer />
      <CounterMixin />
      <CounterUsingHOC />
      <CounterHooks />
      <CounterRenderProps />
      <Effects />
      <LifeCycle />
    </div>
  );
}

export default App;
