import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import SignupForm from '../auth/SignupForm'
import ProfileForm from "../profiles/ProfileForm";
import LoginForm from '../auth/LoginForm'
import PrivateRoute from '../routes-nav/PrivateRoute'
import UserList from "../users/UserList";
import UserDetail from "../users/UserDetail"
import MessageList from "../messages/MessageList"
// import MessageDetail from "../messages/MessageDetail";
import PostList from "../posts/PostList"
import PostDetail from "../posts/PostDetail"
import TagList from "../tags/TagList"
import TagDetail from "../tags/TagDetail"
// import NotFound from "./NotFound";

function Routes({login, signup}) {

  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof signup}`,
  )

  return (
    <Switch>

      
      <Route exact path="/"><Homepage /></Route>
      <Route exact path="/login"><LoginForm login={login}/></Route>
      <Route exact path="/signup"><SignupForm signup={signup}/></Route>
      
      {/* <PrivateRoute exact path="/messages/:id/tags/:id"><MessageDetail /></PrivateRoute> */}
      {/* <PrivateRoute exact path="/messages"><MessageList /></PrivateRoute> */}
      <PrivateRoute exact path="/tags/:id"><TagDetail /></PrivateRoute>
      <PrivateRoute exact path="/tags"><TagList /></PrivateRoute>

      {/* <PrivateRoute exact path="/messages/:id"><MessageDetail /></PrivateRoute> */}
      <PrivateRoute exact path="/messages"><MessageList /></PrivateRoute>
      {/* <PrivateRoute exact path="/:username/posts/:id"><PostDetail /></PrivateRoute> */}
      {/* <PrivateRoute exact path="/:username/posts"><PostList /></PrivateRoute> */}
      <PrivateRoute exact path="/posts/:id"><PostDetail /></PrivateRoute>
      <PrivateRoute exact path="/posts"><PostList /></PrivateRoute>
      {/* <PrivateRoute exact path="/users/:username/messages/:id"><UserDetail /></PrivateRoute> */}
      {/* <PrivateRoute exact path="/users/:username/messages"><MessageList /></PrivateRoute> */}
      <PrivateRoute exact path="/users/:username"><UserDetail /></PrivateRoute>
      <PrivateRoute exact path="/users"><UserList /></PrivateRoute>
      <PrivateRoute exact path="/profile"><ProfileForm /></PrivateRoute>
      
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
