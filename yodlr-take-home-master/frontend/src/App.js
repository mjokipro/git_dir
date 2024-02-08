import React, {useState, useEffect} from "react";
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import UsersApi from "./api/api";
import UserContext from "./auth/UserContext";
import Axios from 'axios'

export const CURRENT_USER_ID_STORAGE = "current-user-id";


function App() {

  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useLocalStorage(CURRENT_USER_ID_STORAGE);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "currentUserId=", currentUserId,
);

useEffect(function loadUserInfo() {
  
  async function getCurrentUser() {
    if (currentUserId) {
      try {
        UsersApi.id = currentUserId
        let user = await Axios.get(`http://localhost:3001/${UsersApi.id}`, currentUserId);
        console.debug("App useEffect loadUserInfo", "currentUser=", user);
        setCurrentUser(user);
      } catch (err) {
        console.error("App loadUserInfo: problem loading", err);
        setCurrentUser(null);
      }
    }
    setInfoLoaded(true);
  }

  // set infoLoaded to false while async getCurrentUser runs; once the
  // data is fetched (or even if an error happens!), this will be set back
  // to false to control the spinner.
  setInfoLoaded(false);
  getCurrentUser();
}, [currentUserId]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setCurrentUserId(null)
  }

    /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
    async function signup(signupData) {
      try {
        let userId = await UsersApi.signup(signupData);
        setCurrentUserId(userId.id);
        return { success: true };
      } catch (errors) {
        console.error("signup failed", errors);
        return { success: false, errors };
      }
    }

    /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let userId = await UsersApi.login(loginData);
      setCurrentUserId(userId.id);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  return (
    <BrowserRouter>
    <UserContext.Provider
        value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <Navigation logout={logout} />
        <Routes login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  </BrowserRouter>
  );
}

export default App;
