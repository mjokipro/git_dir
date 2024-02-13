import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../auth/UserContext';
// import FoodCard from './FoodCard';
import Pizza from './Pizza';


const PizzaList = ({foods, meth}) => {

    console.debug("foods", foods)
 
    const [items, setItems] = useState(foods)

    // const { food, setFood, orders, setOrders } = useContext(UserContext)

    // console.debug("Food=", food, "Orders=", orders)

    // if(type === 'pizzas'){
    //     const items = foods.map(foodItem => (
    //         <Link to={`/${type}/${foodItem.type}`} key={foodItem.type}>
    //           <p>{foodItem.type}</p>
    //         </Link>
    //       ))
    //     setItems(items)
    // } 
    // console.debug("items", items)


    return (
        <div>
            <h1>Pizza Menu</h1>

            {
            foods.map(foodItem => (
               <Pizza 
               key={foodItem.type}
               type={foodItem.type}
               description={foodItem.description}
               price={foodItem.price}
               />
              ))}
            
        </div>
    )
}

export default PizzaList;