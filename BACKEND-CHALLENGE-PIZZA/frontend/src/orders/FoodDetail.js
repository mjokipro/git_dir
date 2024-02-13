import React, {useState, useEffect} from 'react'
import Pizza from '../pizzas/Pizza';
import { useParams} from 'react-router-dom'
import PizzaApi from '../api/api';


const FoodDetail = ({ foods}) => {

    const [item, setItem] = useState()
    console.debug("item", item)
    const {type} = useParams()

    if(type){
        const items = foods[type]
        setItem(items)
    }

    useEffect(
        () => {
            async function getAll(){
                let item = await PizzaApi.getA(type)
                setItem(item)
            }
            getAll()
        }, [type]
    )

    return (
        <div>
            <p>Food Detail</p>
            <Pizza 
                key={type}
                type={type}
                description={foods.description}
                price={foods.price}
            />
        </div>
    )
}

export default FoodDetail;