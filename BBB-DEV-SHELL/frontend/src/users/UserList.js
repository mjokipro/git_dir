import React, {useState, useEffect}  from "react";
// import UserListDetail from './UserListDetail'
// import UserCard from './UserCard'
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import UserCard from "./UserCard";
import {Link} from "react-router-dom"

const UserList = () => {
    console.debug("Users List")
    const [users, setUsers] = useState(null)

    useEffect(() => {
        console.debug("userlist", users)
        search()
  }, []);

    async function search(id){
        let users = await JoblyApi.getAllUsers(id)
        setUsers(users)
    }

    if (!users) return <p>Loading...</p>

    return (
        <div className='modal-dialog modal-lg'>
            <div>
            <SearchForm searchFor={search} />
            </div>
            <h1>UserList</h1>
            { users.length
                ? (
                    <div>
                        
                        {/* <UserCard users={users}/> */}

                        {/* // <Link to={`/users/${id}`}> */}
                        {users.map(u => (
                            <UserCard
                                // users={users}
                                key={u.id}
                                id={u.id}
                                // value={id}
                                // name={username}
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

export default UserList