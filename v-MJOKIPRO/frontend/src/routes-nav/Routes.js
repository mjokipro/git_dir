import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import WebsiteList from "../websites/WebsiteList";
import SkillList from "../skills/SkillList";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import WebsiteDetail from "../websites/WebsiteDetail";
import AboutPage from '../user/AboutPage'

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <PrivateRoute exact path="/about">
            <AboutPage />
          </PrivateRoute>

          <PrivateRoute exact path="/websites">
            <WebsiteList />
          </PrivateRoute>

          <PrivateRoute exact path="/skills">
            <SkillList />
          </PrivateRoute>

          <PrivateRoute exact path="/websites/:id">
            <WebsiteDetail />
          </PrivateRoute>
{/* 
          <PrivateRoute exact path="/websites/:id/skills/:name">
            <WebsiteDetail />
          </PrivateRoute> */}

          <PrivateRoute path="/profile">
            <ProfileForm />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
