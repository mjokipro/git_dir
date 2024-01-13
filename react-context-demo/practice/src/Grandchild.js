import React from "react";
import GreatGrandReadOnly from "./GreatGrandReadOnly";
// import GreatGrandReadWrite from "./GreatGrandReadWrite";

function Grandchild() {

  return (
    <div style={{border: '4px solid'}}>
      <p>I'm the grandchild!</p>
      <GreatGrandReadOnly/>
      {/* <GreatGrandReadWrite /> */}
    </div>
  );
}

export default Grandchild;
