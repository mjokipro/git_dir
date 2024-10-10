import React, { useState } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);

  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  return [count, onIncrease, onDecrease];
};

export default useCounter