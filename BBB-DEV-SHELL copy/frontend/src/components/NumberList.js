import React, { useState } from "react";
import NumberItem from "./NumberItem";

/** Renders & manages list of numbers.
 *
 * State:
 * - nums: array of numbers: [1, 2, 3, 4]
 */

function NumberList() {
  const [nums, setNums] = useState(
    [1, 2, 3, 4]
  );

  // Remove num. Passed to/called by child
  function removeNum(num) {
    setNums(nums.filter(n => n !== num));
  }

  const numsList = nums.map(n => (
    <NumberItem
      value={n}
      remove={removeNum}
    />)
  );

  return <ul>{numsList}</ul>;
}
// end

export default NumberList;
