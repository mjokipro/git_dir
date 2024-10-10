import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import UsersApi from '../api/api'
import {Link} from 'react-router-dom'

const UserDetail = () => {
    const {username} = useParams()
    console.debug("User Detail", "Username=", username)

    const [user, setUser] = useState(null)

    useEffect(
        function getUserAndMessages(){
            async function getUser(){
                setUser(await UsersApi.getUserId(username))
            }
            getUser()
        }, [username]
    )

    if (!user) return <p>Loading...</p>

    return (
        <div className='container-fluid'>
            <div className='card container mb-3'>
                <h2>{user.username}</h2>
                <p className='lead'><small>{user.firstName}</small></p>
                <p className='lead'><small>{user.lastName}</small></p>
                <p className='lead'><span>{user.email}</span></p>
            
            <Link to={`/users`}>
                <button className='btn btn-secondary mb-3'>Back</button>
            </Link>
            </div>
        </div>
    )
}
export default UserDetail;