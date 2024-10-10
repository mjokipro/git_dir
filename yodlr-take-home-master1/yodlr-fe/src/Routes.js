import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import UserList from "./UserList";

function Routes() {

    return (
        <div >
            <Switch>
                <Route exact path="/">
                </Route>
                <Route exact path="/signup">
                    <RegisterForm />
                </Route>
                <Route exact path="/admin">
                    <UserList />
                </Route>

            </Switch>
        </div>
    );
}

export default Routes;