import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import ButtonTheme from '../ButtonTheme'

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
                  <ButtonTheme >
                    
                   </ButtonTheme>
                    
                    {/* <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link> */}
                  </p>
              )}
        </div>
      </div>
  );
}

export default Homepage;
