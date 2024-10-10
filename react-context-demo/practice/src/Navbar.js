import React, {useContext} from 'react'
import ThemeContext from './ThemeContext'

const Navbar = () => {
    const {color, toggleColor} = useContext(ThemeContext)
    return (
        <nav style={{backgroundColor: color}}>
            <span>shit</span>
            <button onClick={toggleColor}>Toggle Theme</button>
        </nav>
    )
}

export default Navbar