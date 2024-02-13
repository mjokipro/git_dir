import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../auth/UserContext';
import FoodCard from './FoodCard';
import Pizza from '../pizzas/Pizza';


const FoodList = ({foods, meth}) => {

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
            <h1>{`${foods.user_id}'s Current Order:`}</h1>
            <h4>Order ID:</h4>
            <p>{foods.id}</p>
            <h5>Total Items:</h5>
            <p>{foods.total_items}</p>
            <h5>Total Price:</h5>
            <p>{`$${foods.total_price}`}</p>
            {
                foods.pizzas.map(v => (
                    <Pizza 
                    key={v.type}
                        type={v.type}
                        description={v.description}
                        price={v.price}
                    />
                ))
            }

            
        </div>
    )
}

export default FoodList;