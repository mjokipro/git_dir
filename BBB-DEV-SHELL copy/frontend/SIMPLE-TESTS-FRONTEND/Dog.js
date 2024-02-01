import React from "react";

function Dog(props) {
  return (
    <div className="Dog">
      <h1>{props.name}</h1>
      {props.isAdopted ? (
        <p>{props.name} has been adopted!</p>
      ) : (
        <button>Adopt me!</button>
      )}
    </div>
  );
}

export default Dog;
