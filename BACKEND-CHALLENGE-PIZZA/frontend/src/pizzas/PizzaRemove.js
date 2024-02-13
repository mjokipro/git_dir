import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'
import './PizzaRemove.css'
import PizzaApi from '../api/api';


const PizzaRemove = ({id, type, description, price, removePizzaItem}) => {

    const {history} = useHistory()
    console.debug("PizzaRemove id", id, "type", type, "removePizzaItem", removePizzaItem)
    // const [item, setItem] = useState(null)


    async function handleSubmit(){
        await removePizzaItem(id, type)
        // setItem(item)
        history.push(`/orders`)
    }

    return (
        <div className='container'>
            <h3>{type}</h3>
            <p>{description}</p>
            <p>{price}</p>
            
            <Button onClick={() => handleSubmit()} variant="contained" color="primary">Remove</Button>
            
        </div>
    )
}

export default PizzaRemove