import React, { useContext } from "react";
import CountContext from "./countContext";

function GreatGrandReadWrite() {
  const { num, up } = useContext(CountContext);

  return (
    <div>
      <p>I'm a great-grandchild!</p>
      <p>Here's the count: {num}.</p>
      <button onClick={up}>
        +1 (from great-grandchild)
      </button>
    </div>
  );
}

export default GreatGrandReadWrite;
