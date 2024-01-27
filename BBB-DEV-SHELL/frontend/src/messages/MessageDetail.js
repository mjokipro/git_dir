import React, {useState, useEffect, useContext} from 'react'
import MessageCard from './MessageCard'
import {useParams} from 'react-router-dom'
import JoblyApi from '../api/api'
import UserContext from '../auth/UserContext'
import NewMessageForm from "../forms/NewMessageForm"

const MessageDetail = () => {
    const {id} = useParams()
    const {currentUser} = useContext(UserContext)
    console.debug("current user", currentUser)
    // const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [toUser, setToUser] = useState(null)
    const [fromUser, setFromUser] = useState(currentUser.username)

    useEffect(
    function getMessage(){
        async function getM(){
            const message = await JoblyApi.getMessage(id)
            setMessage(message)
            }
            getM()
    }, [])
    
    // if (!isLoading) return <p>Loading...</p>

    return (
        <div>
            <NewMessageForm />
            {/* <SearchForm searchFor={search}/>

            <MessageCard 
               message={message}
            /> */}
            {/* <h3>{user.username}</h3>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p> */}
            {/* <UserCardList users={user} /> */}
            {/* <MessageCard messages={messages} /> */}
        </div>
    )
}

export default MessageDetail