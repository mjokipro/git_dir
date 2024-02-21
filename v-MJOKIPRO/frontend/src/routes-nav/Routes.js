import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import WebsiteList from "../websites/WebsiteList";
import SkillList from "../skills/SkillList";
import WebsiteDetail from "../websites/WebsiteDetail";
import AboutPage from '../user/AboutPage'

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes() {
  console.debug(
      "Routes"
  );

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>


          <Route exact path="/about">
            <AboutPage />
          </Route>

          <Route exact path="/websites">
            <WebsiteList />
          </Route>

          <Route exact path="/skills">
            <SkillList />
          </Route>

          <Route exact path="/websites/:id">
            <WebsiteDetail />
          </Route>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
