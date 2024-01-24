import React from 'react'
import UserCard from './UserCard'

const UserCardList = ({users}) => {

    return (
        <div>
            {users.map(u => (
                <UserCard 
                    key={u.id}
                    id={u.id}
                    username={u.username}
                    password={u.password}
                    first_name={u.first_name}
                    last_name={u.last_name}
                    phone={u.phone}
                />
            ))}
        </div>
    )
}

export default UserCardList