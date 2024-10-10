import React, { useContext } from "react";
import CountContext from "./countContext";
import ThemeContext from "./ThemeContext";

function GGGrandChild() {
  const {count, addToCount} = useContext(CountContext);
  const {color} = useContext(ThemeContext);

  return (
    <div style={{border: '4px solid'}}>
      <p>I'm a great-great-grandchild!</p>
      <p>I also consume count: {count}.</p>
      <button style={{color}} onClick={addToCount}>
        +1 (from great-grandchild)
      </button>
    </div>
  );
}

export default GGGrandChild;
