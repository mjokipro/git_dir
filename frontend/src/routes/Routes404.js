import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import BlogHome from "./BlogHome";
import Post from "./Post";
import NotFound from "./NotFound";

function Routes() {
  return (
    <Switch>
      <Route exact path="/about"><About /></Route>
      <Route exact path="/contact"><Contact /></Route>
      <Route exact path="/blog/:slug"><Post /></Route>
      <Route exact path="/blog"><BlogHome /></Route>
      <Route exact path="/"><Home /></Route>
      <Route><NotFound /></Route>
    </Switch>
  );
}

export default Routes;
