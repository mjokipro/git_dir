
import React, {useEffect, useState} from 'react'
// import MessageList from '../MessageList'
import {useParams} from 'react-router-dom'
import JoblyApi from '../api/api'
import MessageList from '../messages/MessageList'

const UserDetail = () => {
    const {username} = useParams()
    console.debug("User Detail", "Username=", username)

    const [user, setUser] = useState(null)

    useEffect(
        function getUserAndMessages(){
            async function getUser(){
                setUser(await JoblyApi.getCurrentUser(username))
            }
            getUser()
        }, [username]
    )

    if (!user) return <p>Loading...</p>

    return (
        <div>
            <h3>{user.username}</h3>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <MessageList messages={user.messages} />
        </div>
    )
}

export default UserDetail

            // key={u.username}
            // username={u.username}
            // firstName={u.firstName}
            // lastName={u.lastName}
            // email={email}