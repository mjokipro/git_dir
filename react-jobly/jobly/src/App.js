import React from "react";
import Navigation from "./routes-nav/Navigation";
import Routes404 from "./Routes404";
import { BrowserRouter } from 'react-router-dom';

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes404 />
      </BrowserRouter>
    </div>
  );
}

export default App;
