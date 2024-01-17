import React from 'react'
import "./Navigation.css"
import {NavLink} from "react-router-dom"
// import {Navbar, Nav, NavItem} from "reactstrap"

function Navigation() {
    return (
        <div className='Navigation'>
            <NavLink exact to="/" >
                Jobly
            </NavLink>

            <NavLink exact to="/companies" >
                Companies
            </NavLink>

            <NavLink exact to="/jobs" >
                Jobs
            </NavLink>

            <NavLink exact to="/profile" >
                Profile
            </NavLink>

            <NavLink exact to="/login" >
                Login
            </NavLink>

            <NavLink exact to="/signup" >
                Sign Up
            </NavLink>

        </div>
    )
}

export default Navigation