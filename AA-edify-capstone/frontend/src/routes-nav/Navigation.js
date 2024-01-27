import React, { useContext } from 'react'
import "./Navigation.css"
import {Link, NavLink} from "react-router-dom"
import UserContext from '../auth/UserContext'

function Navigation({logout}) {
    const {currentUser} = useContext(UserContext)
    console.debug("Nav", "currentUser", currentUser)
    
    function loggedInNav(){
        return (
            <div className='navbar-nav ml-auto'>
            <ul className='nav nav-pills'>
                <li className='nav-item mr-4'>
                    <NavLink className="nav-link" to="/companies">
                        Companies
                    </NavLink>
                </li>
                <li className='nav-item mr-4'>
                    <NavLink className="nav-link" to="/jobs">
                        Jobs
                    </NavLink>
                </li>
                <li className='nav-item mr-4'>
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className='nav-item mr-4'>
                    <NavLink className="nav-link" to="/" onClick={logout}>
                        Log Out {currentUser.first_name || currentUser.username}
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
                <NavLink className="nav-link" to="/signup">
                    Sign Up
                </NavLink>
                </li>    
            </ul>
        </div>
        )
    }

    return (
        <nav className="Navigation navbar">
            <Link className="navbar-brand lg" to="/">
                Jobly
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    )
}    

export default Navigation