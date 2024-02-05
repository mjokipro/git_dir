import React from "react";
import Grandchild from "./Grandchild";

function Child() {
  return (
    <div>
      <p>I'm the child!</p>
      <Grandchild />
    </div>
  );
}

export default Child;
