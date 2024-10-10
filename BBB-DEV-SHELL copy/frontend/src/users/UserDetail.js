
import React, {useEffect, useState} from 'react'
// import MessageList from '../MessageList'
import {useParams} from 'react-router-dom'
import JoblyApi from '../api/api'
import MessageList from '../messages/MessageList'
import {Link} from 'react-router-dom'

const UserDetail = () => {
    const {id} = useParams()
    console.debug("User Detail", "Username=", id)

    const [user, setUser] = useState(null)
    // const [posts, setPosts] = useState(null)

    useEffect(
        function getUserAndMessages(){
            async function getUser(){
                // setUser()
                setUser(await JoblyApi.getUserID(id))
                
                // setPosts(await JoblyApi.getPost(user.id))
            }
            getUser()
        }, [id]
    )

    if (!user) return <p>Loading...</p>

    return (

        // <Link to={`/users/${id}`}>
        <div className='CompanyCard card'>
            <div className='card-body'>
              
            <h4>{user.username}</h4>
            <p><small>{user.firstName}</small></p>
            <p><small>{user.lastName}</small></p>
            <p><span>{user.email}</span></p>
            </div>
        </div>
        // </Link>

        // <Link to={`/users/${username}`}>
        // <div>
        //     <h3>{user.username}</h3>
        //     <p>{user.first_name}</p>
        //     <p>{user.last_name}</p>
        //     <p>{user.email}</p>
        //     <MessageList messages={user.messages} />
        // </div>
        // </Link>
    )
}

export default UserDetail

            // key={u.username}
            // username={u.username}
            // firstName={u.firstName}
            // lastName={u.lastName}
            // email={email}