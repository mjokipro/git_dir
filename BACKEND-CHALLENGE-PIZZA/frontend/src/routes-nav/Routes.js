import React, {useContext} from "react";
import UserContext from "../auth/UserContext";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import EditOrderForm from '../common/EditOrderForm'
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import FoodList from '../orders/FoodList'
import FoodDetail from '../orders/FoodDetail'
import PrivateRoute from "./PrivateRoute";
import PizzaList from '../pizzas/PizzaList'
import PizzaDetail from '../pizzas/PizzaDetail'


/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {

      const { food, setFood, orders, setOrders } = useContext(UserContext)

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

          <Route exact path="/pizzas">
            <PizzaList foods={food} meth={setFood} type="food" />
          </Route>

          <Route exact path="/pizzas/:type">
            <PizzaDetail foods={food} meth={setFood} type="food" />
          </Route>

          <PrivateRoute exact path="/orders">
            <FoodList foods={orders} meth={setOrders} type="orders" />
          </PrivateRoute>

          <PrivateRoute exact path="/orders/:user_id/orders">
            <FoodList foods={orders}  meth={setOrders} type="orders" />
          </PrivateRoute>

          <PrivateRoute path="/orders/:id">
            <FoodDetail foods={orders}  meth={setOrders} type="orders" />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <ProfileForm />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
