import React, {useState, useEffect} from "react";
import UserCard from './UserCard'
import SearchForm from "../common/SearchForm"
import UsersApi from "../api/api";

const UsersList = () => {

const [users, setUsers] = useState(null)
    console.debug("Users=", users)

//     useEffect(() => {
//         console.debug("userlist", users)
//         search()
//   }, []);

//     async function search(id){
//         let users = await UsersApi.getAllUsers(id)
//         setUsers(users)
//     }

    useEffect(
        function getUsersList(){
            async function getUsers() {
                const users = await UsersApi.getAllUsers()
                console.debug("Users=", users)
                setUsers(users)
            }
            getUsers()
        }, []
    )

    if (!users) return <p>Loading...</p>

    return (
<div className="container">
            <div className="container mt-3">
            {/* <SearchForm searchFor={search} /> */}
            </div>
            <h1 className="panel-heading">UserList</h1>
            { users.length
                ? (
                    <div>
                        {users.map(u => (
                            <UserCard
                                key={u.id}
                                id={u.id}
                                username={u.username}
                                firstName={u.firstName}
                                lastName={u.lastName}
                                email={u.email} 
                                />
                                ))}  
                    </div>
                ) : (<p>No results</p>)
            }
        </div>
    )
}

export default UsersList