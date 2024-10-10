import React, { useContext } from "react";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import {Link} from 'react-router-dom'

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        <div className="container text-center">
     
          <h1 >{ `[ { mjokipro }, ... ]` }</h1>
          <p className="lead">Welcome!  Please sign in or create an account.</p>
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
              : (
                  <p>
                    <Link to="/login">
                  <button 
                  style={{   background: 'linear-gradient(45deg, #AEA1FF 5%, #dadcfa 95%)',
                  borderRadius: 5,
                  border: 0,
                  color: 'white',
                  height: 40,
                  padding: '0 30px',
                  boxShadow: '0 3px 5px 2px rgba(100, 105, 135, .3)',
                  margin: '15px',}}
                    type="submit"
                >
                  Login
                </button>
                </Link>
                <Link to="/signup">
                <button 
                  style={{   background: 'linear-gradient(45deg, #AEA1FF 5%, #dadcfa 95%)',
                  borderRadius: 5,
                  border: 0,
                  color: 'white',
                  height: 40,
                  padding: '0 30px',
                  boxShadow: '0 3px 5px 2px rgba(100, 105, 135, .3)',
                  margin: '15px',}}
                    type="submit"
                >
                  Signup
                </button>
                </Link>
                  </p>
              )}
        </div>
      </div>
  );
}

export default Homepage;
