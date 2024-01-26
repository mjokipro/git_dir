import React, {useState, useEffect, useContext} from 'react'
import MessageCard from './MessageCard'
import {useParams} from 'react-router-dom'
import JoblyApi from '../api/api'
import UserContext from '../auth/UserContext'
import SearchForm from '../common/SearchForm'

const MessageDetail = () => {
    const {id} = useParams()
    const {currentUser} = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [toUser, setToUser] = useState(null)
    const [fromUser, setFromUser] = useState(currentUser.username)

    useEffect(
        function getUserAndMessages(){
            async function getFromUser(id){
                if (id) {
                    try {
                        setMessage(await JoblyApi.getMessage(id))
                        setFromUser(currentUser.username)
                        setToUser(message.toUser)
                    } catch (e) {
                        console.error("Error loading getUsersAndMessage", err)
                        setMessage(null)
                        setFromUser(null)
                        setToUser(null)
                    }
                }
                setIsLoading(true)
            }
            setIsLoading(false)
            getFromUser()
        }, [id])

    if (!isLoading) return <p>Loading...</p>

    return (
        <div>
            <SearchForm searchFor={search}/>

            <MessageCard 
               message={message}
            />
            {/* <h3>{user.username}</h3>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p> */}
            {/* <UserCardList users={user} /> */}
            {/* <MessageCard messages={messages} /> */}
        </div>
    )
}

export default MessageDetail