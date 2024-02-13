import React, {useContext, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import UserContext from '../auth/UserContext';
// import FoodCard from './FoodCard';


const PizzaDetail = ({foods, meth}) => {

    const {type} = useParams()

    console.debug("foods", foods, type)
 
    const [items, setItems] = useState(foods)

    // const { food, setFood, orders, setOrders } = useContext(UserContext)

    // console.debug("Food=", food, "Orders=", orders)

    if(type) {
        const items = foods[type]
        setItems(items)
    }
    console.debug("items", items)

    return (
        <div>
            <p>Food List</p>

            {
            foods.map(foodItem => (
                <Link to={`/${type}/${foodItem.type}`} key={foodItem.type}>
                  <p>{foodItem.type}</p>
                </Link>
              ))}
            
        </div>
    )
}

export default PizzaDetail;