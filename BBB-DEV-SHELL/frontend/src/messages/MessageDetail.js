import React, {useState, useEffect, useContext} from 'react'
import MessageCard from './MessageCard'
import {useParams} from 'react-router-dom'
import JoblyApi from '../api/api'
import UserContext from '../auth/UserContext'
import NewMessageForm from "../forms/NewMessageForm"
import { Link } from 'react-router-dom'

const MessageDetail = (to_user, from_user, body) => {
    const {id} = useParams()
    // const {currentUser} = useContext(UserContext)
    // const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)
    // const [toUser, setToUser] = useState(null)
    console.debug("message detail", message)
    // const [fromUser, setFromUser] = useState(currentUser.username)

    useEffect(
    function getMessage(){
        async function getM(){
            const message = await JoblyApi.getMessage(id)
            setMessage(message)
            }
            getM()
    }, [id])
    
    // if (!isLoading) return <p>Loading...</p>

    return (
        <div>
            <p>{to_user}</p>
            <p>{from_user}</p>
            <p>{body}</p>
        </div>
    )
}

export default MessageDetail