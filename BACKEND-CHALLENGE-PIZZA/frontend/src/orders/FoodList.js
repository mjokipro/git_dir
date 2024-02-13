import React, {useContext, useState} from 'react'
import UserContext from '../auth/UserContext';
import {Link} from 'react-router-dom'
import FoodCard from './FoodCard';
import Pizza from '../pizzas/PizzaRemove';
import EditOrderForm from '../common/EditOrderForm';
import PizzaRemove from '../pizzas/PizzaRemove';
import PizzaApi from '../api/api';



const FoodList = ({ foods, meth, removePizzaItem}) => {

    const {currentUser} = useContext(UserContext)

    console.debug("foods", foods)
    console.debug("current user foods", currentUser)
 
    const [items, setItems] = useState(foods)

    console.debug("items", items.id)

      // delete a todo by id
  
    // async function remove(type){       
            
    //     let item = await PizzaApi.removeFood(items.id, type)
    //     let orders = await PizzaApi.getOrders(currentUser.username)
        
 
    // }
  



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
                    <PizzaRemove 
                    key={v.type}
                    id={foods.id}
                        type={v.type}
                        description={v.description}
                        price={v.price}
                        removePizzaItem={removePizzaItem}
                    />
                ))
            }

            
        </div>
    )
}

export default FoodList;