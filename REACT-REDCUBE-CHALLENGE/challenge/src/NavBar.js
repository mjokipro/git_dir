import React from "react";
import { NavLink } from "react-router-dom"
// import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components"


const FeatureWrapper = styled.nav`

width: 100%;
height:50px;
background-color: black;
display: flex;
justify-content: right;
flex-direction: column;
align-items: right;

`;

const Button2 = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: pink;
  border: 2px solid lightblue;
  background-color: black;
  
`

function NavBar(){
  // <NavLink></NavLink>


  return (
      <FeatureWrapper>
    <nav >
      

      <NavLink to="/" >
        <Button2>Home</Button2>
      </NavLink>

      <NavLink to="/movies" >
        <Button2>Movies</Button2>
      </NavLink>

      <NavLink to="/login" >
        <Button2>Login</Button2>
      </NavLink>

      <NavLink to="/signup" >
        <Button2>Signup</Button2>
      </NavLink>
    
    </nav>
    </FeatureWrapper>
  );
}

export default NavBar;
