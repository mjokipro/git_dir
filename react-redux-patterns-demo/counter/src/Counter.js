import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";

function Counter() {
  const count = useSelector(st => st.count);
  const dispatch = useDispatch();

  function up(evt) { dispatch(increment()); }
  function down(evt) { dispatch(decrement()); }

  return (
    <div>
      <h2>Count is: {count}</h2>
      <button onClick={up}> + </button>
      <button onClick={down}> - </button>
    </div>
  );
}

export default Counter;
