import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import JoblyApi from '../api/api'
import { useParams } from 'react-router-dom'

const User = ({ username, firstName, lastName, email}) => {

    const [user, setUser] = useState(null)    
    // console.debug("User=", users[0])

    const {id} = useParams()
    
    // useEffect(function getUserForDetail(){
    //     async function getUser(){
    //         const user = await JoblyApi.getCurrentUser(username)
    //         setUser(user)
    //         }
    //         getUser()
    //     }, [])

    return (

        <div>
            
            <Link to={`/users/${id}`}>
                <h1>{username}</h1>
                <h4>{firstName}</h4>
                <h4>{lastName}</h4>
                <span>{email}</span>
                
            </Link>

        </div>
    )
}

export default User