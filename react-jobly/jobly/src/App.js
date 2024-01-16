import React from 'react'
import { BrowserRouter } from 'react-router-dom';
// import Routes from './routes-nav/Routes'
import Navigation from './routes-nav/Navigation';
// import Homepage from './homepage/Homepage';


function App() {



  
  return (
    <div className="App">
        <p>Hello</p>
      <BrowserRouter>
        <Navigation />
        
        {/* <Homepage/> */}
        {/* <Routes /> */}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
