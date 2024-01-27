import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import JoblyApi from '../api/api'

const MessageCard = ({id, from_user, to_user, body}) => {
    console.debug("message card from:", from_user, "To:", to_user)

    const [message, setMessage] = useState()

    useEffect(function getUserMessages(){
        console.debug("Get message for user", message)
        search()
    }, []);
    
    async function search(id){
      let message = await JoblyApi.getMessage(id)
      setMessage(message)
    }
    
    return (

        <Link to={`/messages/${id}`}>
            <div className='card-body'>
            <h4>{from_user}</h4>
            <h4>{to_user}</h4>   
            <p>{body}</p>
            </div>
        </Link>

    )
}

export default MessageCard