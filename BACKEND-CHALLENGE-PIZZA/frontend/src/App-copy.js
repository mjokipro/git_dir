import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
import Food from "./FoodItem";
import Component404 from './404Component';
import CreateNewItem from './CreateNewItem';

function App() {
  /*
  *  The main change was turning the snacks useState() into a generalized
  *  useState() component. The component is then called upon during a useEffect()
  *  call.  In there we query the API and get a list, containing two items.
  *  The items inside are the Snacks Objects, and Drinks Object.
  *  These are then passed down depending on which category a user picks.
  *  If snacks are picked, they see snacks, if drinks, they see drinks.
  *  404 Routes are rerouted to a 404 component.
  */


  const [isLoading, setIsLoading] = useState(true);
  const [food, setFood] = useState();

  useEffect(() => {
    async function getFoodItems() {
      let foodItems = await SnackOrBoozeApi.getFoodItems();

      setFood(foodItems);
      setIsLoading(false);
    }
    getFoodItems();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  const addNewFood = async (data) => {
    let type = '';
    console.log(data);
    for(let key in data){
      key === 'type' ? type=data[key] : type=null;
    }

    delete data.type;

    await SnackOrBoozeApi.addFoodItem(data, type);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home foods={food} />
            </Route>

            <Route exact path='/addFood'>
              <CreateNewItem addNewFood={addNewFood}/>
            </Route>
            {/* Menu for Snacks below */}
            <Route exact path="/snacks">
              <Menu foods={food[0]} type={'snacks'} title="Snacks" />
            </Route>

            <Route path="/snacks/:id">
              <Food items={food[0]} cantFind="/snacks" />
            </Route>

            {/* Menu for Drinks below */}
            <Route exact path="/drinks">
              <Menu foods={food[1]} type={'drinks'} title="Drinks" />
            </Route>

            <Route path="/drinks/:id">
              <Food items={food[1]} cantFind="/drinks" />
            </Route>

            {/* 404 Component below */}
            <Route component={Component404} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
