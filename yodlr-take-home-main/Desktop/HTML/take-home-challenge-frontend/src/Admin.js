import react, { useEffect} from 'react'
import { useData } from './hooks'



const Admin = () => {
    const [users,getUsers,isLoading] = useData('users')

    useEffect(()=>{
        getUsers()
    },[])
    
    
    
    return (
        <div>
            {isLoading && <div><p>Hello</p></div>}
            {!isLoading && <div>
                <h1 style={{textAlign:'center'}}>Users</h1>
                <ul>
                {users.map(user => <li>{user.firstName}</li>)}
                </ul>
                </div>}
        </div>
    )
        
    
}

export default Admin;