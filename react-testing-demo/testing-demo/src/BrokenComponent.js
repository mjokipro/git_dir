import React from "react";

function BrokenComponent(props) {
  return (
    <div>
      <p>Hello, I'm an BrokenComponent!</p>
      <p>Here are some numbers:</p>
      <p>{props.favNum}</p>
      <p>{props.favNum++}</p>
      <p>{props.favNum++}</p>
    </div>
  );
}

BrokenComponent.defaultProps = {
  favNum: 42
};

export default BrokenComponent;
