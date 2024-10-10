import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
import Food from "./FoodItem";
import Component404 from "./404Component";
import AddNewItem from "./AddNewItem";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [food, setFood] = useState();

  // call api, get list of all food items
  useEffect(() => {
    async function getAllFoods() {
      let foodI = await SnackOrBoozeApi.getAllItems();
      setFood(foodI);
      setIsLoading(false);
    }
    getAllFoods();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  // add new food item function passed as props;
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
            <Route exact path="/addFood">
              <AddNewItem addNewFood={addNewFood} />
            </Route>
            <Route exact path="/snacks">
              <Menu foods={food[0]} type={'snacks'} title="Snacks" />
            </Route>
            <Route path="/snacks/:id">
              <Food items={food[0]} type={'snacks'} cantFind="/snacks" />
            </Route>
            <Route exact path="/drinks">
              <Menu foods={food[1]} type={'drinks'} title="Drinks" />
            </Route>
            <Route path="/drinks/:id">
              <Food items={food[1]} type={'drinks'} cantFind="/drinks" />
            </Route>
            <Route component={Component404} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
