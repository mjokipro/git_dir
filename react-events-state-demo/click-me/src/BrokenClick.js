import React from "react";

function handleClick() {
  console.log("BrokenClick clicked!");
}

function BrokenClick() {
  return (
    <button onClick={handleClick()}>
      BrokenClick
    </button>
  );
}

export default BrokenClick;
