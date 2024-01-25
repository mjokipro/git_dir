import React, {useState, useEffect}  from "react";
// import UserListDetail from './UserListDetail'
import UserCard from './UserCard'
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";

const UserList = () => {
    console.degug("Users List")
    const [users, setUsers] = useState(null)

    useEffect(
        function getUsersInit(){
            search()
        }, []
    )

    async function search(username) {
        let users = await JoblyApi.getAllUsers(username)
        console.debug("Users=",  users)
        setUsers(users)
    }

    if (!users) return <p>Loading...</p>

    return (
        <div className='modal-dialog modal-lg'>
            <div>
            <SearchForm searchFor={search} />
            </div>
            { users.length
                ? (
                    <div>
                        {users.map(u => (
                            <UserCard
                                // users={users}
                                key={u.username}
                                name={u.username}
                                username={u.username}
                                firstName={u.firstName}
                                lastName={u.lastName}
                                email={u.email}
                        />))}
                    </div>
                ) : (<p>No results</p>)
            }
        </div>
    )
}

export default UserList