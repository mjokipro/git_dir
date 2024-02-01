
import React from 'react'
import UserCard from './UserCard'
import {useParams} from 'react-router-dom'
import JoblyApi from '../api/api'

const UserListDetail = ({username, firstName, lastName, email, search}) => {
    const {username} = useParams()

    const [user, setUser] = useState(null)

    useEffect(
        function getUserAndMessages(){
            async function getCurrentUser(){
                setUser(await JoblyApi.getCompany(handle))
            }
            getCompany()
        }, [handle]
    )

    if (!company) return <p>Loading...</p>

    return (
        <div>
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    )
}

export default UserListDetail

            // key={u.username}
            // username={u.username}
            // firstName={u.firstName}
            // lastName={u.lastName}
            // email={email}