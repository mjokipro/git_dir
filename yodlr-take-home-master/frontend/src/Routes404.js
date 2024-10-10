import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignupForm from './SignupForm'
import LoginForm from "./auth/LoginForm";
import Admin from './Admin'
import NotFound from "./NotFound";

function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      
      <Route exact path="/signup"><SignupForm /></Route>
      <Route exact path="/login"><LoginForm /></Route>
      <Route exact path="/admin"><Admin /></Route>
      <Route><NotFound /></Route>
    </Switch>
  );
}

export default Routes;
