import React, {useState} from 'react'
import {Link} from 'react-router-dom'
// import UserContext from '../auth/UserContext';
// import FoodCard from './FoodCard';
import PizzaAdd from './PizzaAdd';


const PizzaList = ({foods, orders, meth}) => {

    console.debug("orders pizzalist", orders)
 
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
               <PizzaAdd
               key={foodItem.type}
               id={orders.id}
               type={foodItem.type}
               description={foodItem.description}
               price={foodItem.price}
               />
              ))}
            
        </div>
    )
}

export default PizzaList;