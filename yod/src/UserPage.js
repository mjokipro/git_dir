import react, { useEffect} from 'react'
import { useParams } from 'react-router';
import {useData} from './hooks'

const UserPage = () => {
    const {id} = useParams()
    const [user,getUser,isLoading] = useData('user',id)

    useEffect(()=>{
        getUser()
    },[])

    return(
        <div>
        {!isLoading &&
        <div>
            <h1>Profile Page</h1>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
        </div>
        }
        {isLoading && <div>Loading...</div>}
        </div>
    )
}

export default UserPage;