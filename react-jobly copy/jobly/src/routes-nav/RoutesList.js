import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
// import JobList from "../jobs/JobList";
// import CompanyDetail from "../companies/CompanyDetail";
// import LoginForm from "../auth/LoginForm";
// import ProfileForm from "../profiles/ProfileForm";
// import SignupForm from "../auth/SignupForm";
// import PrivateRoute from "./PrivateRoute";
function RoutesList(){
return (

        <Switch>

           <Route exact path="/companies">
            <CompanyList />
        </Route>

           {/* <Route exact path="/companies/:handle">
            <CompanyDetail />
        </Route> */}

           {/* <Route exact path="/jobs">
            <JobList />
        </Route> */}

           {/* <Route exact path="/login">
            <LoginForm />
        </Route> */}

           {/* <Route exact path="/signup">
            <SignupForm />
        </Route> */}

           {/* <Route exact path="/profile">
            <ProfileForm />
        </Route> */}

        <Route exact path="/">
         <Homepage />
        </Route>

           <Redirect to="/" />
        </Switch>

    )
}

export default RoutesList