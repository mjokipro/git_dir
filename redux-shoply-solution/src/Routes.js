import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";

/** Routes for application. */

function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <ProductList />
      </Route>
      <Route path="/products/:id" exact>
        <ProductDetails />
      </Route>
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
