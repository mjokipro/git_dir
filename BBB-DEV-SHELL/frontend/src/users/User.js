import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'

const User = ({ username, firstName, lastName, email}) => {
    const {id} = useParams()

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