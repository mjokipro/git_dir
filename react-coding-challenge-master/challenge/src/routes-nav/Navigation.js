import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
// import "./Navigation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components"

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */
const FeatureWrapper = styled.nav`

width: 100%;
height:70px;
background-color: black;
display: flex;
justify-content: right;
flex-direction: column;
align-items: right;

`;

const Button2 = styled.button`
  font-size: .8em;
  margin: .5em;
  padding: 0.25em .75em;
  
  border-radius: 13px;
  color: pink;
  border: 2px solid lightblue;
  background-color: black;
`

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      
        
          <div >
            <NavLink to="/">
              <Button2>Home</Button2>
            </NavLink>
   
          <NavLink to="/movies" >
            <Button2>Movies</Button2>
          </NavLink>
      
        
          <NavLink to="/series" >
            <Button2>Series</Button2>
          </NavLink>
  
      
            <NavLink to="/profile">
              <Button2>Profile</Button2>
            </NavLink>
      
            <NavLink to="/" onClick={logout}>
              <Button2>Log out {currentUser.first_name || currentUser.username}</Button2>
            </NavLink>
          </div>
     
    );
  }

  function loggedOutNav() {
    return (
      <div>
        <NavLink to="/login">
          <Button2>Login</Button2>
        </NavLink>

        <NavLink to="/signup">
          <Button2>Signup</Button2>
        </NavLink>
      </div>
    
    );
  }

  return (
    <FeatureWrapper>
      <nav >
        <Link to="/">
          RedCube
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
    </FeatureWrapper>
  );
}

export default Navigation;
