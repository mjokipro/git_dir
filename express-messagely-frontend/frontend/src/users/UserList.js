import React, {useState, useEffect} from 'react'
import UserCardList from './UserCardList'
import SearchForm from '../common/SearchForm'
import MessagelyApi from '../api/api'
import UserContext from '../auth/UserContext'

const UserList = () => {
    console.debug("User List")

    const [users, setUsers] = useState(null)

    useEffect(
        function getUsersInit() {
            search()
        }, []
    )

    async function search(id){
        let users = await MessagelyApi.getAllUsers(id)
        console.log(users)
        setUsers(users)
    }

    if (!users) return <p>Loading...</p>

    return (
        <div className='modal-dialog modal-lg'>
            <SearchForm searchFor={search}/>
            {users.length
                ? (
                    <div>
                        {users.map(u => (
                            <UserCardList 
                            users={users}
                            />))
                        }
                    </div>
                ) : (<p>No results</p>)  
            }

        </div>
    )
}

export default UserList