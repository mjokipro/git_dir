import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <div>
      <Link to={`/admin`}>Admin</Link>
      </div>
      <div>
      <Link to={`/signup`}>Signup</Link>
      </div>
      <div>
      <Link to={`/login`}>Login</Link>
      </div>
    </div>
  )
}

export default Nav;