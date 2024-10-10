import React, {useState, useEffect, useContext} from "react";
import useLocalStorage from './hooks/useLocalStorage'
import Navigation from "./routes-nav/Navigation";
import Routes404 from "./Routes404";
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import MessagelyApi from "./api/api";
// import UserContext from "./auth/UserContext";
import UserContext from "./auth/UserContext";
// import bootstrap from "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col } from "react-bootstrap"

export const _token = 

function App() {
  
  // const { user } = useContext(UserContext)

  const [noMoreRecs, setNoMoreRecs] = useState(false)
  const [user, setUser] = useState(null)
  const [_token, setToken] = useLocalStorage(token)

  
  useEffect(
    function loadingUser(){
     console.debug("user=", user, "noMoreRecs=", noMoreRecs, "_token=", token)
      async function getUser(){
        if (_token) {
          try {
              let {username} = jwt.decode(token)
              MessagelyApi._token = token
              let user = await MessagelyApi.getUser(username)
              setUser(user)
              // setApplicationIds(new Set(user.applications))
          } catch(err) {
              console.log("user error", err)
              setUser(null)
          }
        }
        setNoMoreRecs(true)
      }
      setNoMoreRecs(false)
      getUser()
    }, [token])

  async function login(loginData){
    try {
        let _token = await MessagelyApi.login(loginData)
        setToken(_token)
        return {success: true}
    } catch (errors) {
        console.log("login failed", errors)
        return {success: false, errors}
    }
  }

  async function register(signupData){
    try {
        let token = await MessagelyApi.register(signupData)
        setToken(token)
        return {success: true}
    } catch(errors) {
        console.error("login failed", errors)
        return {success: false, errors}
    }
  }

  function logout(){
    setUser(null)
    setToken(null)
  }

  // function hasAppliedToJob(id){
  //   return applicationIds.has(id)
  // }

  // function applyToJob(id){
  //   if (hasAppliedToJob(id)) return
  //   JoblyApi.applyToJob(currentUser.username, id)
  //   setApplicationIds(new Set([...applicationIds, id]))
  // }

  if (!noMoreRecs) return <p>Loading...</p>

  return (
      <BrowserRouter>
        <UserContext.Provider value={{user, setUser}}>
          <div>
          <Navigation logout={logout} />
          <Routes404 login={login} register={register} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
