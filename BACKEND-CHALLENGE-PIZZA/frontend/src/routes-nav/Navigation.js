import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import styled from 'styled-components'
import Button from '@material-ui/core/Button';

// const nav = styled.nav`
// background-color: aqua;
// `

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/pizzas">
            <Button  color="default">
              Pizzas
            </Button>
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/orders">
            <Button  color="default">
              Orders
            </Button>
            </NavLink>
          </li>
          {/* <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/orders/:user_id/orders">
            <Button  color="default">
              Orders
            </Button>
            </NavLink>
          </li> */}
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/profile">
            <Button  color="default">
            Profile
            </Button>
            </NavLink>
          </li>
          <li className="nav-item">
          <Button  color="default">
            <Link className="nav-link" to="/" onClick={logout}>
            
            Log out {currentUser.first_name || currentUser.username}
            </Link>
            </Button>
          </li>
        </ul>
    );
  }

  function loggedOutNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
            <Button  color="default">
            Login
            </Button>
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">
            <Button  color="default">
            Sign Up
            </Button>
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav className="Navigation navbar navbar-expand-md">
        <Link className="navbar-brand" to="/">
            <Button  color="default">
            Little Pleezers Pizza
            </Button>
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
  );
}

export default Navigation;
