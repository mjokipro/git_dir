import React, {useState} from "react";
import Navigation from "./routes-nav/Navigation";
import Routes404 from "./Routes404";
import { BrowserRouter } from 'react-router-dom';

function App() {
  
  const [token, setToken] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const [moreRecs, setMoreRecs] = useState(false)

  function login(){

  }

  function signup(){

  }

  function logout(){

  }

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
