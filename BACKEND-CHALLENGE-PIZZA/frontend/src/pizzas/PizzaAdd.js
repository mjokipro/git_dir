import React, {useContext} from 'react'
import Button from '@material-ui/core/Button';
import {useHistory, Link} from 'react-router-dom'
import UserContext from '../auth/UserContext';

const PizzaAdd = ({id, type, description, price}) => {

    const history = useHistory()

    const {addPizzaItem, currentUser} = useContext(UserContext)

    console.debug("currentUser", currentUser, "id", id, "addPizzaItem", addPizzaItem)

    async function handleSubmit(){
        await addPizzaItem(id, type, price)
        // setItem(item)
        history.push(`/pizzas`)
    }


    return (
        <div className='container'>
            <h3>{type}</h3>
            <p>{description}</p>
            <p>{price}</p>
            <p>{price}</p>

            <Link>
            <Button onClick={() => handleSubmit()} variant="outlined" color="secdondary">Add</Button>
            </Link>
        </div>
    )
}

export default PizzaAdd