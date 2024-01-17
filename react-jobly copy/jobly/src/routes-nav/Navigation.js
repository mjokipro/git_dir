import React from 'react'
import "./Navigation.css"
import {NavLink} from "react-router-dom"
// import {Navbar, Nav, NavItem} from "reactstrap"

function Navigation() {
    return (
        <div>
            {/* <NavLink exact to="/" >
                Jobly
            </NavLink> */}

            <NavLink exact to="/companies" >
                Companies
            </NavLink>

        </div>
    )
}

export default Navigation