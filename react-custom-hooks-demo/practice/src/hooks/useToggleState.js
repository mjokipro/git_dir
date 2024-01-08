import React, { useState } from 'react';

////// Custom hook //////

const useToggleState = (initialState = true) => {
    const [state, setState] = useState(initialState)
    const toggleState = () => {
        setState(state => !state)
    }
    return [state, toggleState]
}



//   const [isHappy, setisHappy] = useState(true)
//   const [isDarkMode, setIsDarkMode] = useState(false)

//   const toggleMood = () => {
//     setisHappy(mood => !mood)
//   }

//   const toggleIsDarkMode = () => {
//     setIsDarkMode(mode => !mode)
//   }

export default useToggleState;