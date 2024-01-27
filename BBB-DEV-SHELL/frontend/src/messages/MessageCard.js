import React, { useState, useEffect } from 'react'
// import {Link} from 'react-router-dom'
import JoblyApi from '../api/api'
import Message from './Message'

const MessageCard = ({id, from_user, to_user, body}) => {
    console.debug("message card from:", from_user, "To:", to_user)

    const [message, setMessage] = useState()

    useEffect(function getUserMessages(){
        console.debug("Get message for user", message)
        async function search(){
          let message = await JoblyApi.getMessage(id)
          setMessage(message)
        }
        search()
      }, []);
      

    return (      
        <div >
            <Message id={id} from_user={from_user} to_user={to_user} body={body}/>
        </div>
    )
}

export default MessageCard