import React from "react";
import "./Homepage.css";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {


  return (
      <div className="Homepage">
        <div className="container text-center">
     
          <h1 style={{color: 'rgba(246, 69, 122, 0.792)'}}>{`[ { mjokipro }, ... ]` }</h1>

          <h4  style={{color: ' rgba(30, 98, 108, 0.729)'}} className="mt-4">Welcome!  Use the links above to check out the latest developments.</h4>
              
        </div>
      </div>
  );
}

export default Homepage;
