import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import JoblyApi from '../api/api'
import User from './User'
import UserDetail from './UserDetail'
import { useParams } from 'react-router-dom'

const UserCard = ({id, firstName, lastName, username, email}) => {

    // const {id} = useParams
    const [user, setUser] = useState(null)    
    console.debug("User=", user)
    
    useEffect(function getUserDetail(){
        console.debug("Get user for message", user)
        search()
      }, []);
      
      async function search(username){
        let user = await JoblyApi.getCurrentUser(username)
        setUser(user)
      }

    // useEffect(function getUserForDetail(){
    //     async function getUser(){
    //         const user = await JoblyApi.getCurrentUser(users[0].username)
    //         setUser(user)
    //         }
    //         getUser()
    //     }, [])

    return (


                    
                <Link to={`/users/${username}`}>
                     <div className='CompanyCard card'>
                         <div className='card-body'>
                            {/* <p>{id}</p> */}
                         <h4>{username}</h4>
                         <p><small>{firstName}</small></p>
                         <p><small>{lastName}</small></p>
                        <p><span>{email}</span></p>
                        </div>
                   </div>
                 </Link>
           


    )
}

export default UserCard