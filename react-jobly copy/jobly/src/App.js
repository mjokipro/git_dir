import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import RoutesList from './routes-nav/RoutesList'
import Navigation from './routes-nav/Navigation';
import Homepage from './homepage/Homepage';


function App() {



  
  return (
    <div className="App">
        <p>Hello</p>
      <BrowserRouter>
        <Navigation />
        
        <Homepage/>
        <RoutesList />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
