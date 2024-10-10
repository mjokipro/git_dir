import React, {useState, useEffect, useContext} from 'react'
import MessageCard from '../users/UserCardList'
import {useParams} from 'react-router-dom'
import MessagelyApi from '../api/api'
import UserContext from '../auth/UserContext'

const MessageDetail = ({ messages }) => {
    const {id} = useParams()
    const {user} = useContext(UserContext)

    // const [messages, setMessages] = useState([])
    // const [message, setMessage] = useState(null)
    // const [user, setUser] = useState()

    useEffect(
        function getUserAndMessages(){
            async function getUser(id){
                // setUser(await MessagelyApi.getGetUser(id))
            }
            getUser()
        }, [id]
    )

    // if (!company) return <p>Loading...</p>

    return (
        <div>
            {/* <h3>{user.username}</h3>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p> */}
            {/* <UserCardList users={user} /> */}
            <MessageCard messages={messages} />
        </div>
    )
}

export default MessageDetail