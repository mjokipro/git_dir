import React, {useState, useEffect}  from "react";
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import UserCard from "./UserCard";

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
        <div className="container">
            <div className="container mt-3">
            <SearchForm searchFor={search} />
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

export default UserList