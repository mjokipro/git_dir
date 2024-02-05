import React from "react";

/** Render num w/remove button.
 *
 * Props:
 * - value: # to show
 * - remove: parent fn to call
 */

const NumberItem = ({num, remove}) => {
const handleRemove = () => {
  // alert('remove')
  remove(num)
}

  return (
    <li>
      <button onClick={handleRemove}>{num}</button>
      {/* <button onClick={remove}>{num}</button> */}
    </li>
  )
}

export default NumberItem;
