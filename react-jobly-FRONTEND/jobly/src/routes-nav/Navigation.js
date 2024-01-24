import React, { useContext } from 'react'
import "./Navigation.css"
import {Link, NavLink} from "react-router-dom"
// import {Navbar, Nav, NavItem} from "reactstrap"
import UserContext from '../auth/UserContext'

function Navigation({logout}) {
    const {currentUser} = useContext(UserContext)
    console.debug("Nav", "currentUser", currentUser)
    
    function loggedInNav(){
        return (
        <ul>
            <li>
                <NavLink to="/companies">
                    Companies
                </NavLink>
            </li>
            <li>
                <NavLink to="/jobs">
                    Jobs
                </NavLink>
            </li>
            <li>
                <NavLink to="/profile">
                    Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/" onClick={logout}>
                    Log Out {currentUser.first_name || currentUser.username}
                </NavLink>
            </li>
        </ul>
        )
    }

    function loggedOutNav(){
        return (
            <ul>        
                <li>
                <NavLink to="/login">
                    Log In
                </NavLink>
                </li>    
                <li>
                <NavLink to="/signup">
                    Sign Up
                </NavLink>
                </li>    
            </ul>
        )
    }

    return (
        <nav>
            <Link to="/">
                Jobly
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    )
}    

export default Navigation