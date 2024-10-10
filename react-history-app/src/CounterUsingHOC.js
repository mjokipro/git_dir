import React from "react";
import withCounter from "./withCounter";

const Counter = props => (
  <div>
    <div>Current count: {props.count}</div>
    <div>
      <button onClick={props.onDecrease}>-</button>
      <button onClick={props.onIncrease}>+</button>
    </div>
  </div>
);

export default withCounter(Counter);
