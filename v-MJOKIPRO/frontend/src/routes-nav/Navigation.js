import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";


/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */


function Navigation() {

  return (
      <nav className="Navigation navbar navbar-expand-md">
        <Link className="nav-link navbar-brand" to="/">
          { `[ { mjokipro }, ... ]` }
        </Link>
        <ul className="navbar-nav  ml-auto">
          <li className="nav-item  mr-4">
            <NavLink className="nav-link " to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item  mr-4">
            <NavLink className="nav-link " to="/websites">
              Websites
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link " to="/skills">
              Skills
            </NavLink>
          </li>
        </ul>
      </nav>
  );
}

export default Navigation;
