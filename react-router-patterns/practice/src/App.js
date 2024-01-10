// import React, { useEffect, useState } from "react";

import Home from "./Home";
import Eat from "./Eat";

import Drink from "./Drink";
import NavBar from "./NavBar";

import { BrowserRouter, Route, Link } from "react-router-dom";

function App(){
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Route exact path="/" element={<Home />}>
          <Home/>
        </Route>
        <Route exact path="/eat">
          <Eat/>
        </Route>
        <Route exact path="/drink">
          <Drink/>
        </Route>
      </BrowserRouter>
    </div>
  )
}

// function App() {
//   const [page, setPage] = useState('home')

//   useEffect(() => console.log("USE EFFECT"))

//   const showPage = () => {
//     if(page === 'home') return <Home/>
//     if(page === 'eat') return <Eat/>
//     if(page === 'drink') return <Drink/>
//   }

//   return (
//     <main className="App">
//       <nav>
//         <a onClick={() => setPage('home')}>Home</a>
//         <a onClick={() => setPage('eat')}>Eat</a>
//         <a onClick={() => setPage('drink')}>Drink</a>
//       </nav>
//       {showPage()}
//     </main>
//   )
// }

export default App;
