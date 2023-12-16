import React, { useState } from "react";
import NumberItemAlt from "./NumberItemAlt";

/** Renders & manages list of numbers.
 *   (same state)
 */

function NumberListAlt() {
  const [nums, setNums] = useState(
    [1, 2, 3, 4]
  );

  /** Remove num.
   * Wrapped ver passed to/called by child */
  function removeNum(num) {
    setNums(nums.filter(n => n !== num));
  }

  const numsList = nums.map(n => (
    <NumberItemAlt
      value={n}
      key={n}
      remove={evt => removeNum(n)}
    />)
  );

  return <ul>{numsList}</ul>;
}
// end

export default NumberListAlt;
