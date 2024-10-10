import React, {useState, useContext} from "react";
import Grandchild from "./Grandchild";
import CountContext from "./countContext";
import ThemeContext from "./ThemeContext";

function Child() {
const [count, setCount] = useState(0)
const {color} = useContext(ThemeContext)
const addToCount = () => {
  setCount(count => count + 1)
}

  return (
    <CountContext.Provider value={{count, addToCount}}>
      <div style={{border: '4px solid'}}>
        <p>I'm the child!</p>
        <p>Count is derived from here:  {count}</p>
        <button style={{color}} onClick={addToCount}>Add to count</button>
        <Grandchild/>
      </div>
    </CountContext.Provider>
  );
}

export default Child;
