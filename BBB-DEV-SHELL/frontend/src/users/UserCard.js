import React from 'react'

const UserCard = ({username, firstName, lastName, email}) => {

    return (
        <div>
            <h1>UserCard</h1>
            <h3>{username}</h3>
            <h5>{firstName}</h5>
            <h5>{lastName}</h5>
            <h5>{email}</h5>
        </div>
    )
}

export default UserCard