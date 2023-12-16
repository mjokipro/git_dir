import React, { useState } from 'react';
const useToggleState = (initialState = true) => {
  const [state, setState] = useState(initialState);
  const toggleState = () => {
    setState(state => !state)
  }
  return [state, toggleState]
}
export default useToggleState;



// Making piece of state  - starts as true or false
// making a function to toggle state from t/f or f/t
// const [isHappy, setIsHappy] = useState(true);
// const [isDarkMode, setIsDarkMode] = useState(false)
// const toggleMood = () => {
//   setIsHappy(mood => !mood)
// }
// const toggleIsDarkMode = () => {
//   setIsDarkMode(mode => !mode)
// }