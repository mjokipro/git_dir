import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import UsersApi from "../api/api";

const UserCard = ({id, firstName, lastName, username, email}) => {
    const [user, setUser] = useState(null)    
    console.debug("User=", user)
    console.debug("Username", firstName)
    
    useEffect(function getUserDetail(){
      search()
    }, [username]);
    
    async function search(){
      let user = await UsersApi.getCurrentUser(username)
        setUser(user)
      }

    return (  
          <Link to={`/users/${username}`}>
                <div className='CompanyCard card'>
                    <div className='card-body'>
                    <h4>{username}</h4>
                    <p><small>{firstName}</small></p>
                    <p><small>{lastName}</small></p>
                  <p><span>{email}</span></p>
                  </div>
              </div>
          </Link>
    )
}

export default UserCard;