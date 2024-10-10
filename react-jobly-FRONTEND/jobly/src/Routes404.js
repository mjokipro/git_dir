import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "./homepage/Homepage";
import CompanyList from "./companies/CompanyList";
import CompanyDetail from './companies/CompanyDetail'
import SignupForm from './auth/SignupForm'
import JobList from "./jobs/JobList"
import ProfileForm from "./profiles/ProfileForm";
import LoginForm from './auth/LoginForm'
import NotFound from "./NotFound";

function Routes() {
  return (
    <Switch>

      
      <Route exact path="/signup"><SignupForm /></Route>
      <Route exact path="/login"><LoginForm /></Route>
      <Route exact path="/profile"><ProfileForm /></Route>
      <Route exact path="/jobs"><JobList /></Route>
      <Route exact path="/companies/:handle"><CompanyDetail /></Route>
      <Route exact path="/companies"><CompanyList /></Route>
      <Route exact path="/"><Homepage /></Route>
      <Route><NotFound /></Route>
    </Switch>
  );
}

export default Routes;
