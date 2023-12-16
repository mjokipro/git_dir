import React from "react";
import "./Die.css";

/** Single die . */

function Die(props) {
  return (
    <div className="Die">
      {props.value}
    </div>
  )
}

export default Die;
