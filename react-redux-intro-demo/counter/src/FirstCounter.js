import React from "react";
import { useSelector } from "react-redux";

function FirstCounter() {
  // let's pull in the value of count from the store
  const count = useSelector(store => store.count);

  return (
    <div>
      <h2>The count is: {count}.</h2>
    </div>
  );
}

export default FirstCounter;
