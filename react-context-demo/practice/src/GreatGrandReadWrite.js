import React, { useContext } from "react";
import CountContext from "./countContext";

function GreatGrandReadWrite() {
  const { count, up } = useContext(CountContext);

  return (
    <div style={{border: '4px solid'}}>
      <p>I'm a great-grandchild!</p>
      <p>Here's the count: {count}.</p>
      <button onClick={up}>
        +1 (from great-grandchild)
      </button>
    </div>
  );
}

export default GreatGrandReadWrite;
