import React, { useContext } from 'react'
import "./Navigation.css"
import {Link, NavLink} from "react-router-dom"
import UserContext from '../auth/UserContext'

function Navigation({logout}) {
    const {user} = useContext(UserContext)
    console.debug("Nav", "user", user)
    
    function loggedInNav(){
        return (
            <div className='navbar-nav ml-auto'>
            <ul className='nav nav-pills'>
                <li className='nav-item mr-4'>
                    <NavLink className="nav-link" to="/users">
                        Users
                    </NavLink>
                </li>
                <li className='nav-item mr-4'>
                    <NavLink className="nav-link" to="/messages">
                        Messages
                    </NavLink>
                </li>
                <li className='nav-item mr-4'>
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className='nav-item mr-4'>
                    <NavLink className="nav-link" to="/" onClick={logout}>
                        Log Out {user.first_name || user.username}
                    </NavLink>
                </li>
            </ul>
        </div>
        )
    }

    function loggedOutNav(){
        return (
        <div className='navbar-nav ml-auto'>
            <ul className='nav list-group'>        
                <li className='nav-item mr-4'>
                <NavLink className="nav-link" to="/login">
                    Log In
                </NavLink>
                </li>    
                <li className='nav-item mr-4'>
                <NavLink className="nav-link" to="/register">
                    Register
                </NavLink>
                </li>    
            </ul>
        </div>
        )
    }

    return (
        <nav className="Navigation navbar">
            <Link className="navbar-brand lg" to="/">
                Edify.com
            </Link>
            {user ? loggedInNav() : loggedOutNav()}
        </nav>
    )
}    

export default Navigation