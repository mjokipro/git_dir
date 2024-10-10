import React from "react";
import { useSelector, useDispatch } from "react-redux";

function SecondCounter() {
  const count = useSelector(st => st.count);
  const dispatch = useDispatch();
  const up = () => dispatch({ type: "INCREMENT" });
  const down = () => dispatch({ type: "DECREMENT" });
  console.log("COUNT", count);
  return (
    <div>
      <h2>The count is: {count}.</h2>
      <button onClick={up}> + </button>
      <button onClick={down}> - </button>
    </div>
  );
}

export default SecondCounter;
