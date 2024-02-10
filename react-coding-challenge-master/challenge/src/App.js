import React from "react";
// import axios from "axios";
import { BrowserRouter } from "react-router-dom";
// import entries from './sample.json'
import RouteList from "./RouteList";
import NavBar from "./NavBar";
import styled from 'styled-components'
// import Header from './Header'
// import img from './assets/social/instagram-blue.svg'
// import 'foundation-sites/dist/css/foundation.min.css';
import { Button } from 'react-foundation';
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"



/**
 * App
 *
 * state:
  * dogs: [{name...}]
  * isLoading: bool
 *
 * props: none
 *
 * App -> RouteList
 *
 */

const Header = styled.nav`
    color: lightblue;
    background-color: black;
    font-size: 50px;
`
// const Button2 = styled.button`
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border-radius: 3px;
//   color: pink;
//   border: 2px solid blue;
//   background-color: black;

// `

Button.defaultProps = {
  theme: {
    main: "#BF4F74"
  }
}

// const theme = {
//   main: "mediumseagreen"
// };

// const FeatureWrapper = styled.div`
// background-color: lightblue;
// padding: 10px;
// display: flex;
// justify-content: left;
// align-items: left;
// `;

const Footer = styled.footer`
color: lightblue;
background-color: black;
padding: 10px;
display: flex;
justify-content: left;
align-items: left;
height: 5em;
`
const Main = styled.main`
background-color: lightgrey;
// width: auto;
height: 75vw;
display: flew

`

function App() {
 
  // console.debug("entries", entries)

  return (
    <div>
      <BrowserRouter>
        <NavBar  />
        {/* <Button2>Clsdfick</Button2> */}
        <Header >Popular Titles</Header>
        {/* <FeatureWrapper>Popular Titles</FeatureWrapper> */}
        <Main>

          <RouteList  />

        </Main>
        <Footer><div>Hello</div></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
