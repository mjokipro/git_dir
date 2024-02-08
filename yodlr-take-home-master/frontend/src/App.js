import React from "react";
import Nav from "./Nav";
import Routes from "./Routes404";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
