import React, {useState, useEffect} from "react";
import useLocalStorage from './hooks/useLocalStorage'
import Navigation from "./routes-nav/Navigation";
import Routes404 from "./routes/Routes404";
import { BrowserRouter } from 'react-router-dom';
import UserContext from "./auth/UserContext";
import jwt from 'jsonwebtoken'
import JoblyApi from "./api/api";
import "bootstrap/dist/css/bootstrap.min.css";

export const TOKEN_INIT = "jobly-token"

function App() {
  const [noMoreRecs, setNoMoreRecs] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage(TOKEN_INIT)

  useEffect(
    function loadingUser(){
     console.debug("currentUser=", currentUser, "noMoreRecs=", noMoreRecs, "token=", token)
      async function getUser(){
        if (token) {
          try {
              let {username} = jwt.decode(token)
              JoblyApi.token = token
              let currentUser = await JoblyApi.getCurrentUser(username)
              setCurrentUser(currentUser)
          } catch(err) {
              console.log("user error", err)
              setCurrentUser(null)
          }
        }
        setNoMoreRecs(true)
      }
      setNoMoreRecs(false)
      getUser()
    }, [token])

  async function login(loginData){
    try {
        let token = await JoblyApi.login(loginData)
        setToken(token)
        return {success: true}
    } catch (errors) {
        console.log("login failed", errors)
        return {success: false, errors}
    }
  }

  async function signup(signupData){
    try {
        let token = await JoblyApi.signup(signupData)
        setToken(token)
        return {success: true}
    } catch(errors) {
        console.error("login failed", errors)
        return {success: false, errors}
    }
  }

  function logout(){
    setCurrentUser(null)
    setToken(null)
  }

  if (!noMoreRecs) return <p>Loading...</p>

  return (
      <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <main>
          <Navigation logout={logout} />
          <Routes404 login={login} signup={signup} />
          </main>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
