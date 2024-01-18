import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./homepage/Homepage";
import CompanyList from "./companies/CompanyList";
import CompanyDetail from './companies/CompanyDetail'
import SignupForm from './auth/SignupForm'
import JobList from "./jobs/JobList"
import ProfileForm from "./profiles/ProfileForm";
import LoginForm from './auth/LoginForm'
import PrivateRoute from './routes-nav/PrivateRoute'
import NotFound from "./NotFound";

function Routes({login, signup}) {

  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  )

  return (
    <Switch>
      <Route exact path="/"><Homepage /></Route>

      <Route exact path="/login"><LoginForm login={login}/></Route>
      <Route exact path="/signup"><SignupForm signup={signup}/></Route>
      
      <PrivateRoute exact path="/profile"><ProfileForm /></PrivateRoute>
      <PrivateRoute exact path="/jobs"><JobList /></PrivateRoute>
      <PrivateRoute exact path="/companies/:handle"><CompanyDetail /></PrivateRoute>
      <PrivateRoute exact path="/companies"><CompanyList /></PrivateRoute>
      
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
