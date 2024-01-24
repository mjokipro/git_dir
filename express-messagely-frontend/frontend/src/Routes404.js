import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./homepage/Homepage";
import MessageList from "./messages/MessageList";
// import UserList from './users/UserList'
import SignupForm from './auth/SignupForm'
import ProfileForm from "./profiles/ProfileForm";
import LoginForm from './auth/LoginForm'
import PrivateRoute from './routes-nav/PrivateRoute'
// import NotFound from "./NotFound";

function Routes({login, register}) {

  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  )

  return (
    <Switch>
      <Route exact path="/"><Homepage /></Route>

      <Route exact path="/register"><SignupForm register={register}/></Route>
      <Route exact path="/login"><LoginForm login={login}/></Route>
      
      <PrivateRoute exact path="/users/:username/to"><ProfileForm /></PrivateRoute>
      <PrivateRoute exact path="/users/:username/from"><ProfileForm /></PrivateRoute>
      <PrivateRoute exact path="/users/:username"><ProfileForm /></PrivateRoute>
      <PrivateRoute exact path="/users"><ProfileForm /></PrivateRoute>
      
      <PrivateRoute exact path="/messages/:id/read"><MessageList /></PrivateRoute>
      <PrivateRoute exact path="/messages/:id"><MessageList /></PrivateRoute>
      <PrivateRoute exact path="/messages"><MessageList /></PrivateRoute>
      
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
