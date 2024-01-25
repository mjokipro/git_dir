import { useState } from "react";

function useToggle(initialVal = false) {
  // call useState, "reserve piece of state"
  const [value, setValue] = useState(initialVal);
  const toggle = () => {
    setValue(oldValue => !oldValue);
  };
  
  // return piece of state AND a function to toggle it
  return [value, toggle];
}

export default useToggle;
