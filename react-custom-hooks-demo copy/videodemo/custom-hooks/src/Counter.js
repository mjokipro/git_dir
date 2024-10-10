import React from "react";
import useLocalStorageState from './hooks/useLocalStorageState';
const Counter = () => {
  const [count, setCount] = useLocalStorageState('count', 0);
  const addToCount = () => {
    setCount(count => count + 1)
  }
  return (
    <>
      <h4>{count}</h4>
      <button onClick={addToCount}>Add</button>
    </>
  )
}

export default Counter;