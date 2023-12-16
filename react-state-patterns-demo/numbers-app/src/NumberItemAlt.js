import React from "react";

/** Render num w/remove button.
 *    (same props but fn is now wrapped)
 */

function NumberItemAlt(props) {
  return (
    <li>
      {props.value}
      <button onClick={props.remove}>X</button>
    </li>
  );
}
// end

export default NumberItemAlt;
