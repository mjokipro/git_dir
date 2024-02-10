import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home'
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm'
import MovieDetail from './movies/MovieDetail'
import MovieList from './movies/MovieList';
import NotFound from './NotFound'

function RouteList() {
  return (
    <Switch>

      <Route exact path="/login"><LoginForm  /></Route>
      <Route exact path="/signup"><SignupForm /></Route>
      <Route exact path="/movies"><MovieList /></Route>
      <Route exact path="/movies/:title"><MovieDetail /></Route>
      <Route exact path="/"><Home /></Route>
      <Route><NotFound /></Route>
    
      {/* <Route
        path="/*"
        element={<Navigate to="/" />}
      /> */}

    </Switch>
  );
}

export default RouteList;

