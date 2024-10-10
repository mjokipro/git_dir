import React from "react";

function handleClick() {
  console.log("GoodClick clicked!");
}

function GoodClick() {
  return (
    <button onClick={handleClick}>
      GoodClick
    </button>
  );
}

export default GoodClick;
