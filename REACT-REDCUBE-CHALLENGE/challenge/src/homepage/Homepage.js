import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <h1 className="mb-4 font-weight-bold">Redcube</h1>
          <p className="lead">All the titles in one, convenient place.</p>
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
              : (
                  <p>
          <NavLink to="/login" >
            <button>Login</button>
          </NavLink>
          <NavLink to="/signup" >
            <button>Signup</button>
          </NavLink>
                  </p>
              )}
        </div>
      </div>
  );
}

export default Homepage;
