import React, {useState} from "react";

import ThemeContext from "./ThemeContext"

const ThemeProvider = ({children}) => {

const [color, setColor] = useState("yellow")

const toggleColor = () => {
  setColor(color => color === 'yellow' ? 'blue' : 'yellow')
}

    return (
        <ThemeContext.Provider value={{color, toggleColor}}>
            {/* <button onClick={toggleTheme}>Toggle theme</button> */}
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider