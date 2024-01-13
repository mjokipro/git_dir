import React, { useContext } from "react";
import CountContext from "./countContext";
import GGGrandChild from "./GGGrandChild";

function GreatGrandReadOnly() {

  const {count, addToCount} = useContext(CountContext)

  return (
    <div style={{border: '4px solid'}}>
      <p>I'm a great-grandchild!</p>
      <p>Here's the count: {count}.</p>
      <button onClick={addToCount}>
        +1 (from great-grandchild)
      </button>
      <GGGrandChild/>
    </div>
  );
}

export default GreatGrandReadOnly;
