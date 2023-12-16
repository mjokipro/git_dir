import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/blog">Blog</Link></li>
      <li><Link to="/blargh">Broken Link</Link></li>
    </ul>
  );
}
// end

export default Nav;
