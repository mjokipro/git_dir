import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
// import Home from './Home'
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import MovieDetail from '../movies/MovieDetail'
import MovieList from '../movies/MovieList';
// import NotFound from './NotFound'

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

          <PrivateRoute exact path="/movies">
            <MovieList type="movies"/>
          </PrivateRoute>

          <PrivateRoute exact path="/movies/:title">
            <MovieDetail />
          </PrivateRoute>

          <PrivateRoute exact path="/series">
            <MovieList type="series" />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <ProfileForm />
          </PrivateRoute>

          <Redirect to="/" />
          {/* <Route><NotFound /></Route> */}
        </Switch>
      </div>
  );
}

export default Routes;
