import React, { useState } from "react";
import NumberItem from "./NumberItem";

function KeyedNumberList() {
  const [nums, setNums] = useState([1, 2, 3, 4]);

  function removeNum(num) {
    setNums(nums.filter(n => n !== num));
  }

  const numsList = nums.map(n => (
    <NumberItem
      value={n}
      key={n}
      remove={removeNum}
    />)
  );

  return <ul>{numsList}</ul>;
}
// end

export default KeyedNumberList;
